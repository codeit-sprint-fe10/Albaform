import {
  PostSignUpBody,
  PostSignUpResponse,
  PostSignInBody,
  PostSignInResponse,
  PostRefreshBody,
  PostRefreshResponse,
} from '@/types/auth';
import { instance } from './axiosInstance';

export const postSignUp = async (body: PostSignUpBody) => {
  const bodyObj = { ...body, name: '익명' };

  const response = await instance.post<PostSignUpResponse>(
    '/auth/sign-up',
    bodyObj,
  );
  return response.data;
};

export const postSignIn = async (body: PostSignInBody) => {
  const response = await instance.post<PostSignInResponse>(
    '/auth/sign-in',
    body,
  );
  return response.data;
};

export const postRefresh = async (body: PostRefreshBody) => {
  const response = await instance.post<PostRefreshResponse>(
    '/auth/refresh',
    body,
  );
  return response.data;
};
