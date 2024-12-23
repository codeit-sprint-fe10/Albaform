import { UserRole, User } from '@/types/user';
import { instance } from './axiosInstance';

interface PostSignUpBody {
  email: string;
  password: string;
  role: UserRole;
}

interface PostSignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export const postSignUp = async (body: PostSignUpBody) => {
  const bodyObj = { ...body, name: '익명', nickname: '익명' };

  const response = await instance.post<PostSignUpResponse>(
    '/auth/sign-up',
    bodyObj,
  );
  return response.data;
};

interface PostSignInBody {
  email: string;
  password: string;
}

interface PostSignInResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export const postSignIn = async (body: PostSignInBody) => {
  const response = await instance.post<PostSignInResponse>(
    '/auth/sign-in',
    body,
  );
  return response.data;
};

interface PostRefreshBody {
  refreshToken: string;
}

interface PostRefreshResponse {
  accessToken: string;
}

export const postRefresh = async (body: PostRefreshBody) => {
  const response = await instance.post<PostRefreshResponse>(
    '/auth/refresh',
    body,
  );
  return response.data;
};
