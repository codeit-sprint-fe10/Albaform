export interface Writer {
  imageUrl: string;
  nickname: string;
  id: number;
}

export interface Post {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
  content: string;
  title: string;
  id: number;
}

export interface GetPostsResponse {
  nextCursor: number;
  data: Post[];
}

export interface GetPostsParameters {
  cursor: number;
  limit: number;
  orderBy?: 'mostRecent' | 'mostCommented' | 'mostLiked';
  keyword?: string;
}

export interface GetPostDetailResponse {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
  content: string;
  title: string;
  id: number;
  isLiked: boolean;
}
export interface GetCommentsParameters {
  id: number;
  page: number;
  pageSize: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}
export interface GetCommentsResponse {
  data: Comment[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface PostCommentBody {
  content: string;
}
export interface PostCommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface PostTalkBody {
  imageUrl: string | null;
  content: string;
  title: string;
}
export interface PostTalkResponse {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  isLiked: boolean;
}

export type EditDropdownAction = 'edit' | 'delete';
