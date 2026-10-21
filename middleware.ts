// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {marketingDestination} from './lib/marketing-routes.mjs';
import {isRetiredCampPath, retiredCampResponse} from './lib/retired-camp-routes.mjs';
import {isRetiredShowcasePath, retiredShowcaseResponse} from './lib/retired-showcase-routes.mjs';

const localeMiddleware = createMiddleware({
  locales: ['en', 'de', 'es'],
  defaultLocale: 'de',
  localeCookie: false,
});

export default function middleware(request: NextRequest) {
  if (isRetiredCampPath(request.nextUrl.pathname)) {
    return retiredCampResponse(request.method);
  }
  if (isRetiredShowcasePath(request.nextUrl.pathname)) {
    return retiredShowcaseResponse(request.method);
  }
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
  matcher: ['/', '/(en|de|es)/:path*', '/matchboard', '/history', '/capture', '/camps-events', '/contact', '/datenschutz', '/camp/:path*', '/camp-a/:path*', '/camp-b/:path*', '/camp-highlights/:path*', '/api/camp-download/:path*', '/camp-assets/:path*', '/padelhouse/:path*', '/match/padel-germany-v1/:path*', '/highlight/padel-germany-v1-:deliveryId/:path*'],
};
