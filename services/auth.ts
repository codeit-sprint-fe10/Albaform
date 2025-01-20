import {
  PostSignUpBody,
  PostSignUpResponse,
  PostSignInBody,
  PostSignInResponse,
  PostRefreshBody,
  PostRefreshResponse,
  PostOauthSignUpBody,
  PostOauthSignUpResponse,
  PostOauthSignInBody,
  PostOauthSignInResponse,
} from '@/types/auth';
import { instance } from './axiosInstance';

export const postSignUp = async (body: PostSignUpBody) => {
  const response = await instance.post<PostSignUpResponse>(
    '/auth/sign-up',
    body,
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

export const postOauthSignUp = async (
  provider: string,
  body: PostOauthSignUpBody,
) => {
  const response = await instance.post<PostOauthSignUpResponse>(
    `/oauth/sign-up/${provider}`,
    body,
  );
  return response.data;
};

export const postOauthSignIn = async (
  provider: string,
  body: PostOauthSignInBody,
) => {
  const response = await instance.post<PostOauthSignInResponse>(
    `/oauth/sign-in/${provider}`,
    body,
  );
  return response.data;
};
