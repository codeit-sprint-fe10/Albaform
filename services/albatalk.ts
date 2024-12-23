import { instance } from './axiosInstance';
import { GetPostsResponse } from '@/types/albatalk';

interface GetPostsParams {
  cursor: number;
  limit: number;
  orderBy?: 'mostRecent' | 'mostCommented' | 'mostLiked';
  keyword?: string;
}

export const getPosts = async (
  params?: GetPostsParams,
): Promise<GetPostsResponse> => {
  try {
    const response = await instance.get<GetPostsResponse>('/posts', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
