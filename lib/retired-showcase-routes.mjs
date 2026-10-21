// Retire these public pages without deleting the local pages or shared media.
// Marketing pages and their existing films remain available.
export function isRetiredShowcasePath(pathname) {
  let path;
  try {
    path = decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  } catch {
    return false;
  }
  const unlocalized = path.replace(/^\/(?:de|en|es)(?=\/)/, '');
  return /^\/padelhouse(?:\/|$)/.test(unlocalized)
    || /^\/match\/padel-germany-v1(?:\/|$)/.test(unlocalized)
    || /^\/highlight\/padel-germany-v1-(?:0[1-9]|10)(?:\/|$)/.test(unlocalized);
}

export function retiredShowcaseResponse(method = 'GET') {
  return new Response(method === 'HEAD' ? null : 'Diese Seite ist nicht mehr verfügbar.', {
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
