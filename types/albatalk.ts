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
