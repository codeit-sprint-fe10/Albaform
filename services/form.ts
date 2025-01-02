import { instance } from './axiosInstance';
import { GetFormsParameters, GetFormsResponse } from '@/types/form';

export const getForms = async (params: GetFormsParameters) => {
  const response = await instance.get<GetFormsResponse>('/forms', {
    params,
  });
  return response.data;
};
