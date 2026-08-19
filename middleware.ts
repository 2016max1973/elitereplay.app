// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de', 'es'],
  defaultLocale: 'de',
});

export const config = {
  matcher: ['/', '/(en|de|es)/:path*'],
};
