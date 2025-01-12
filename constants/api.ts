export const BE_BASE_URL = 'https://fe-project-albaform.vercel.app/10-4';

export const FE_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.albaform.store'
    : 'http://localhost:3000';

export const NON_AUTH_APIS = [
  { method: 'post', url: '/auth' },
  { method: 'post', url: '/oauth' },
  { method: 'get', url: '/posts' },
  { method: 'get', url: '/posts/' },
  { method: 'get', url: '/forms' },
  { method: 'get', url: '/forms/' },
  { method: 'post', url: '/resume' },
  { method: 'post', url: 'application' },
] as const;

export const COOKIE_NAMES = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  userRole: 'user_role',
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
} as const;
