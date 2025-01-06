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
  PostTalkResponse,
} from '@/types/albatalk';

export const getPosts = async (params: GetPostsParameters) => {
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

export const getPostDetail = async (id: number) => {
  try {
    const response = await instance.get<GetPostDetailResponse>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};

export const getComments = async ({
  talkId,
  params,
}: GetCommentsParameters) => {
  try {
    const { page, pageSize } = params;
    const response = await instance.get<GetCommentsResponse>(
      `/posts/${talkId}/comments`,
      {
        params: {
          page,
          pageSize,
        },
      },
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
  const response = await instance.post<PostTalkResponse>(`/posts`, body);
  return response.data;
};

export const postLike = async (id: number) => {
  const response = await instance.post<PostTalkResponse>(`/posts/${id}/like`);
  return response.data;
};

export const deleteLike = async (id: number) => {
  const response = await instance.delete<PostTalkResponse>(`/posts/${id}/like`);
  return response.data;
};

export const deleteTalk = async (id: number) => {
  const response = await instance.delete(`/posts/${id}`);
  console.log(response);
  return response.data;
};
export const patchTalk = async (id: number, body: PostTalkBody) => {
  const response = await instance.patch<PostTalkResponse>(`/posts/${id}`, body);
  return response.data;
};
export const deleteComment = async (id: number) => {
  const response = await instance.delete(`/comments/${id}`);
  return response.data;
};
export const patchComment = async (id: number, body: PostCommentBody) => {
  const response = await instance.patch<PostCommentResponse>(
    `/comments/${id}`,
    body,
  );
  return response.data;
};
