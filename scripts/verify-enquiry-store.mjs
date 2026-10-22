// Explicit, mail-free verification against a provisioned store. Credentials are
// read from a mode-0600 temporary JSON file, never from the website's SMTP env.
// Only a random synthetic namespace is written; no FLUSHDB or production keys.
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {randomBytes,randomUUID} from 'node:crypto';
import {createEnquiryProtection,createRedisProtection,protectionPolicy} from '../lib/enquiries/protection.mjs';

let phase='credential-file';
try {
  const path=process.argv[2];
  if(!path || ((await stat(path)).mode & 0o077)!==0)throw new Error('Protected credential file required');
  const {url,token}=JSON.parse(await readFile(path,'utf8'));
  const endpoint=new URL(url);
  if(endpoint.protocol!=='https:' || !endpoint.hostname.endsWith('.upstash.io') || endpoint.username || endpoint.password || endpoint.search || endpoint.hash)
    throw new Error('Unexpected verification endpoint');
  const secret=randomBytes(32).toString('hex');
  const namespace='elitereplay:verification:'+randomUUID();
  const writtenKeys=new Set(),wire=[];
  const command=async args=>{
    const response=await fetch(endpoint,{method:'POST',redirect:'error',cache:'no-store',signal:AbortSignal.timeout(3000),
      headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(args)});
    if(!response.ok)throw Object.assign(new Error('Store request failed'),{code:'HTTP_'+response.status});
    const body=await response.json();
    if(body.error || !Object.hasOwn(body,'result'))throw Object.assign(new Error('Store command failed'),{code:'STORE_RESPONSE'});
    return body.result;
  };
  const tracked=async args=>{
    wire.push(args);
    if(args[0]==='EVAL')for(const key of args.slice(3,3+Number(args[2]))) {
      assert.ok(key.startsWith(`{${namespace}}:`));writtenKeys.add(key);
    }
    return command(args);
  };
  try {
    phase='adapter-connection';
    const adapter=createEnquiryProtection({env:{KV_REST_API_URL:url,KV_REST_API_TOKEN:token,ELITEREPLAY_ENQUIRY_HASH_SECRET:secret}});
    assert.equal(adapter.configured,true);await adapter.verify();
    const clients=Array.from({length:3},()=>createRedisProtection({command:tracked,secret,namespace}));
    phase='shared-counter';
    const rates=await Promise.all(Array.from({length:24},(_,i)=>clients[i%3].rate('192.0.2.42')));
    assert.equal(rates.filter(r=>r.allowed).length,12);
    assert.equal(rates.filter(r=>!r.allowed).length,12);
    phase='concurrent-claim';
    const id=randomUUID(),payload={name:'Synthetic verification',email:'store-check@example.invalid',message:'No mail transport exists in this script.'};
    const claims=await Promise.all(Array.from({length:6},(_,i)=>clients[i%3].claim(id,payload)));
    assert.equal(claims.filter(c=>c.state==='owned').length,1);
    assert.equal(claims.filter(c=>c.state==='existing').length,5);
    const owner=claims.find(c=>c.state==='owned');
    phase='receipt';
    await clients[0].finish(owner,{status:200,body:{accepted:true,sent:false,simulated:true}});
    const restarted=createRedisProtection({command:tracked,secret,namespace});
    const duplicate=await restarted.claim(id.toUpperCase(),payload);
    assert.equal(duplicate.state,'existing');assert.equal(duplicate.receipt.state,'complete');
    assert.equal((await restarted.claim(randomUUID(),payload)).state,'existing');
    assert.equal((await restarted.claim(id,{...payload,message:'Changed test content'})).state,'conflict');
    phase='retention';
    const retained={ip:0,id:0,receipt:0};
    for(const key of writtenKeys) {
      const ttl=await command(['PTTL',key]);
      // A conflicting payload references a receipt key without creating it.
      if(ttl===-2)continue;
      const expected=key.includes(':ip:')?protectionPolicy.windowMs:protectionPolicy.retentionMs;
      assert.ok(ttl>expected-30000 && ttl<=expected);
      retained[key.split('}:')[1].split(':')[0]]++;
    }
    assert.deepEqual(retained,{ip:1,id:2,receipt:1});
    phase='data-minimization';
    const serialized=JSON.stringify(wire);
    for(const raw of ['192.0.2.42',...Object.values(payload)])assert.ok(!serialized.includes(raw));
    console.log(JSON.stringify({connection:'passed',sharedRateLimit:{attempts:24,allowed:12,blocked:12},concurrentClaims:{attempts:6,owners:1},duplicateAfterNewClient:'passed',changedContentConflict:'passed',retention:'60 seconds / 24 hours verified',rawPersonalDataStored:false,emailsSent:0}));
  } finally {
    // Shorten only keys created in this random probe namespace. No deletions,
    // production counters, receipts or other database contents are touched.
    for(const key of writtenKeys)await command(['PEXPIRE',key,60_000]);
  }
} catch(error) {
  const code=/^(HTTP_\d+|STORE_RESPONSE|ERR_ASSERTION|ENOTFOUND|EACCES|EPERM|ENOENT)$/.test(error.code || '')?error.code:'REDACTED';
  console.error(JSON.stringify({verification:'failed',phase,code,emailsSent:0}));
  process.exitCode=1;
}
