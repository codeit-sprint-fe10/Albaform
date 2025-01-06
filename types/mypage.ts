export type TabKey = 'posts' | 'comments' | 'scraps';

export type SortOrder = 'mostRecent' | 'mostLiked' | 'mostCommented';

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

export interface GetMyPostsResponse {
  nextCursor: number;
  data: Post[];
}

export interface GetMyPostsParameters {
  cursor: number;
  limit: number;
  orderBy?: SortOrder;
}
