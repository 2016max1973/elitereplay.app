// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {marketingDestination} from './lib/marketing-routes.mjs';

const localeMiddleware = createMiddleware({
  locales: ['en', 'de', 'es'],
  defaultLocale: 'de',
  localeCookie: false,
});

export default function middleware(request: NextRequest) {
  const destination = marketingDestination(request.nextUrl.pathname);
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination.path;
    if (destination.hash) url.hash = destination.hash;
    return destination.kind === 'rewrite'
      ? NextResponse.rewrite(url)
      : NextResponse.redirect(url, 308);
  }
  return localeMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|de|es)/:path*', '/matchboard', '/history', '/capture', '/camps-events', '/contact', '/datenschutz'],
};
