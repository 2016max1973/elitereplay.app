import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createMailDelivery} from '../../lib/enquiries/mail-delivery.mjs';

test('hosted previews cannot send even when production credentials were accidentally assigned', async () => {
  const delivery = createMailDelivery({
    env: {VERCEL_ENV: 'preview', ELITEREPLAY_MAIL_MODE: 'smtp',
      ELITEREPLAY_SMTP_USER: 'fake', ELITEREPLAY_SMTP_PASSWORD: 'fake'},
    createTransport() { throw new Error('A preview must not open SMTP'); },
  });
  assert.equal(delivery.mode, 'preview');
  assert.equal((await delivery.send()).sent, false);
});

test('production without configuration stays unavailable', () => {
  assert.equal(createMailDelivery({env: {VERCEL_ENV: 'production'}}).mode, 'unavailable');
});

test('production readiness check authenticates only and never sends a message', async () => {
  let verifications = 0, sends = 0;
  const delivery = createMailDelivery({
    env: {VERCEL_ENV: 'production', ELITEREPLAY_MAIL_MODE: 'smtp',
      ELITEREPLAY_SMTP_USER: 'fake', ELITEREPLAY_SMTP_PASSWORD: 'fake'},
    createTransport() {
      return {
        async verify() { verifications++; return true; },
        async sendMail() { sends++; throw new Error('Not allowed'); },
      };
    },
  });
  assert.equal(await delivery.verify(), true);
  assert.equal(verifications, 1);
  assert.equal(sends, 0);
});
