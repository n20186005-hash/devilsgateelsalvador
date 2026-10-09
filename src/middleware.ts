import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || 'https';

  // 规范化到 www + https，避免非 www / http 重复收录（仅对生产域名生效，不干预本地开发）
  const isApex = host === 'devilsgateelsalvador.com';
  const needsHttps = proto === 'http';
  if (isApex || needsHttps) {
    const targetHost = isApex ? `www.${host}` : host;
    const url = new URL(request.url);
    url.protocol = 'https';
    url.host = targetHost;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
