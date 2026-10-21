import test from 'node:test';
import assert from 'node:assert/strict';
import {isRetiredCampPath, retiredCampResponse} from '../../lib/retired-camp-routes.mjs';

test('retired archives and aliases are closed in every supported language', () => {
  for (const prefix of ['', '/de', '/en', '/es']) {
    for (const route of ['/camp/camp-1', '/camp/camp-2', '/camp-a', '/camp-b', '/camp-highlights']) {
      for (const suffix of ['', '/']) assert.equal(isRetiredCampPath(prefix + route + suffix), true);
    }
  }
  assert.equal(isRetiredCampPath('/api/camp-download'), true);
  assert.equal(isRetiredCampPath('/camp-assets/camp-1/videos/example.mp4'), true);
  assert.equal(isRetiredCampPath('/camp-assets/camp-2/thumbs/example.jpg'), true);
});

test('marketing pages, MatchBoard demos and enquiry routes stay available', () => {
  for (const prefix of ['', '/de', '/en', '/es']) {
    for (const route of ['', '/matchboard', '/history', '/capture', '/camps-events', '/matchboard/demo']) {
      assert.equal(isRetiredCampPath((prefix + route) || '/'), false);
    }
  }
  for (const path of ['/api/enquiries', '/api/event-enquiry', '/camping', '/camp-assets/camp-3/video.mp4']) {
    assert.equal(isRetiredCampPath(path), false);
  }
});

test('retired route response reveals no videos or access key and is not cached', async () => {
  const response = retiredCampResponse();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  assert.equal(await response.text(), 'Dieses Camp-Archiv wurde entfernt.');
  const head = retiredCampResponse('HEAD');
  assert.equal(head.status, 410);
  assert.equal(await head.text(), '');
});
