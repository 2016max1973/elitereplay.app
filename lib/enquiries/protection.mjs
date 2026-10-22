import {createHmac, randomUUID} from 'node:crypto';
import {isIP} from 'node:net';

export const protectionPolicy = Object.freeze({limit:12, windowMs:60_000, retentionMs:86_400_000});
const unavailable = () => new Error('Enquiry protection unavailable');

// Each script is one atomic operation on the shared writer. All keys use the
// same Redis hash slot. Never replace these with separate GET/SET operations.
const rateScript = `
local count = tonumber(redis.call('GET', KEYS[1]) or '0')
if count >= tonumber(ARGV[1]) then
  return {0, redis.call('PTTL', KEYS[1])}
end
count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[2]) end
return {1, redis.call('PTTL', KEYS[1])}
`;

const claimScript = `
local bound = redis.call('GET', KEYS[1])
if bound and bound ~= ARGV[1] then return {'conflict'} end
local receipt = redis.call('GET', KEYS[2])
if bound and not receipt then return {'unknown'} end
if not bound then redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[3]) end
if receipt then return {'existing', receipt} end
redis.call('SET', KEYS[2], ARGV[2], 'PX', ARGV[3])
return {'owned'}
`;

const finishScript = `
local raw = redis.call('GET', KEYS[1])
if not raw then return 0 end
local receipt = cjson.decode(raw)
if receipt.owner ~= ARGV[1] or receipt.state ~= 'pending' then return 0 end
redis.call('SET', KEYS[1], ARGV[2], 'KEEPTTL')
return 1
`;

// Canonicalize IPv6 and group privacy addresses in the same /64. Only Vercel's
// own header is trusted in production; arbitrary forwarded lists fail closed.
export function enquiryAddress(req, trustedProxy) {
  const raw = trustedProxy ? req.headers['x-vercel-forwarded-for'] : req.socket?.remoteAddress;
  if(typeof raw !== 'string' || !isIP(raw.trim()))throw unavailable();
  const ip = raw.trim();
  if(isIP(ip) === 4)return ip;
  const normalized = new URL(`http://[${ip}]`).hostname.slice(1,-1);
  const [left,right] = normalized.split('::');
  const a = left ? left.split(':') : [], b = right ? right.split(':') : [];
  const parts = right === undefined ? a : [...a,...Array(8-a.length-b.length).fill('0'),...b];
  const values = parts.map(value=>parseInt(value,16));
  if(values.slice(0,5).every(value=>value===0) && values[5]===65535)
    return [values[6]>>8,values[6]&255,values[7]>>8,values[7]&255].join('.');
  return values.slice(0,4).map(value=>value.toString(16).padStart(4,'0')).join(':')+'::/64';
}

export function createRedisProtection({command, secret, namespace, policy=protectionPolicy}) {
  if(typeof command!=='function' || typeof secret!=='string' || secret.length<32 ||
    !/^[a-z0-9:-]{1,100}$/.test(namespace ?? '') ||
    ![policy.limit,policy.windowMs,policy.retentionMs].every(value=>Number.isSafeInteger(value) && value>0))
    throw unavailable();
  const digest = (type,value)=>createHmac('sha256',secret).update(type+'\0'+value).digest('hex');
  const key = (type,value)=>`{${namespace}}:${type}:${digest(type,value)}`;
  const evaluate = (script,keys,args=[])=>command(['EVAL',script,keys.length,...keys,...args]);
  const receiptKey = fingerprint=>`{${namespace}}:receipt:${fingerprint}`;
  const parseReceipt = raw=>{
    const receipt = JSON.parse(raw);
    if(!receipt || !['pending','complete'].includes(receipt.state))throw unavailable();
    if(receipt.state==='complete' && (!Number.isInteger(receipt.outcome?.status) ||
      typeof receipt.outcome?.body?.sent!=='boolean'))throw unavailable();
    return receipt;
  };
  return {
    configured:true,
    async verify() {
      if(await evaluate("return redis.call('PING')",[])!=='PONG')throw unavailable();
    },
    async rate(address) {
      const result = await evaluate(rateScript,[key('ip',address)],[policy.limit,policy.windowMs]);
      if(!Array.isArray(result) || ![0,1].includes(result[0]) || !(result[1]>0))throw unavailable();
      return {allowed:result[0]===1,retryAfter:Math.max(1,Math.ceil(result[1]/1000))};
    },
    async claim(id,data) {
      // Same normalized content with a fresh browser key is also a duplicate.
      // Store HMACs and minimal delivery receipts, never names, emails or text.
      const canonical = JSON.stringify(Object.fromEntries(Object.entries(data).sort(([a],[b])=>a.localeCompare(b))));
      const fingerprint = digest('payload',canonical), owner = randomUUID();
      const result = await evaluate(claimScript,[key('id',id.toLowerCase()),receiptKey(fingerprint)],
        [fingerprint,JSON.stringify({state:'pending',owner}),policy.retentionMs]);
      if(result?.[0]==='owned')return {state:'owned',fingerprint,owner};
      if(result?.[0]==='conflict' || result?.[0]==='unknown')return {state:result[0]};
      if(result?.[0]==='existing')return {state:'existing',fingerprint,receipt:parseReceipt(result[1])};
      throw unavailable();
    },
    async read(claim) {
      const raw = await evaluate("return redis.call('GET', KEYS[1])",[receiptKey(claim.fingerprint)]);
      return raw ? parseReceipt(raw) : {state:'pending'};
    },
    async finish(claim,outcome) {
      const result = await evaluate(finishScript,[receiptKey(claim.fingerprint)],
        [claim.owner,JSON.stringify({state:'complete',outcome})]);
      if(result!==1)throw unavailable();
    }
  };
}

export function createEnquiryProtection({env=process.env, fetchImpl=fetch}={}) {
  // Vercel's native Marketplace integration supplies the KV_* pair. Prefer a
  // complete explicit UPSTASH_* pair; never mix credentials from two stores.
  const explicit = env.UPSTASH_REDIS_REST_URL !== undefined || env.UPSTASH_REDIS_REST_TOKEN !== undefined;
  const url = explicit ? env.UPSTASH_REDIS_REST_URL : env.KV_REST_API_URL;
  const token = explicit ? env.UPSTASH_REDIS_REST_TOKEN : env.KV_REST_API_TOKEN;
  const secret = env.ELITEREPLAY_ENQUIRY_HASH_SECRET;
  const stage = env.VERCEL_ENV || 'local';
  let endpoint;
  try {
    endpoint = new URL(url);
    const localTest = !env.VERCEL && stage==='local' && endpoint.protocol==='http:' && endpoint.hostname==='127.0.0.1';
    if((endpoint.protocol!=='https:' && !localTest) || endpoint.username || endpoint.password ||
      endpoint.search || endpoint.hash || !token?.trim() || /[\r\n]/.test(token) ||
      !['production','preview','development','local'].includes(stage))throw unavailable();
    return createRedisProtection({secret,namespace:`elitereplay:enquiry:v1:${stage}`,
      command:async args=>{
        // Deliberately no automatic retries: a timed-out claim may have succeeded.
        const response = await fetchImpl(endpoint.href,{method:'POST',cache:'no-store',redirect:'error',
          signal:AbortSignal.timeout(3000),headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
          body:JSON.stringify(args)});
        if(!response.ok)throw unavailable();
        const body = await response.json();
        if(!body || body.error || !Object.hasOwn(body,'result'))throw unavailable();
        return body.result;
      }});
  } catch {
    // No process-local fallback: missing shared protection must block SMTP.
    return {configured:false};
  }
}
