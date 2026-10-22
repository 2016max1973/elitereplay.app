import {setTimeout as delay} from 'node:timers/promises';
import {enquiryAddress} from './protection.mjs';
import {validateEventRequest,prepareEventDraft,recipient} from './event-request.mjs';

export const productInterests={
  Club:'MatchBoard-Vorführung für meinen Club',
  History:'Persönliche MatchBoard-History-Vorschau',
  Highlights:'Replays & Highlights kennenlernen',
  Trainer:'Capture-Pilotzugang als Trainer',
  Spieler:'Capture als Spieler testen'
};
const sources={home:Object.keys(productInterests),matchboard:['Club','History','Highlights'],history:['Club','History','Highlights'],capture:['Trainer','Spieler']};
const cleanString=(value,max,required=false,multiline=false)=>
  typeof value==='string' && value.length<=max && (!required || value.trim().length>0) &&
  !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value) &&
  (multiline || !/[\r\n]/.test(value));

export function validateEnquiry(raw) {
  if(!raw || Array.isArray(raw) || typeof raw!=='object')return {ok:false,errors:{form:'validation'}};
  if(raw.kind==='event') {
    const {kind,...fields}=raw;
    const checked=validateEventRequest(fields);
    return checked.ok?{ok:true,data:{kind,...checked.data}}:checked;
  }
  const allowed=['kind','source','locale','interest','name','email','phone','message','website'];
  const errors={},data={};
  if(raw.kind!=='product' || Object.keys(raw).some(key=>!allowed.includes(key)))errors.form='validation';
  if(!Object.hasOwn(sources,raw.source) || !sources[raw.source].includes(raw.interest))errors.interest='choiceError';
  if(raw.locale!=='de')errors.locale='choiceError';
  for(const [key,max] of Object.entries({name:120,email:254,phone:60,message:3000})) {
    const value=raw[key]??'';
    if(!cleanString(value,max,['name','email'].includes(key),key==='message'))errors[key]=value===''?'requiredError':'lengthError';
    else data[key]=value.trim();
  }
  if(data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))errors.email='emailError';
  if(typeof raw.website!=='string' || raw.website.trim())errors.form='blocked';
  return Object.keys(errors).length?{ok:false,errors}:{ok:true,data:{...data,kind:'product',locale:'de',source:raw.source,interest:raw.interest}};
}

export function prepareEnquiry(data) {
  if(data.kind==='event')return {...prepareEventDraft(data),email:data.email};
  const offer=productInterests[data.interest];
  const lines=['Hallo ÉliteReplay-Team,',`ich interessiere mich für: ${offer}.`,'',`Name: ${data.name}`,`E-Mail: ${data.email}`];
  if(data.phone)lines.push(`Telefon: ${data.phone}`);
  if(data.message)lines.push('','Mein Anliegen:',data.message);
  lines.push('','Bitte meldet euch bei mir, um den nächsten Schritt abzustimmen.');
  return {prepared:true,sent:false,recipient,email:data.email,subject:`ÉliteReplay-Anfrage: ${offer}`,body:lines.join('\n')};
}

export function createEnquiryHandler({delivery,protection,origins=[],trustedProxy=false}={}) {
  return async function enquiry(req,res) {
    const reply=(status,payload,extra={})=>{
      res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra});
      res.end(JSON.stringify(payload));
    };
    const failure=(code,error,extra={})=>reply(code,{accepted:false,sent:false,error},extra);
    const expected=origins.find(origin=>new URL(origin).host===req.headers.host);
    if(!expected)return failure(403,'blocked');
    if(req.method==='GET')return reply(200,{mode:protection?.configured ? delivery.mode : 'unavailable'});
    if(req.method!=='POST')return failure(405,'method',{'Allow':'GET, POST'});
    if(req.headers.origin!==expected ||
      (req.headers['sec-fetch-site'] && req.headers['sec-fetch-site']!=='same-origin'))return failure(403,'blocked');
    if(req.headers['content-type']?.split(';')[0].trim()!=='application/json')return failure(415,'contentType');
    const id=req.headers['idempotency-key'];
    if(typeof id!=='string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return failure(400,'invalid');
    if(!protection?.configured)return failure(503,'unavailable');
    if(Number(req.headers['content-length'])>16384)return failure(413,'tooLarge');
    try {
      const rate=await protection.rate(enquiryAddress(req,trustedProxy));
      if(!rate.allowed)return failure(429,'rateLimit',{'Retry-After':String(rate.retryAfter)});
      const chunks=[];let size=0;
      for await(const chunk of req) {
        const buffer=Buffer.from(chunk);size+=buffer.length;
        if(size>16384)return failure(413,'tooLarge');
        chunks.push(buffer);
      }
      let raw;
      try{raw=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return failure(400,'invalid');}
      const checked=validateEnquiry(raw);
      if(!checked.ok)return reply(422,{accepted:false,sent:false,error:'validation',fields:checked.errors});
      const claim=await protection.claim(id,checked.data);
      if(claim.state==='conflict')return failure(409,'conflict');
      if(claim.state==='unknown')return failure(502,'deliveryUnknown');
      if(claim.state==='existing') {
        let receipt=claim.receipt;
        // Briefly wait for the other instance; never take over its send claim.
        for(let i=0;i<5 && receipt.state==='pending';i++) {
          await delay(100);
          receipt=await protection.read(claim);
        }
        if(receipt.state!=='complete')return failure(502,'deliveryUnknown',{'Retry-After':'5'});
        return reply(receipt.outcome.status,receipt.outcome.body);
      }
      if(claim.state!=='owned')return failure(503,'unavailable');
      const execute=async()=>{
        try {
          const result=await delivery.send({...prepareEnquiry(checked.data),requestId:id});
          if(result.simulated===true && result.accepted===false && result.sent===false)
            return {status:200,body:{accepted:false,sent:false,simulated:true}};
          if(result.accepted===true && result.sent===true && result.simulated===false)
            return {status:200,body:{accepted:true,sent:true,simulated:false}};
          throw new Error('Unconfirmed delivery');
        } catch(error) {
          if(error.code==='NOT_CONFIGURED')return {status:503,body:{accepted:false,sent:false,error:'notConfigured'}};
          if(['EAUTH','EENVELOPE','ECONNECTION','EDNS','ETLS','ECONNREFUSED'].includes(error.code))
            return {status:502,body:{accepted:false,sent:false,error:'deliveryFailed'}};
          // A lost SMTP acknowledgement can mean the message was accepted.
          return {status:502,body:{accepted:false,sent:false,error:'deliveryUnknown'}};
        }
      };
      const outcome=await execute();
      try {
        await protection.finish(claim,outcome);
      } catch {
        // Leave the shared pending record in place. It must not be retried as
        // a fresh send, even if SMTP accepted the message before this failure.
        return failure(502,'deliveryUnknown');
      }
      reply(outcome.status,outcome.body);
    } catch {
      if(!res.headersSent)failure(503,'unavailable');
    }
  };
}
