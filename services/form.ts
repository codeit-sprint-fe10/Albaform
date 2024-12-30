import { PostFormBody, PostFormResponse } from '@/types/form';
import { instance } from './axiosInstance';

export const postForm = async (body: PostFormBody) => {
  const response = await instance.post<PostFormResponse>('/forms', body);
  return response.data;
};
