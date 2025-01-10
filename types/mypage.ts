import {
  MYPAGE_OPTIONS,
  SORT_OPTIONS,
  TAB_OPTIONS_APPLICANT,
} from '@/constants/dropdown';
import { AlbasOrderBy } from './alba';

export type TabKey = (typeof TAB_OPTIONS_APPLICANT)[number]['key'];

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

export interface GetMyScrapsParameters {
  orderBy: AlbasOrderBy;
  limit: number;
  cursor?: number;
  isRecruiting?: boolean;
  isPublic?: boolean;
}

export type MyScrapsFilterType = Pick<
  GetMyScrapsParameters,
  'orderBy' | 'isRecruiting' | 'isPublic'
>;

export type MypageOption = (typeof MYPAGE_OPTIONS)[number]['key'];
