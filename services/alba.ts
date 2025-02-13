import { instance } from './axiosInstance';
import {
  GetAlbasParameters,
  GetAlbasResponse,
  Alba,
  PostAlbaBody,
  PostAlbaResponse,
  GetMyCreatedAlbasParameters,
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

export const patchAlba = async (formId: number, body: PostAlbaBody) => {
  const response = await instance.patch<PostAlbaResponse>(
    `/forms/${formId}`,
    body,
  );
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

export const deleteAlbaScrap = async (formId: number) => {
  const response = await instance.delete<Alba>(`/forms/${formId}/scrap`);

  return response.data.isScrapped;
};

export const getMyCreatedAlbas = async (
  params: GetMyCreatedAlbasParameters,
) => {
  const response = await instance.get<GetAlbasResponse>('/users/me/forms', {
    params,
  });

  return response.data;
};

export const deleteAlba = async (formId: number) => {
  await instance.delete(`/forms/${formId}`);
};
