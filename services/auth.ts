import { UserRole, User } from '@/types/user';
import { instance } from './axiosInstance';

interface PostSignUpParams {
  email: string;
  password: string;
  role: UserRole;
}

interface PostSignUpRes {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export const postSignUp = async (params: PostSignUpParams) => {
  const bodyObj = { ...params, name: '익명', nickname: '익명' };

  const response = await instance.post<PostSignUpRes>('auth/sign-up', bodyObj);
  return response.data;
};

interface PostSignInParams {
  email: string;
  password: string;
}

interface PostSignInRes {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'password'>;
}

export const postSignIn = async (params: PostSignInParams) => {
  const bodyObj = params;

  const response = await instance.post<PostSignInRes>('auth/sign-in', bodyObj);
  return response.data;
};

interface PostRefreshParams {
  refreshToken: string;
}

interface PostRefreshRes {
  accessToken: string;
}

export const postRefresh = async (params: PostRefreshParams) => {
  const bodyObj = params;

  const response = await instance.post<PostRefreshRes>('auth/refresh', bodyObj);
  return response.data;
};
