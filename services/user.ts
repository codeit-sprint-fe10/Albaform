import { User } from '@/types/user';
import { instance } from './axiosInstance';

type GetMeRes = Omit<User, 'password'>;

export const GetMe = async () => {
  const response = await instance.get<GetMeRes>('user/me');
  return response.data;
};

type PatchMeParams = Partial<Omit<User, 'id' | 'email' | 'password' | 'role'>>;

type PatchMeRes = Omit<User, 'password'>;

export const PatchMe = async (params: PatchMeParams) => {
  const bodyObj = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) acc[key as keyof PatchMeParams] = value;
    return acc;
  }, {} as PatchMeParams);

  const response = await instance.post<PatchMeRes>('user/me', bodyObj);
  return response.data;
};

interface PatchPasswordParams {
  currentPassword: string;
  newPassword: string;
}

interface PatchPasswordRes {
  message: string;
}

export const PatchPassword = async (params: PatchPasswordParams) => {
  const bodyObj = params;

  const response = await instance.post<PatchPasswordRes>(
    'user/me/password',
    bodyObj,
  );
  return response.data;
};
