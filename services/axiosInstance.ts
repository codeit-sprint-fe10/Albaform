import axios, { AxiosError } from 'axios';
import { postRefresh } from './auth';

const BE_BASE_URL = 'https://fe-project-albaform.vercel.app/10-4';
const FE_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.albaform.store'
    : 'http://localhost:3000';

export const instance = axios.create({
  baseURL: BE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const FEInstance = axios.create({
  baseURL: FE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async (config) => {
  if (config.url === '/auth/refresh') return config;

  try {
    const auths = await FEInstance.get<Record<string, string | null>>(
      `/api/auth`,
    ).then((res) => res.data);

    if (Object.values(auths).some((auth) => !auth))
      throw new AxiosError('저장된 유저 정보가 없습니다.', '401');

    const { accessToken } = await postRefresh({
      refreshToken: auths.refreshToken!,
    });

    await FEInstance.patch('/api/auth', { accessToken });
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    const res = e.response;

    if (res) console.log(`[${e.status}:${res.config.url}] ${res.data.message}`);
    else console.log(`[${e.code}] ${e.message}`);

    await FEInstance.delete('/api/auth');
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (e: AxiosError<{ message: string }>) => {
    const res = e.response;
    if (res) console.log(`[${e.status}:${res.config.url}] ${res.data.message}`);
    else console.log(`[${e.code}] ${e.message}`);

    return Promise.reject(e);
  },
);
