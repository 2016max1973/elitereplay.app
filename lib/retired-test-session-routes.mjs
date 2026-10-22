// Only the legacy QR/session prototype is retired. The current demo lives at
// /[locale]/matchboard/demo and remains available, including its History view.
export function isRetiredTestSessionPath(pathname) {
  let path;
  try {
    path = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  } catch {
    return false;
  }
  if (/^\/api\/start-session(?:\/|$)/.test(path)) return true;
  const unlocalized = path.replace(/^\/(?:de|en|es)(?=\/)/, '');
  return /^\/(?:demo|start|session)(?:\/|$)/.test(unlocalized);
}

export function retiredTestSessionResponse(method = 'GET', api = false) {
  const message = 'Dieser Testzugang wurde stillgelegt.';
  const body = api
    ? JSON.stringify({success: false, code: 'TEST_SESSION_RETIRED', message})
    : message;
  return new Response(method === 'HEAD' ? null : body, {
    status: 410,
    headers: {
      'Content-Type': api ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
