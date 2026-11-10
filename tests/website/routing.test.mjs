import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {marketingDestination} from '../../lib/marketing-routes.mjs';

test('only approved landing pages are replaced; demos and delivery routes survive', () => {
  for (const locale of ['de','en','es']) for (const slug of ['', '/matchboard', '/history', '/capture', '/camps-events']) {
    const destination = marketingDestination(`/${locale}${slug}`);
    assert.equal(destination.kind, 'rewrite');
    assert.ok(existsSync(`public${destination.path}`));
  }
  for (const path of ['/de/matchboard/demo', '/de/matchboard/start',
    '/de/matchboard/setup', '/de/privacy', '/de/privacy/capture',
    '/de/imprint', '/de/match/example', '/de/highlight/example',
    '/de/camp/camp-1', '/en/matchboard/demo', '/es/matchboard/demo',
    '/en/privacy', '/es/imprint']) {
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
  for (const locale of ['de','en','es']) {
    const slugs = ['index', 'matchboard', 'history', 'capture', 'camps-events'];
    for (const slug of slugs) {
      const html = readFileSync(`public/website-2026/${locale}/${slug}.html`, 'utf8');
      const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
      assert.ok(text.includes('YOUR SCORE. YOUR FOCUS. YOUR MOMENT.'), `${locale}/${slug}`);
      assert.ok(!html.includes('class="preview-ribbon"'));
      assert.ok(!html.includes('noindex'));
      const publicationLabels = [
        html.match(/<title>(.*?)<\/title>/s)?.[1],
        html.match(/<footer\b[^>]*>(.*?)<\/footer>/s)?.[1],
        html.match(/property="og:title" content="([^"]*)"/)?.[1],
      ].join(' ');
      assert.doesNotMatch(publicationLabels, /test preview|Testvorschau|vista previa/i);
      assert.match(html, /rel="canonical" href="https:\/\/elitereplay.de\//);
      assert.ok(!html.includes('127.0.0.1'));
      for (const match of html.matchAll(/(?:src|poster|href)="(\/website-2026\/[^"#?]+)"/g)) {
        assert.ok(existsSync(`public${match[1]}`), match[1]);
      }
    }
  }
});

test('each language switch opens the same page and all locale forms remain present', () => {
  for (const locale of ['de','en','es']) for (const slug of ['index','matchboard','history','capture','camps-events']) {
    const html = readFileSync(`public/website-2026/${locale}/${slug}.html`, 'utf8');
    const suffix = slug === 'index' ? '' : `/${slug}`;
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    const switcher = html.match(/<!-- language-switch -->(.*?)<!-- \/language-switch -->/s)?.[1];
    assert.ok(switcher);
    assert.equal((switcher.match(/aria-current="page"/g) || []).length, 1);
    for (const target of ['de','en','es']) {
      assert.ok(switcher.includes(`href="/${target}${suffix}"`));
      assert.ok(html.includes(`hreflang="${target}" href="https://elitereplay.de/${target}${suffix}"`));
    }
    assert.ok(html.includes('<main id="inhalt">'));
    assert.ok(html.includes('data-enquiry='));
    assert.ok(html.includes('</footer>'));
    const form = JSON.parse(html.match(/<script id="enquiryCopy" type="application\/json">(.*?)<\/script>/s)[1]);
    assert.equal(form.locale, locale);
    assert.ok(form.form.previewSuccess && form.form.deliveryUnknown);
    // Product navigation, privacy and contact remain within the selected locale.
    const withoutSwitch = html.replace(/<!-- language-switch -->.*?<!-- \/language-switch -->/s, '');
    const internalLinks = [...withoutSwitch.matchAll(/<a\b[^>]*href="(\/(?:de|en|es)(?:\/[^"]*)?)"/g)].map(m=>m[1]);
    assert.ok(internalLinks.length > 10);
    assert.ok(internalLinks.every(link=>link === `/${locale}` || link.startsWith(`/${locale}/`) || link.startsWith(`/${locale}#`)), `${locale}/${slug}: cross-language link`);
  }
});
