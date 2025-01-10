import { GetAlbasResponse, GetMyCreatedAlbasParameters } from '@/types/alba';
import { instance } from './axiosInstance';
import { GetPostsResponse, GetPostsParameters } from '@/types/albatalk';
import {
  GetCommentsParameters,
  GetCommentsResponse,
  GetMyScrapsParameters,
} from '@/types/mypage';

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
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getMyScraps = async (params: GetMyScrapsParameters) => {
  try {
    const response = await instance.get<GetAlbasResponse>('users/me/scrap', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching scraps:', error);
  }
};

export const deleteScrap = async (id: number) => {
  const response = await instance.delete(`/forms/${id}/scrap`);
  return response.data;
};
