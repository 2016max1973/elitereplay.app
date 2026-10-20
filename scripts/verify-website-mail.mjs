import {createMailDelivery} from '../lib/enquiries/mail-delivery.mjs';

// Production must not replace the website with an unconfigured enquiry form.
// verify() authenticates only: no envelope, recipient or message is submitted.
if (process.env.VERCEL_ENV === 'production') {
  const delivery = createMailDelivery();
  if (delivery.mode !== 'smtp') {
    console.error('Release blocked: configure the website SMTP variables in Vercel Production.');
    process.exitCode = 1;
  } else {
    try {
      await delivery.verify();
      console.log('Website SMTP connection and authentication verified. No email sent.');
    } catch {
      console.error('Release blocked: website SMTP authentication could not be verified. No email sent.');
      process.exitCode = 1;
    }
  }
} else {
  console.log('Website mail: local/preview build; no SMTP connection or email.');
}
