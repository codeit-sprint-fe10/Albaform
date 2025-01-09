import { instance } from './axiosInstance';
import { GetPostsResponse, GetPostsParameters } from '@/types/albatalk';
import { GetCommentsParameters, GetCommentsResponse } from '@/types/mypage';

export const getMyPosts = async (params: GetPostsParameters) => {
  try {
    const response = await instance.get<GetPostsResponse>('users/me/posts', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getMyComments = async (params: GetCommentsParameters) => {
  try {
    const response = await instance.get<GetCommentsResponse>(
      'users/me/comments',
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
