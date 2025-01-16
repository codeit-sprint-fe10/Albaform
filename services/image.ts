import { instance } from './axiosInstance';
import { renameImageFile } from '@/utils/image';

interface PostImageResponse {
  url: string;
}

export const postImage = async (image: File) => {
  const renamedFile = renameImageFile(image);
  const formData = new FormData();
  formData.append('image', renamedFile);
  const response = await instance.post<PostImageResponse>(
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
