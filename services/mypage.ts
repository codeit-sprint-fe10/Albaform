import { instance } from './axiosInstance';
import { GetMyPostsResponse, GetMyPostsParameters } from '@/types/mypage';

export const getMyPosts = async (params: GetMyPostsParameters) => {
  try {
    const response = await instance.get<GetMyPostsResponse>('/posts', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
