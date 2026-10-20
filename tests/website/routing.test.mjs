import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {marketingDestination} from '../../lib/marketing-routes.mjs';

test('only approved landing pages are replaced; demos and delivery routes survive', () => {
  for (const slug of ['', '/matchboard', '/history', '/capture', '/camps-events']) {
    const destination = marketingDestination(`/de${slug}`);
    assert.equal(destination.kind, 'rewrite');
    assert.ok(existsSync(`public${destination.path}`));
  }
  for (const path of ['/de/matchboard/demo', '/de/matchboard/start',
    '/de/matchboard/setup', '/de/privacy', '/de/privacy/capture',
    '/de/imprint', '/de/match/example', '/de/highlight/example',
    '/de/camp/camp-1', '/en', '/es', '/en/contact', '/es/contact']) {
    assert.equal(marketingDestination(path), null, path);
  }
  assert.deepEqual(marketingDestination('/de/contact'),
    {kind: 'redirect', path: '/de', hash: '#kontakt'});
});

test('approved films and images retain their exact bytes', () => {
  const manifest = JSON.parse(readFileSync('docs/website-preview-source.json'));
  for (const [name, sha] of Object.entries(manifest.assets)) {
    const actual = createHash('sha256').update(readFileSync(`public/website-2026/assets/${name}`)).digest('hex');
    assert.equal(actual, sha, name);
  }
});

test('release pages retain the claim, have canonical URLs and no test ribbon', () => {
  for (const [locale, slugs] of [['de', ['index', 'matchboard', 'history', 'capture', 'camps-events']], ['en', ['camps-events']], ['es', ['camps-events']]]) {
    for (const slug of slugs) {
      const html = readFileSync(`public/website-2026/${locale}/${slug}.html`, 'utf8');
      const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
      assert.ok(text.includes('YOUR SCORE. YOUR FOCUS. YOUR MOMENT.'), `${locale}/${slug}`);
      assert.ok(!html.includes('class="preview-ribbon"'));
      assert.ok(!html.includes('noindex'));
      assert.match(html, /rel="canonical" href="https:\/\/elitereplay.de\//);
      assert.ok(!html.includes('127.0.0.1'));
      for (const match of html.matchAll(/(?:src|poster|href)="(\/website-2026\/[^"#?]+)"/g)) {
        assert.ok(existsSync(`public${match[1]}`), match[1]);
      }
    }
  }
});
