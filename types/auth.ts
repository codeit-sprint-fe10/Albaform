import { User } from '@/types/user';

export type PostSignUpBody = Pick<User, 'email' | 'password' | 'role'>;

export interface PostSignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export type PostSignInBody = Pick<User, 'email' | 'password'>;

export interface PostSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export interface PostRefreshBody {
  refreshToken: string;
}

export interface PostRefreshResponse {
  accessToken: string;
}
