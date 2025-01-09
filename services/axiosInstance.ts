import axios, { AxiosError } from 'axios';
import { postRefresh } from './auth';

const BASE_URL = 'https://fe-project-albaform.vercel.app/10-4';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async (config) => {
  if (config.url === '/auth/refresh') return config;

  try {
    const auths = await axios
      .get<Record<string, string | null>>('/api/auth')
      .then((res) => res.data);

    if (Object.values(auths).some((auth) => !auth))
      throw new AxiosError('저장된 유저 정보가 없습니다.', '401');

    const { accessToken } = await postRefresh({
      refreshToken: auths.refreshToken!,
    });

    await axios.patch('/api/auth', { accessToken });
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    const res = e.response;

    if (res) console.log(`[${e.status}:${res.config.url}] ${res.data.message}`);
    else console.log(`[${e.code}] ${e.message}`);

    await axios.delete('/api/auth');
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
