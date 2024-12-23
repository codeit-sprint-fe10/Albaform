import { User } from '@/types/user';
import { instance } from './axiosInstance';

type GetMeResponse = Omit<User, 'password'>;

export const getMe = async () => {
  const response = await instance.get<GetMeResponse>('/user/me');
  return response.data;
};

type PatchMeBody = Partial<Omit<User, 'id' | 'email' | 'password' | 'role'>>;

type PatchMeResponse = Omit<User, 'password'>;

export const patchMe = async (body: PatchMeBody) => {
  const bodyObj = Object.entries(body).reduce((acc, [key, value]) => {
    if (value) acc[key as keyof PatchMeBody] = value;
    return acc;
  }, {} as PatchMeBody);

  const response = await instance.post<PatchMeResponse>('/user/me', bodyObj);
  return response.data;
};

interface PatchPasswordBody {
  currentPassword: string;
  newPassword: string;
}

interface PatchPasswordResponse {
  message: string;
}

export const patchPassword = async (body: PatchPasswordBody) => {
  const response = await instance.post<PatchPasswordResponse>(
    '/user/me/password',
    body,
  );
  return response.data;
};
