import { instance } from './axiosInstance';
import { Alba } from '@/types/alba';

export const getAlbaDetail = async (formId: number) => {
  const response = await instance.get<Alba>(`forms/${formId}`);

  return response.data;
};

export const postAlbaScrap = async (formId: number) => {
  const response = await instance.post<Alba>(`forms/${formId}/scrap`);

  return response.data.isScrapped;
};
