import { instance } from './axiosInstance';
import {
  GetPostsResponse,
  GetPostsParameters,
  GetPostDetailResponse,
  GetCommentsParameters,
  GetCommentsResponse,
  PostCommentBody,
  PostCommentResponse,
  PostTalkBody,
} from '@/types/albatalk';

export const getPosts = async (
  params: GetPostsParameters,
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
  id: number,
): Promise<GetPostDetailResponse> => {
  try {
    const response = await instance.get<GetPostDetailResponse>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};

export const getComments = async (
  params: GetCommentsParameters,
): Promise<GetCommentsResponse> => {
  try {
    const response = await instance.get<GetCommentsResponse>(
      `/posts/${params.id}/comments`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
export const postComment = async (id: number, body: PostCommentBody) => {
  const response = await instance.post<PostCommentResponse>(
    `/posts/${id}/comments`,
    body,
  );
  return response.data;
};
export const postTalk = async (body: PostTalkBody) => {
  const response = await instance.post<PostCommentResponse>(`/posts`, body);
  return response.data;
};
