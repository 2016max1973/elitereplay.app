// Exact paths only: demos, delivery links and all other product routes keep
// using the current Next.js application.
const pages = new Map([
  ...['de', 'en', 'es'].flatMap(locale => [
    [`/${locale}`, `/website-2026/${locale}/index.html`],
    ...['matchboard', 'history', 'capture', 'camps-events'].map(
      slug => [`/${locale}/${slug}`, `/website-2026/${locale}/${slug}.html`]
    ),
  ]),
]);

export function marketingDestination(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (pages.has(path)) return {kind: 'rewrite', path: pages.get(path)};
  if (path === '/') return {kind: 'redirect', path: '/de'};
  if (path === '/contact' || /^\/(de|en|es)\/contact$/.test(path))
    return {kind: 'redirect', path: path === '/contact' ? '/de' : path.slice(0, 3), hash: '#kontakt'};
  if (path === '/datenschutz') return {kind: 'redirect', path: '/de/privacy'};
  if (['/matchboard', '/history', '/capture', '/camps-events'].includes(path))
    return {kind: 'redirect', path: `/de${path}`};
  return null;
}
