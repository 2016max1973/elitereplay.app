import {Readable} from 'node:stream';
import {randomUUID} from 'node:crypto';

export const good={kind:'product',source:'home',locale:'de',interest:'Club',name:'Vorschau Test',email:'preview@example.invalid',phone:'',message:'Nur lokaler Test – keine Nachricht.',website:''};
export const event={kind:'event',locale:'de',type:'camp',date:'',dateOpen:true,location:'Testclub',participants:'24',duration:'Ein Nachmittag',interest:'video',name:good.name,email:good.email,phone:'',message:'Nur Test',website:''};

export async function request(handler,body=good,{headers={},method='POST',id=randomUUID(),chunks,address='127.0.0.1'}={}) {
  const req=Readable.from(chunks||[typeof body==='string'?body:JSON.stringify(body)]);
  req.method=method;
  req.headers={host:'elitereplay.de',origin:'https://elitereplay.de','content-type':'application/json','idempotency-key':id,...headers};
  req.socket={remoteAddress:address};
  const res={headersSent:false,writeHead(status,headers){this.status=status;this.headers=headers;this.headersSent=true;},end(body){this.body=JSON.parse(body);}};
  await handler(req,res);
  return {status:res.status,headers:res.headers,body:res.body};
}

// Handler-unit-test double only. Production has no in-memory implementation.
// Atomic scripts and cross-process behavior are tested against real Redis.
export function fakeProtection(now=Date.now) {
  const rates=new Map(),receipts=new Map();
  return {
    configured:true,
    async rate(ip) {
      let entry=rates.get(ip);
      if(!entry || now()-entry.start>=60000)rates.set(ip,entry={start:now(),count:0});
      return {allowed:++entry.count<=12,retryAfter:60};
    },
    async claim(id,data) {
      const fingerprint=JSON.stringify(data),previous=receipts.get(id);
      if(previous && previous.fingerprint!==fingerprint)return {state:'conflict'};
      if(previous)return {state:'existing',id,receipt:previous.receipt};
      receipts.set(id,{fingerprint,receipt:{state:'pending'}});
      return {state:'owned',id};
    },
    async read(claim) {return receipts.get(claim.id).receipt;},
    async finish(claim,outcome) {receipts.get(claim.id).receipt={state:'complete',outcome};}
  };
}
