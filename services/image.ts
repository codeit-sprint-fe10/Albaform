import { instance } from './axiosInstance';

interface UploadImageResponse {
  url: string;
}

export const uploadImage = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);
  const response = await instance.post<UploadImageResponse>(
    'images/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.url;
};
