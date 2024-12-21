export const names = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  userRole: 'user_role',
} as const;

export const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 7,
  path: '/',
} as const;
