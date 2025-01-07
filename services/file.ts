import { PostResumeBody, PostResumeResponse } from '@/types/file';
import { instance } from './axiosInstance';

export const postResume = async ({ file }: PostResumeBody) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const response = await instance.post<PostResumeResponse>(
    'resume/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
