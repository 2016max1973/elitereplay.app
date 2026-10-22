import {createEnquiryHandler} from '../../../lib/enquiries/enquiry.mjs';
import {createEnquiryProtection} from '../../../lib/enquiries/protection.mjs';
import {request} from './enquiry-fixture.mjs';
import {setTimeout as delay} from 'node:timers/promises';

// No mail-delivery import, credentials, SMTP client or real mail connection.
const handler=createEnquiryHandler({origins:['https://elitereplay.de'],trustedProxy:true,
  protection:createEnquiryProtection(),delivery:{mode:'smtp',async send() {
    process.send({type:'send'});
    if(process.env.TEST_DELIVERY==='crash')await new Promise(()=>{});
    await delay(20);
    if(process.env.TEST_DELIVERY==='unknown')throw Object.assign(new Error('Simulated lost acknowledgement'),{code:'ETIMEDOUT'});
    return {accepted:true,sent:true,simulated:false};
  }}});
process.on('message',async({ticket,body,options})=>{
  const result=await request(handler,body,options);
  process.send({type:'result',ticket,result});
});
process.send({type:'ready'});
