import {Readable} from 'node:stream';
import {createEnquiryHandler} from '../../../lib/enquiries/enquiry.mjs';
import {createMailDelivery} from '../../../lib/enquiries/mail-delivery.mjs';
import {createEnquiryProtection} from '../../../lib/enquiries/protection.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 45;

const origins = ['https://elitereplay.de', 'https://www.elitereplay.de'];
if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
if (process.env.VERCEL_BRANCH_URL) origins.push(`https://${process.env.VERCEL_BRANCH_URL}`);
if (!process.env.VERCEL) {
  origins.push('http://127.0.0.1:4180', 'http://localhost:4180');
}
const handler = createEnquiryHandler({
  delivery: createMailDelivery(),
  protection: createEnquiryProtection(),
  origins,
  trustedProxy: process.env.VERCEL === '1',
});

async function enquiry(request) {
  const req = request.body ? Readable.fromWeb(request.body) : Readable.from([]);
  req.method = request.method;
  req.headers = Object.fromEntries(request.headers);
  req.socket = {remoteAddress: '127.0.0.1'};
  let status, headers, body;
  const res = {
    headersSent: false,
    writeHead(code, values) {
      status = code;
      headers = values;
      this.headersSent = true;
    },
    end(value) { body = value; },
  };
  await handler(req, res);
  return new Response(body, {status, headers});
}

export {enquiry as GET, enquiry as POST};
