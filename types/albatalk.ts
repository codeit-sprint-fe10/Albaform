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
