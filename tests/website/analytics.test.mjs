import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createContext, runInContext} from 'node:vm';

const source = readFileSync('public/website-2026/analytics.js', 'utf8');
const pages = ['de', 'de/matchboard', 'de/history', 'de/capture', 'de/camps-events'];

function boot(url) {
  const scripts = [];
  const window = {location: new URL(url)};
  const document = {
    querySelector: () => scripts[0] || null,
    createElement: () => ({}),
    head: {appendChild(script) {
      assert.equal(window.vaq[0][0], 'beforeSend', 'privacy filter precedes vendor load');
      scripts.push(script);
    }},
  };
  const context = createContext({window, document, URL, URLSearchParams});
  runInContext(source, context);
  return {window, scripts, context, beforeSend: window.vaq?.[0][1]};
}

test('each published German page loads the counter once on the production domains', () => {
  for (const host of ['elitereplay.de', 'www.elitereplay.de']) {
    for (const path of pages) {
      const url = `https://${host}/${path}`;
      const result = boot(url);
      assert.equal(result.scripts.length, 1, url);
      assert.equal(result.scripts[0].src, '/_vercel/insights/script.js');
      assert.equal(result.scripts[0].defer, true);
      assert.equal(result.beforeSend({type: 'pageview', url}).url, url);
      runInContext(source, result.context);
      assert.equal(result.scripts.length, 1, 'no duplicate script or automatic pageview');
    }
  }
});

test('local, preview, other languages, demo and private delivery URLs never load the counter', () => {
  for (const url of [
    'http://127.0.0.1:4180/de', 'http://localhost:4179/de',
    'https://elitereplay-preview.vercel.app/de', 'https://elitereplay.de:4181/de',
    'https://elitereplay.de.evil.test/de', 'http://elitereplay.de/de',
    'https://elitereplay.de/en', 'https://elitereplay.de/es/camps-events',
    'https://elitereplay.de/website-2026/de/index.html',
    ...['matchboard/demo', 'matchboard/start', 'session/private', 'match/123',
      'highlight/private', 'camp/private', 'history/private', 'unknown']
      .map(path => `https://elitereplay.de/de/${path}`),
  ]) {
    const result = boot(url);
    assert.equal(result.scripts.length, 0, url);
    assert.equal(result.window.va, undefined, url);
  }
});

test('the first and later pageviews omit arbitrary parameters, credentials and fragments', () => {
  const {beforeSend} = boot('https://elitereplay.de/de');
  const result = beforeSend({type: 'pageview', url:
    'https://name:secret@elitereplay.de/de/camps-events/?email=person@example.com&token=secret&art=camp&utm_source=instagram&utm_medium=social&utm_campaign=club_pilot&utm_content=private#kontakt'});
  assert.equal(result.url, 'https://elitereplay.de/de/camps-events?utm_source=instagram&utm_medium=social&utm_campaign=club_pilot');
  assert.equal(beforeSend({type: 'pageview', url:
    'https://elitereplay.de/de?utm_source=person@example.com&utm_campaign=private'}).url,
  'https://elitereplay.de/de');
  for (const url of ['invalid', 'https://other.test/de', 'https://elitereplay.de/de/match/private']) {
    assert.equal(beforeSend({type: 'pageview', url}), null);
  }
});

test('custom events and identity/form payloads cannot enter the new counter', () => {
  const {beforeSend} = boot('https://elitereplay.de/de');
  for (const name of ['contact_click', 'email_click', 'identify', 'group', 'form_submit']) {
    assert.equal(beforeSend({type: 'event', url: 'https://elitereplay.de/de',
      payload: {name, data: {email: 'person@example.com'}}}), null);
  }
  const result = beforeSend({type: 'pageview', url: 'https://elitereplay.de/de',
    payload: {email: 'person@example.com'}, __cdp: 'private'});
  assert.deepEqual(Object.keys(result).sort(), ['type', 'url']);
});

test('only the five German static pages include the bootstrap', () => {
  const tag = '<script src="/website-2026/analytics.js" defer></script>';
  for (const slug of ['index', 'matchboard', 'history', 'capture', 'camps-events']) {
    const html = readFileSync(`public/website-2026/de/${slug}.html`, 'utf8');
    assert.equal(html.split(tag).length - 1, 1, slug);
  }
  for (const locale of ['en', 'es']) {
    const html = readFileSync(`public/website-2026/${locale}/camps-events.html`, 'utf8');
    assert.ok(!html.includes(tag));
  }
});
