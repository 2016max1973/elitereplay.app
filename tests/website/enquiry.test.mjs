import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {createEnquiryHandler as handlerFactory,validateEnquiry,prepareEnquiry} from '../../lib/enquiries/enquiry.mjs';
import {createMailDelivery} from '../../lib/enquiries/mail-delivery.mjs';

import {good,event,request,fakeProtection} from './helpers/enquiry-fixture.mjs';
const createEnquiryHandler=options=>handlerFactory({protection:fakeProtection(options.now),...options});

const preview=()=>createMailDelivery({env:{ELITEREPLAY_MAIL_MODE:'preview'}});
const accept=()=>({mode:'smtp',async send(){return {accepted:true,sent:true,simulated:false};}});

test('all product choices and event languages validate and keep the intended request',()=>{
  for(const [source,interests] of Object.entries({home:['Club','History','Highlights','Trainer','Spieler'],matchboard:['Club','History','Highlights'],history:['Club','History','Highlights'],capture:['Trainer','Spieler']})){
    for(const interest of interests){
      const checked=validateEnquiry({...good,source,interest});
      assert.equal(checked.ok,true);
      const draft=prepareEnquiry(checked.data);
      assert.equal(draft.email,good.email);
      assert.equal(draft.recipient,'contact@elitereplay.de');
      assert.ok(draft.body.includes(good.message));
      assert.ok(!draft.subject.includes('undefined'));
    }
  }
  for(const locale of ['de','en','es'])for(const type of ['camp','event','tournament']){
    const checked=validateEnquiry({...event,locale,type});
    assert.equal(checked.ok,true);
    assert.ok(prepareEnquiry(checked.data).body.includes(event.location));
  }
});
test('server validates choices, required fields, types, limits and header injection',()=>{
  for(const changes of [{name:' '},{email:'bad'},{email:'a@b.co\nBcc:x@y.co'},{phone:['bad']},{source:'other'},{source:'capture',interest:'Club'},{interest:'smtp'},{locale:'en'},{name:'x'.repeat(121)},{message:'x'.repeat(3001)},{message:'x\u0000'},{website:'spam'},{to:'attacker@example.invalid'},{kind:'other'}])
    assert.equal(validateEnquiry({...good,...changes}).ok,false,JSON.stringify(changes));
  for(const value of [null,[],42])assert.equal(validateEnquiry(value).ok,false);
});
test('preview mode cannot instantiate an SMTP transport even if credentials are present',async()=>{
  let transports=0;
  const delivery=createMailDelivery({env:{ELITEREPLAY_MAIL_MODE:'preview',ELITEREPLAY_SMTP_USER:'test',ELITEREPLAY_SMTP_PASSWORD:'fake'},createTransport(){transports++;throw new Error('Must not connect');}});
  const result=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery}));
  assert.equal(transports,0);
  assert.deepEqual(result.body,{accepted:false,sent:false,simulated:true});
  assert.equal(result.headers['Cache-Control'],'no-store');
  assert.ok(!JSON.stringify(result.body).includes(good.email));
});
test('mode discovery is read-only and exposes no credentials',async()=>{
  const result=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery:preview()}),good,{method:'GET'});
  assert.deepEqual(result.body,{mode:'preview'});
});
test('missing or unsupported SMTP configuration fails closed',async()=>{
  for(const env of [{ELITEREPLAY_MAIL_MODE:'smtp'},{ELITEREPLAY_MAIL_MODE:'unexpected'},{ELITEREPLAY_MAIL_MODE:'smtp',ELITEREPLAY_SMTP_HOST:'other.invalid',ELITEREPLAY_SMTP_USER:'test',ELITEREPLAY_SMTP_PASSWORD:'fake'}]){
    const delivery=createMailDelivery({env,createTransport(){throw new Error('Must not connect');}});
    assert.equal(delivery.mode,'unavailable');
    const result=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery}));
    assert.equal(result.status,503);assert.equal(result.body.error,'notConfigured');assert.equal(result.body.sent,false);
  }
});
test('SMTP settings and message use TLS, fixed recipient/from and visitor reply-to; no network',async()=>{
  for(const port of [465,587]){
    let options,message;
    const delivery=createMailDelivery({env:{ELITEREPLAY_MAIL_MODE:'smtp',ELITEREPLAY_SMTP_PORT:String(port),ELITEREPLAY_SMTP_USER:'mailbox',ELITEREPLAY_SMTP_PASSWORD:'fake-local-test'},createTransport(config){options=config;return {async sendMail(value){message=value;return {accepted:['contact@elitereplay.de'],rejected:[]};}};}});
    const response=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery}));
    assert.equal(response.body.accepted,true);
    assert.equal(options.host,'smtps.udag.de');assert.equal(options.secure,port===465);
    assert.equal(options.requireTLS,true);assert.equal(options.tls.rejectUnauthorized,true);
    assert.equal(message.from.address,'contact@elitereplay.de');assert.equal(message.to,'contact@elitereplay.de');
    assert.equal(message.replyTo.address,good.email);
    assert.equal(message.disableUrlAccess,true);assert.equal(message.disableFileAccess,true);
  }
});
test('SMTP rejection, missing acceptance, auth errors and uncertain results cannot produce success',async()=>{
  for(const [error,expected] of [['EAUTH','deliveryFailed'],['ECONNECTION','deliveryFailed'],['ETIMEDOUT','deliveryUnknown'],['UNKNOWN','deliveryUnknown']]){
    const delivery={mode:'smtp',async send(){throw Object.assign(new Error('Sensitive server detail'),{code:error});}};
    const result=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery}));
    assert.equal(result.status,502);assert.equal(result.body.error,expected);assert.equal(result.body.sent,false);
    assert.ok(!JSON.stringify(result.body).includes('Sensitive'));
  }
  const incomplete=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery:{mode:'smtp',async send(){return {accepted:true};}}}));
  assert.equal(incomplete.body.error,'deliveryUnknown');
  const delivery=createMailDelivery({env:{ELITEREPLAY_MAIL_MODE:'smtp',ELITEREPLAY_SMTP_USER:'test',ELITEREPLAY_SMTP_PASSWORD:'fake'},createTransport(){return {async sendMail(){return {accepted:[],rejected:['contact@elitereplay.de']};}};}});
  assert.equal((await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery}))).body.error,'deliveryFailed');
});
test('simultaneous duplicate requests, repeated clicks and status retries only dispatch once',async()=>{
  let sends=0;
  const delivery={mode:'smtp',async send(){sends++;await new Promise(resolve=>setTimeout(resolve,10));return {accepted:true,sent:true,simulated:false};}};
  const handler=createEnquiryHandler({origins:["https://elitereplay.de"],delivery});const id=randomUUID();
  const [a,b]=await Promise.all([request(handler,good,{id}),request(handler,good,{id})]);
  assert.deepEqual(a.body,b.body);assert.equal(sends,1);
  assert.equal((await request(handler,good,{id})).body.sent,true);assert.equal(sends,1);
  assert.equal((await request(handler,{...good,message:'changed'},{id})).status,409);assert.equal(sends,1);
});
test('uncertain delivery is remembered to prevent duplicate sends after a lost acknowledgement',async()=>{
  let sends=0;const id=randomUUID();
  const handler=createEnquiryHandler({origins:["https://elitereplay.de"],delivery:{mode:'smtp',async send(){sends++;throw Object.assign(new Error('Timeout'),{code:'ETIMEDOUT'});}}});
  assert.equal((await request(handler,good,{id})).body.error,'deliveryUnknown');
  assert.equal((await request(handler,good,{id})).body.error,'deliveryUnknown');assert.equal(sends,1);
});
test('honeypot and invalid payloads never call delivery',async()=>{
  let sends=0;const handler=createEnquiryHandler({origins:["https://elitereplay.de"],delivery:{mode:'smtp',async send(){sends++;}}});
  for(const body of [{...good,website:'bot'},{...good,name:''},{...event,dateOpen:false,date:'2027-02-30'}]){
    assert.equal((await request(handler,body)).status,422);
  }
  assert.equal(sends,0);
});
test('API rejects invalid origin, method, host, content type, request keys and large bodies',async()=>{
  for(const [body,options,status] of [
    [good,{headers:{origin:'https://outside.invalid'}},403],
    [good,{headers:{'sec-fetch-site':'cross-site'}},403],
    [good,{headers:{host:'outside.invalid'}},403],
    [good,{method:'PUT'},405],
    [good,{headers:{'content-type':'text/plain'}},415],
    [good,{id:'arbitrary'},400],
    ['{broken',{},400],
    [{...good,message:'x'.repeat(17000)},{},413]
  ]){
    const result=await request(createEnquiryHandler({origins:["https://elitereplay.de"],delivery:accept()}),body,options);
    assert.equal(result.status,status);assert.equal(result.body.sent,false);
  }
});
test('UTF-8 names survive a split network chunk',async()=>{
  let message;const bytes=Buffer.from(JSON.stringify({...good,name:'María López'}));
  const split=bytes.indexOf(Buffer.from('í'))+1;
  const handler=createEnquiryHandler({origins:["https://elitereplay.de"],delivery:{mode:'smtp',async send(value){message=value;return {accepted:true,sent:true,simulated:false};}}});
  const result=await request(handler,good,{chunks:[bytes.subarray(0,split),bytes.subarray(split)]});
  assert.equal(result.status,200);assert.ok(message.body.includes('María López'));
});
test('rate limiting expires without sending in preview',async()=>{
  let clock=1000;const handler=createEnquiryHandler({origins:["https://elitereplay.de"],delivery:preview(),now:()=>clock});
  for(let i=0;i<12;i++)assert.equal((await request(handler)).status,200);
  assert.equal((await request(handler)).status,429);
  clock+=60001;assert.equal((await request(handler)).status,200);
});
