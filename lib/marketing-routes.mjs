// Exact paths only: demos, delivery links and all other product routes keep
// using the current Next.js application.
const pages = new Map([
  ['/de', '/website-2026/de/index.html'],
  ...['matchboard', 'history', 'capture', 'camps-events'].map(
    slug => [`/de/${slug}`, `/website-2026/de/${slug}.html`]
  ),
  ...['en', 'es'].map(
    locale => [`/${locale}/camps-events`, `/website-2026/${locale}/camps-events.html`]
  ),
]);

export function marketingDestination(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (pages.has(path)) return {kind: 'rewrite', path: pages.get(path)};
  if (path === '/') return {kind: 'redirect', path: '/de'};
  if (['/contact', '/de/contact'].includes(path))
    return {kind: 'redirect', path: '/de', hash: '#kontakt'};
  if (path === '/datenschutz') return {kind: 'redirect', path: '/de/privacy'};
  if (['/matchboard', '/history', '/capture', '/camps-events'].includes(path))
    return {kind: 'redirect', path: `/de${path}`};
  return null;
}
