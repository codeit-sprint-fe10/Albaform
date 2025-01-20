import { User } from '@/types/user';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export type PostSignUpBody = Pick<User, 'email' | 'password' | 'name' | 'role'>;
export type PostSignUpResponse = AuthResponse;

export type PostSignInBody = Pick<User, 'email' | 'password'>;
export type PostSignInResponse = AuthResponse;

export type PostRefreshBody = { refreshToken: string };
export type PostRefreshResponse = { accessToken: string };

export interface PostOauthSignUpBody
  extends Partial<Omit<User, 'id' | 'email' | 'password' | 'imageUrl'>> {
  redirectUri: string;
  token: string;
}
export type PostOauthSignUpResponse = AuthResponse;

export interface PostOauthSignInBody {
  redirectUri: string;
  token: string;
}
export type PostOauthSignInResponse = AuthResponse;
