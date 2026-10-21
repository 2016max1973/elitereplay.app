// Camp 1 and Camp 2 were archived locally and retired at the owner's request.
// Keep former URLs closed even when a visitor still has an old access link.
export function isRetiredCampPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  return /^\/(?:de\/|en\/|es\/)?(?:camp|camp-a|camp-b|camp-highlights)(?:\/|$)/.test(path)
    || /^\/api\/camp-download(?:\/|$)/.test(path)
    || /^\/camp-assets\/camp-[12](?:\/|$)/.test(path);
}

export function retiredCampResponse(method = 'GET') {
  return new Response(method === 'HEAD' ? null : 'Dieses Camp-Archiv wurde entfernt.', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
