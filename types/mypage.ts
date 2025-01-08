import { SORT_OPTIONS, TAB_OPTIONS } from '@/constants/dropdown';

export type TabKey = (typeof TAB_OPTIONS)[number]['key'];

export type SortOrder = (typeof SORT_OPTIONS)[number]['key'];

export interface TabOption {
  key: TabKey;
  label: string;
}

export interface GetCommentsParameters {
  page: number;
  pageSize: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  post: Post;
}

export interface GetCommentsResponse {
  data: Comment[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
