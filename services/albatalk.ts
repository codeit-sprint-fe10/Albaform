import { instance } from './axiosInstance';
import {
  GetPostsResponse,
  GetPostsParameters,
  GetPostDetailParameters,
  GetPostDetailResponse,
} from '@/types/albatalk';

export const getPosts = async (
  params?: GetPostsParameters,
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

export const getPostDetail = async (
  postId: string,
  params?: GetPostDetailParameters,
): Promise<GetPostDetailResponse> => {
  try {
    const response = await instance.get<GetPostDetailResponse>(
      `/posts/${postId}`,
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
