import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const denyPaths = {
  APPLICANT: ['/signup', '/oauth', '/signin', '/addform', '/applications'],
  OWNER: ['/signup', '/oauth', '/signin', '/apply', '/myapply'],
  GUEST: [
    '/addform',
    '/applications',
    '/myalbaform',
    '/albatalk',
    '/addtalk',
    '/edit',
    '/mypage',
  ],
} as const;

const authPaths = [
  '/signup/applicant',
  '/signup/owner',
  '/signin/applicant',
  '/signin/owner',
  '/oauth/google',
  '/oauth/kakao',
  '/oauth/signup/applicant/google',
  '/oauth/signup/applicant/kakao',
  '/oauth/signup/owner/google',
  '/oauth/signup/owner/kakao',
];

const middleware = (request: NextRequest) => {
  const userRole = request.cookies.get('user_role')?.value || 'GUEST';
  const paths = denyPaths[userRole as 'APPLICANT' | 'OWNER' | 'GUEST'];
  const nextPath = request.nextUrl.pathname;

  if (['signup', 'signin', 'oauth'].some((auth) => nextPath.includes(auth))) {
    if (!authPaths.includes(nextPath)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (paths.some((path) => nextPath.includes(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    '/signup/:path',
    '/signin/:path',
    '/oauth/:path*',
    '/addform',
    '/alba/:path/edit',
    '/apply/:path',
    '/myapply/:path',
    '/applications/:path*',
    '/myalbaform',
    '/albatalk/:path',
    '/addtalk',
    '/albatalk/:path/edit',
    '/mypage',
  ],
};
