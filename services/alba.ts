import { instance } from './axiosInstance';
import {
  GetAlbasParameters,
  GetAlbasResponse,
  Alba,
  PostAlbaBody,
  PostAlbaResponse,
} from '@/types/alba';

export const getAlbas = async (params: GetAlbasParameters) => {
  const response = await instance.get<GetAlbasResponse>('/forms', {
    params,
  });
  return response.data;
};

export const postAlba = async (body: PostAlbaBody) => {
  const response = await instance.post<PostAlbaResponse>('/forms', body);
  return response.data;
};

export const getAlbaDetail = async (formId: number) => {
  const response = await instance.get<Alba>(`/forms/${formId}`);

  return response.data;
};

export const postAlbaScrap = async (formId: number) => {
  const response = await instance.post<Alba>(`/forms/${formId}/scrap`);

  return response.data.isScrapped;
};
