import axios, { AxiosError } from 'axios';
import { notFound } from 'next/navigation';
import { postRefresh } from './auth';
import { printError } from '@/utils/console';
import { BE_BASE_URL, NON_AUTH_APIS } from '@/constants/api';
import { getCookies, patchCookies, deleteCookies } from './cookie';

export const instance = axios.create({
  baseURL: BE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async (config) => {
  if (
    NON_AUTH_APIS.some(
      (api) => config.method === api.method && api.regExp.test(config.url!),
    )
  ) {
    return config;
  }

  try {
    const auths = await getCookies();
    if (Object.values(auths!).some((auth) => !auth)) {
      throw new AxiosError('저장된 유저 정보가 없습니다.', '401');
    }
    config.headers['Authorization'] = `Bearer ${auths.accessToken}`;
  } catch (error) {
    printError(error as AxiosError<{ message: string }>);
    await deleteCookies();
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    printError(error);

    if (error.status === 404 || error.status === 403) {
      notFound();
    }

    if (error.response.status === 401)
      if (error.response?.data.message === 'Access token has expired') {
        try {
          const auths = await getCookies();
          const { accessToken } = await postRefresh({
            refreshToken: auths.refreshToken!,
          });
          await patchCookies({ accessToken });
          return await instance(error.config);
        } catch (refreshError) {
          printError(refreshError as AxiosError<{ message: string }>);
          await deleteCookies();
        }
      }
    return Promise.reject(error);
  },
);
