import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {isRetiredTestSessionPath, retiredTestSessionResponse} from '../../lib/retired-test-session-routes.mjs';

test('old QR entry points and session links are closed in every supported language', () => {
  for (const locale of ['', '/de', '/en', '/es']) {
    for (const path of ['/demo', '/start', '/session', '/session/OLD-CODE']) {
      for (const suffix of ['', '/']) assert.equal(isRetiredTestSessionPath(locale + path + suffix), true);
    }
  }
  for (const path of ['/api/start-session', '/api/start-session/', '/api/start-session/old',
    '/de/%73tart', '/es/%73ession/OLD-CODE', '/api/%73tart-session']) {
    assert.equal(isRetiredTestSessionPath(path), true);
  }
});

test('current MatchBoard/History demo, marketing pages and enquiries are unaffected', () => {
  for (const locale of ['', '/de', '/en', '/es']) {
    for (const route of ['', '/matchboard', '/matchboard/demo', '/matchboard/demo/',
      '/matchboard/demo?view=history', '/history', '/capture', '/camps-events']) {
      const path = new URL((locale + route) || '/', 'http://localhost').pathname;
      assert.equal(isRetiredTestSessionPath(path), false, path);
    }
  }
  for (const path of ['/api/enquiry', '/api/event-enquiry', '/api/start-session-other',
    '/de/demonstration', '/de/startup', '/de/session-other', '/website-2026/assets/match-replay.mp4']) {
    assert.equal(isRetiredTestSessionPath(path), false, path);
  }
  assert.equal(isRetiredTestSessionPath('/de/%invalid'), false);
});

test('retirement returns a non-cacheable 410 without reflecting submitted data', async () => {
  for (const api of [true, false]) {
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']) {
      const response = retiredTestSessionResponse(method, api);
      assert.equal(response.status, 410);
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
      const body = await response.text();
      if (method === 'HEAD') assert.equal(body, '');
      else if (api) assert.deepEqual(JSON.parse(body), {
        success: false, code: 'TEST_SESSION_RETIRED', message: 'Dieser Testzugang wurde stillgelegt.',
      });
      else assert.equal(body, 'Dieser Testzugang wurde stillgelegt.');
    }
  }
});

// Exercise the actual route exports without Next middleware or a server. Only
// the side-effect-free retirement helper may be imported; no former store runs.
async function loadRetiredRoute(relativePath) {
  const url = new URL(`../../${relativePath}`, import.meta.url);
  const source = await readFile(url, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022},
  }).outputText.replace(/from\s+(['"])([^'"]+)\1/g, (_, quote, specifier) => {
    const dependency = new URL(specifier, url);
    assert.equal(dependency.href, new URL('../../lib/retired-test-session-routes.mjs', import.meta.url).href);
    return `from ${JSON.stringify(dependency.href)}`;
  });
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
}

test('all route handlers stay closed without middleware and never read a body or session code', async () => {
  const paths = ['app/api/start-session/route.ts', 'app/start/route.ts',
    'app/[locale]/start/route.ts', 'app/[locale]/demo/route.ts',
    'app/[locale]/session/[code]/route.ts'];
  for (const path of paths) {
    const handlers = await loadRetiredRoute(path);
    for (const method of ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
      const request = new Proxy({method}, {
        get(target, key) {
          assert.equal(key, 'method', 'Retired routes must not inspect or process a request');
          return target.method;
        },
      });
      const context = new Proxy({}, {get() { throw new Error('Must not read session code'); }});
      const response = await handlers[method](request, context);
      assert.equal(response.status, 410, `${method} ${path}`);
    }
  }
});
