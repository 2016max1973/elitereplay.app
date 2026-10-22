import {createMailDelivery} from '../lib/enquiries/mail-delivery.mjs';
import {createEnquiryProtection} from '../lib/enquiries/protection.mjs';

// Production must not replace the website with an unconfigured enquiry form.
// verify() authenticates only: no envelope, recipient or message is submitted.
if (process.env.VERCEL_ENV === 'production') {
  const delivery = createMailDelivery();
  const protection = createEnquiryProtection();
  if (!protection.configured) {
    console.error('Release blocked: configure shared enquiry protection (Redis and hash secret). No email sent.');
    process.exitCode = 1;
  } else if (delivery.mode !== 'smtp') {
    console.error('Release blocked: configure the website SMTP variables in Vercel Production.');
    process.exitCode = 1;
  } else {
    try {
      await protection.verify();
      await delivery.verify();
      console.log('Shared enquiry store and SMTP authentication verified. No email sent.');
    } catch {
      console.error('Release blocked: shared enquiry store or SMTP authentication could not be verified. No email sent.');
      process.exitCode = 1;
    }
  }
} else {
  console.log('Website mail: local/preview build; no SMTP connection or email.');
}
