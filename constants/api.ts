export const BE_BASE_URL = 'https://fe-project-albaform.vercel.app/10-4';

export const FE_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.albaform.store'
    : 'http://localhost:3000';

export const NON_AUTH_APIS = [
  { method: 'post', regExp: /^\/auth/ },
  { method: 'post', regExp: /^\/oauth/ },
  { method: 'get', regExp: /^\/posts$/ },
  { method: 'get', regExp: /^\/posts\/[0-9]+$/ },
  { method: 'get', regExp: /^\/forms$/ },
  { method: 'post', regExp: /^\/resume\/upload$/ },
  { method: 'post', regExp: /^\/forms\/[0-9]+\/applications$/ },
  { method: 'post', regExp: /^\/forms\/[0-9]+\/my-application\/verify$/ },
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
