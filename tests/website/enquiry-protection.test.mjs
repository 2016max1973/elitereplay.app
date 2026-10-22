import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {fork,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import {setTimeout as delay} from 'node:timers/promises';
import {createEnquiryHandler} from '../../lib/enquiries/enquiry.mjs';
import {createEnquiryProtection,createRedisProtection,enquiryAddress,protectionPolicy} from '../../lib/enquiries/protection.mjs';
import {good,event,request} from './helpers/enquiry-fixture.mjs';
import {localRedis} from './helpers/local-redis.mjs';

const origins=['https://elitereplay.de'];
const secret='test-secret-that-is-at-least-32-characters';
const fakeEnv={UPSTASH_REDIS_REST_URL:'https://example.upstash.io',UPSTASH_REDIS_REST_TOKEN:'test-only',ELITEREPLAY_ENQUIRY_HASH_SECRET:secret};
const accepted={accepted:true,sent:true,simulated:false};

test('native Vercel Marketplace variables work without mixing partial credential pairs',async()=>{
  const env={KV_REST_API_URL:fakeEnv.UPSTASH_REDIS_REST_URL,KV_REST_API_TOKEN:'marketplace-test',ELITEREPLAY_ENQUIRY_HASH_SECRET:secret};
  const guard=createEnquiryProtection({env,fetchImpl:async(url,options)=>{
    assert.equal(options.headers.Authorization,'Bearer marketplace-test');
    return new Response(JSON.stringify({result:'PONG'}));
  }});
  assert.equal(guard.configured,true);await guard.verify();
  for(const partial of [{UPSTASH_REDIS_REST_URL:'https://other.upstash.io'},{UPSTASH_REDIS_REST_TOKEN:'other-token'}])
    assert.equal(createEnquiryProtection({env:{...env,...partial}}).configured,false);
});

test('missing protection or an unavailable store blocks delivery without exposing configuration',async()=>{
  let sends=0;
  for(const protection of [undefined,{configured:false},createEnquiryProtection({env:fakeEnv,fetchImpl:async()=>{throw new Error('Secret connection details');}})]) {
    const handler=createEnquiryHandler({origins,protection,delivery:{mode:'smtp',async send(){sends++;return accepted;}}});
    const result=await request(handler);
    assert.equal(result.status,503);assert.equal(result.body.sent,false);
    assert.ok(!JSON.stringify(result).includes('Secret'));
  }
  assert.equal(sends,0);
  const handler=createEnquiryHandler({origins,delivery:{mode:'smtp'},protection:{configured:false}});
  assert.deepEqual((await request(handler,good,{method:'GET'})).body,{mode:'unavailable'});
});

test('Redis transport refuses unsafe configuration, redacts failures and never retries a timed-out operation',async()=>{
  for(const changes of [{UPSTASH_REDIS_REST_URL:'http://example.upstash.io'},
    {UPSTASH_REDIS_REST_URL:'https://user:pass@example.upstash.io'},
    {UPSTASH_REDIS_REST_URL:'https://example.upstash.io/?token=secret'},
    {UPSTASH_REDIS_REST_TOKEN:''},{ELITEREPLAY_ENQUIRY_HASH_SECRET:'short'},
    {VERCEL:'1',VERCEL_ENV:'production',UPSTASH_REDIS_REST_URL:'http://127.0.0.1:9999'}]) {
    assert.equal(createEnquiryProtection({env:{...fakeEnv,...changes}}).configured,false);
  }
  for(const response of [new Response('{}',{status:503}),new Response('{"error":"private"}'),new Response('{}'),new Response('{"result":[1,-1]}')]) {
    const protection=createEnquiryProtection({env:fakeEnv,fetchImpl:async()=>response});
    await assert.rejects(protection.rate('192.0.2.1'),/unavailable/);
  }
  let calls=0;
  const protection=createEnquiryProtection({env:fakeEnv,fetchImpl:async(url,options)=>{
    calls++;assert.equal(options.redirect,'error');assert.equal(options.cache,'no-store');
    assert.equal(options.headers.Authorization,'Bearer test-only');assert.ok(options.signal);
    throw new Error('timeout');
  }});
  await assert.rejects(protection.claim(randomUUID(),good));assert.equal(calls,1);
});

test('address selection cannot be varied through arbitrary proxy headers or IPv6 spelling',()=>{
  const req={headers:{'x-forwarded-for':'198.51.100.9','x-vercel-forwarded-for':'192.0.2.1'},socket:{remoteAddress:'127.0.0.1'}};
  assert.equal(enquiryAddress(req,false),'127.0.0.1');assert.equal(enquiryAddress(req,true),'192.0.2.1');
  for(const ip of ['',undefined,'192.0.2.1, 192.0.2.2','anything'])
    assert.throws(()=>enquiryAddress({headers:{'x-vercel-forwarded-for':ip}},true));
  const ip=value=>enquiryAddress({socket:{remoteAddress:value}},false);
  assert.equal(ip('::ffff:192.0.2.1'),ip('192.0.2.1'));
  assert.equal(ip('2001:db8:1:2::1'),ip('2001:0db8:0001:0002:abcd::12'));
  assert.notEqual(ip('2001:db8:1:3::1'),ip('2001:db8:1:2::1'));
});

test('production build gate stops without shared protection before any SMTP authentication',()=>{
  const result=spawnSync(process.execPath,['scripts/verify-website-mail.mjs'],{
    env:{PATH:process.env.PATH,VERCEL_ENV:'production',ELITEREPLAY_MAIL_MODE:'smtp'},encoding:'utf8'});
  assert.equal(result.status,1);assert.match(result.stderr,/shared enquiry protection/);
});

test('real Redis: independent processes share limits and delivery receipts',{
  skip:process.env.ELITEREPLAY_TEST_REDIS_SERVER ? false : 'Set ELITEREPLAY_TEST_REDIS_SERVER to a local redis-server binary',timeout:60_000
},async t=>{
  const redis=await localRedis(process.env.ELITEREPLAY_TEST_REDIS_SERVER);
  t.after(()=>redis.stop());
  let sends=0;
  async function worker(delivery='ok') {
    const child=fork(new URL('./helpers/enquiry-worker.mjs',import.meta.url),[],{
      env:{PATH:process.env.PATH,...redis.env,TEST_DELIVERY:delivery},stdio:['ignore','ignore','pipe','ipc']});
    let errors='';child.stderr.on('data',value=>errors+=value);
    const pending=new Map();let ready;
    const startup=new Promise((resolve,reject)=>{ready=resolve;child.once('error',reject);child.once('exit',code=>{if(code)reject(new Error(errors));});});
    child.on('message',message=>{
      if(message.type==='ready')ready();
      if(message.type==='send')sends++;
      if(message.type==='result'){pending.get(message.ticket)?.(message.result);pending.delete(message.ticket);}
    });
    let stopped=false;
    const stop=async()=>{if(stopped)return;stopped=true;const closed=once(child,'exit');child.kill('SIGTERM');await closed;};
    t.after(stop);await startup;
    return {stop,request:(body=good,options={})=>new Promise(resolve=>{
      const ticket=randomUUID();pending.set(ticket,resolve);
      child.send({ticket,body,options:{...options,headers:{'x-vercel-forwarded-for':'192.0.2.1',...options.headers}}});
    })};
  }
  const a=await worker(),b=await worker(),c=await worker();
  const guard=()=>createEnquiryProtection({env:redis.env});
  const reset=async()=>{await redis.command(['FLUSHDB']);sends=0;}; // Dedicated ephemeral test database only.

  await t.test('24 concurrent requests across three processes allow 12 in total, not 12 per instance',async()=>{
    const result=await Promise.all(Array.from({length:24},(_,i)=>[a,b,c][i%3].request({...good,message:`Local burst ${i}`})));
    assert.equal(result.filter(r=>r.status===200).length,12);
    assert.equal(result.filter(r=>r.status===429).length,12);
    assert.equal(sends,12);
    assert.ok(result.filter(r=>r.status===429).every(r=>Number(r.headers['Retry-After'])>=1 && Number(r.headers['Retry-After'])<=60));
    const d=await worker();assert.equal((await d.request()).status,429);await d.stop();
  });

  await t.test('simultaneous retries across instances and after a restart dispatch once; changed content conflicts',async()=>{
    await reset();const id=randomUUID();
    const result=await Promise.all(Array.from({length:6},(_,i)=>[a,b,c][i%3].request(good,{id})));
    assert.ok(result.every(r=>r.status===200 && r.body.sent));assert.equal(sends,1);
    const d=await worker();
    assert.equal((await d.request(good,{id:id.toUpperCase()})).body.sent,true);
    assert.equal((await d.request({...good,message:'Different enquiry'},{id})).status,409);
    assert.equal(sends,1);await d.stop();
  });

  await t.test('identical content with fresh request keys is not sent again',async()=>{
    await reset();
    const result=await Promise.all([a.request(),b.request(),c.request()]);
    assert.ok(result.every(r=>r.body.sent));assert.equal(sends,1);
  });

  await t.test('all five website forms use the same protection',async()=>{
    await reset();
    for(const body of [good,{...good,source:'matchboard'},{...good,source:'history'},
      {...good,source:'capture',interest:'Trainer'},event]) {
      const id=randomUUID();
      assert.equal((await a.request(body,{id})).body.sent,true);
      assert.equal((await b.request(body,{id})).body.sent,true);
    }
    assert.equal(sends,5);
  });

  await t.test('lost SMTP acknowledgement remains uncertain across restarts and fresh browser keys',async()=>{
    await reset();const failing=await worker('unknown'),id=randomUUID();
    assert.equal((await failing.request(good,{id})).body.error,'deliveryUnknown');await failing.stop();
    assert.equal((await b.request(good,{id})).body.error,'deliveryUnknown');
    assert.equal((await c.request()).body.error,'deliveryUnknown');assert.equal(sends,1);
  });

  await t.test('a crashed sender cannot be taken over by another instance',async()=>{
    await reset();const stuck=await worker('crash'),id=randomUUID();
    void stuck.request(good,{id});
    for(let i=0;sends===0 && i<40;i++)await delay(25);
    assert.equal(sends,1);await stuck.stop();
    const result=await b.request(good,{id});
    assert.equal(result.status,502);assert.equal(result.body.error,'deliveryUnknown');assert.equal(sends,1);
  });

  await t.test('lost claim acknowledgement blocks delivery; retry does not acquire a second claim',async()=>{
    await reset();let localSends=0;
    const original=guard();
    const broken={...original,async claim(...args){await original.claim(...args);throw new Error('Lost claim response');}};
    const handler=createEnquiryHandler({origins,protection:broken,delivery:{mode:'smtp',async send(){localSends++;return accepted;}}});
    const id=randomUUID();assert.equal((await request(handler,good,{id})).status,503);
    assert.equal((await a.request(good,{id})).body.error,'deliveryUnknown');assert.equal(sends+localSends,0);
  });

  await t.test('store failure after SMTP acceptance leaves a blocking pending receipt',async()=>{
    await reset();let localSends=0;
    const broken={...guard(),async finish(){throw new Error('Store disconnected');}};
    const handler=createEnquiryHandler({origins,protection:broken,delivery:{mode:'smtp',async send(){localSends++;return accepted;}}});
    const id=randomUUID();assert.equal((await request(handler,good,{id})).body.error,'deliveryUnknown');
    assert.equal((await a.request(good,{id})).body.error,'deliveryUnknown');assert.equal(sends+localSends,1);
  });

  await t.test('server-side expiry, receipt retention and owner checks work on the actual Redis engine',async()=>{
    await reset();
    const fast=createRedisProtection({command:redis.command,secret,namespace:'test:expiry',policy:{...protectionPolicy,limit:1,windowMs:50}});
    assert.equal((await fast.rate('one')).allowed,true);assert.equal((await fast.rate('one')).allowed,false);
    await delay(80);assert.equal((await fast.rate('one')).allowed,true);
    const claim=await fast.claim(randomUUID(),good);
    await assert.rejects(fast.finish({...claim,owner:randomUUID()},{status:200,body:accepted}));
    assert.equal((await fast.read(claim)).state,'pending');
    await fast.finish(claim,{status:200,body:accepted});
    const receiptKeys=await redis.command(['KEYS','*receipt:*']);
    for(const key of receiptKeys)assert.ok(await redis.command(['PTTL',key])>86_390_000);
    assert.equal((await fast.read(claim)).outcome.body.sent,true);
    const other=createRedisProtection({command:redis.command,secret,namespace:'test:separate-preview'});
    assert.equal((await other.claim(randomUUID(),good)).state,'owned');
  });

  await t.test('shared store contains no raw IP, enquiry text, name or email',async()=>{
    const wire=JSON.stringify(redis.commands);
    for(const sensitive of [good.email,good.name,good.message,'192.0.2.1','127.0.0.1'])assert.ok(!wire.includes(sensitive),sensitive);
    const keys=await redis.command(['KEYS','*']);
    for(const key of keys) {
      const value=await redis.command(['GET',key]);
      assert.ok(!String(value).includes(good.email));assert.ok(await redis.command(['PTTL',key])>0);
    }
  });
});
