import {
  GetMeResponse,
  PatchMeBody,
  PatchMeResponse,
  PatchPasswordBody,
  PatchPasswordResponse,
} from '@/types/user';
import { instance } from './axiosInstance';

export const getMe = async () => {
  const response = await instance.get<GetMeResponse>('/users/me');
  return response.data;
};

export const patchMe = async (body: PatchMeBody) => {
  const bodyObj = Object.entries(body).reduce((acc, [key, value]) => {
    if (value) acc[key as keyof PatchMeBody] = value;
    return acc;
  }, {} as PatchMeBody);

  const response = await instance.patch<PatchMeResponse>('/users/me', bodyObj);
  return response.data;
};

export const patchPassword = async (body: PatchPasswordBody) => {
  const response = await instance.patch<PatchPasswordResponse>(
    '/users/me/password',
    body,
  );
  return response.data;
};
