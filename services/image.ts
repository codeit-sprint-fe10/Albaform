import { instance } from './axiosInstance';

interface PostImageResponse {
  url: string;
}

export const postImage = async (image: File) => {
  const formData = new FormData();
  const imageName = image.name.replaceAll(' ', '');
  formData.append('image', image, imageName);
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
