import axios, { AxiosError } from 'axios';
import { postRefresh } from './auth';

const BASE_URL = 'https://fe-project-albaform.vercel.app/10-4/';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(async (config) => {
  if (config.url === 'auth/refresh') return config;

  const response =
    await axios.get<Record<string, string | null>>('/api/cookies');
  const cookies = response.data;

  try {
    if (Object.values(cookies).some((cookie) => cookie === null))
      throw new AxiosError('저장된 유저 정보가 없습니다.', '401');

    const { accessToken } = await postRefresh({
      refreshToken: cookies.refreshToken!,
    });
    await axios.patch('/api/cookies', { accessToken });
    cookies.accessToken = accessToken;
  } catch {
    await axios.delete('/api/cookies');
    cookies.accessToken = null;
  }

  if (cookies.accessToken)
    config.headers['Authorization'] = `Bearer ${cookies.accessToken}`;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    const res = error.response;
    if (res)
      console.log(`[${error.status}:${res.config.url}] ${res.data.message}`);

    return Promise.reject(error);
  },
);
