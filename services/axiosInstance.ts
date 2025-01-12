import axios, { AxiosError } from 'axios';
import { postRefresh } from './auth';
import { printError } from '@/utils/console';
import {
  BE_BASE_URL,
  FE_BASE_URL,
  COOKIE_NAMES,
  NON_AUTH_APIS,
} from '@/constants/api';

export const instance = axios.create({
  baseURL: BE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const FEInstance = axios.create({
  baseURL: FE_BASE_URL,
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
    const auths = await FEInstance.get<
      Record<keyof typeof COOKIE_NAMES, string | null>
    >(`/api/auth`).then((res) => res.data);

    if (Object.values(auths).some((auth) => !auth)) {
      throw new AxiosError('저장된 유저 정보가 없습니다.', '401');
    }

    config.headers['Authorization'] = `Bearer ${auths.accessToken}`;
  } catch (error) {
    printError(error as AxiosError<{ message: string }>);
    await FEInstance.delete('/api/auth');
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    printError(error);

    if (error.response.status === 401)
      if (error.response?.data.message === 'Access token has expired') {
        try {
          const auths = await FEInstance.get<
            Record<keyof typeof COOKIE_NAMES, string>
          >(`/api/auth`).then((res) => res.data);

          const { accessToken } = await postRefresh({
            refreshToken: auths.refreshToken,
          });

          await FEInstance.patch('/api/auth', { accessToken });
          return await instance(error.config);
        } catch (refreshError) {
          printError(refreshError as AxiosError<{ message: string }>);
          await FEInstance.delete('/api/auth');
        }
      }

    return Promise.reject(error);
  },
);
