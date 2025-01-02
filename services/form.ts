import { instance } from './axiosInstance';
import {
  GetFormsParameters,
  GetFormsResponse,
  PostFormBody,
  PostFormResponse,
} from '@/types/form';

export const getForms = async (params: GetFormsParameters) => {
  const response = await instance.get<GetFormsResponse>('/forms', {
    params,
  });
  return response.data;
};

export const postForm = async (body: PostFormBody) => {
  const response = await instance.post<PostFormResponse>('/forms', body);
  return response.data;
};
