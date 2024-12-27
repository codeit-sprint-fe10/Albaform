export interface Writer {
  imageUrl: string;
  nickname: string;
  id: number;
}

export interface Post {
  writer: Writer;
  updatedAt: Date;
  createdAt: Date;
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
  updatedAt: Date;
  createdAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
  writer: Writer;
}
