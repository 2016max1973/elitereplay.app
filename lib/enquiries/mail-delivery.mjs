import nodemailer from 'nodemailer';
import {recipient} from './event-request.mjs';

// Configuration is server-only. SMTP is never constructed in preview mode.
export function createMailDelivery({env=process.env,createTransport=nodemailer.createTransport}={}) {
  const mode=env.VERCEL_ENV==='preview' ? 'preview' : env.ELITEREPLAY_MAIL_MODE || 'unavailable';
  if(mode==='preview')return {
    mode:'preview',
    async send(){return {accepted:false,sent:false,simulated:true};}
  };
  const host=env.ELITEREPLAY_SMTP_HOST || 'smtps.udag.de';
  const port=Number(env.ELITEREPLAY_SMTP_PORT || 465);
  let user=env.ELITEREPLAY_SMTP_USER;
  let pass=env.ELITEREPLAY_SMTP_PASSWORD;

  if(mode!=='smtp' || host!=='smtps.udag.de' || ![465,587].includes(port) ||
      !user?.trim() || /[\r\n]/.test(user) || !pass)return {
    mode:'unavailable',
    async send(){throw Object.assign(new Error('Mail is not configured'),{code:'NOT_CONFIGURED'});}
  };
  const transport=createTransport({
    host,port,secure:port===465,requireTLS:true,
    auth:{user,pass},tls:{minVersion:'TLSv1.2',rejectUnauthorized:true},
    connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,
    disableFileAccess:true,disableUrlAccess:true,logger:false,debug:false
  });
  return {
    mode:'smtp',
    async verify(){await transport.verify();return true;},
    async send({subject,body,email,requestId}) {
      const info=await transport.sendMail({
        from:{name:'ÉliteReplay Website',address:recipient},
        to:recipient,replyTo:{address:email},
        subject,text:body,
        messageId:`<${requestId}@elitereplay.de>`,
        disableFileAccess:true,disableUrlAccess:true
      });
      // SMTP acceptance is not proof of inbox delivery.
      if(!info.accepted?.some(address=>String(address).toLowerCase()===recipient) ||
          info.rejected?.length)throw Object.assign(new Error('Recipient not accepted'),{code:'EENVELOPE'});
      return {accepted:true,sent:true,simulated:false};
    }
  };
}
