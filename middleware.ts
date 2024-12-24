import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const denyPaths = {
  APPLICANT: ['/signup', '/oauth', '/signin', '/addform', '/applications'],
  OWNER: ['/signup', '/oauth', '/signin', '/apply', '/myapply'],
  GUEST: [
    '/addform',
    '/apply',
    '/applications',
    '/myalbaform',
    '/addtalk',
    '/mypage',
  ],
} as const;

const middleware = (request: NextRequest) => {
  const userRole = request.cookies.get('user_role')?.value || 'GUEST';
  const paths = denyPaths[userRole as 'APPLICANT' | 'OWNER' | 'GUEST'];
  const nextPath = request.nextUrl.pathname;

  if (paths.some((path) => nextPath.startsWith(path)))
    return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    '/signup/:path',
    '/oauth/signup/:path*',
    '/signin/:path',
    '/addform',
    '/apply/:path',
    '/myapply/:path',
    '/applications/:path',
    '/myalbaform',
    '/addtalk',
    '/mypage',
  ],
};
