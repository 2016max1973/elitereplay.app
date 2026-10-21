import test from 'node:test';
import assert from 'node:assert/strict';
import {isRetiredShowcasePath, retiredShowcaseResponse} from '../../lib/retired-showcase-routes.mjs';

test('PadelHouse and every Padel Germany delivery page are offline in all languages', () => {
  const paths = ['/padelhouse', '/match/padel-germany-v1',
    ...Array.from({length: 10}, (_, i) => `/highlight/padel-germany-v1-${String(i + 1).padStart(2, '0')}`)];
  for (const locale of ['', '/de', '/en', '/es']) {
    for (const path of paths) {
      assert.equal(isRetiredShowcasePath(locale + path), true);
      assert.equal(isRetiredShowcasePath(locale + path + '/'), true);
    }
  }
  assert.equal(isRetiredShowcasePath('/de/match/%70adel-germany-v1'), true);
  assert.equal(isRetiredShowcasePath('/es/padelhouse/details'), true);
});

test('the five marketing pages, demos, other deliveries and shared films are unaffected', () => {
  for (const locale of ['', '/de', '/en', '/es']) {
    for (const path of ['', '/matchboard', '/history', '/capture', '/camps-events', '/matchboard/demo',
      '/match/another-match', '/highlight/another-highlight', '/match/padel-germany-v10']) {
      assert.equal(isRetiredShowcasePath(locale + path), false);
    }
  }
  for (const path of ['/website-2026/assets/match-replay.mp4', '/videos/elitereplay-match-highlights.mp4',
    '/api/enquiry', '/api/event-enquiry', '/de/padelhouse-other']) {
    assert.equal(isRetiredShowcasePath(path), false);
  }
});

test('offline response exposes no page data and disallows caching and indexing', async () => {
  const response = retiredShowcaseResponse();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
  assert.equal(await response.text(), 'Diese Seite ist nicht mehr verfügbar.');
  assert.equal(await retiredShowcaseResponse('HEAD').text(), '');
});
