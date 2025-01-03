export type AlbasOrderBy =
  | 'mostRecent'
  | 'highestWage'
  | 'mostApplied'
  | 'mostScrapped';

export interface GetAlbasParameters {
  orderBy: AlbasOrderBy;
  limit: number;
  cursor: number;
  keyword?: string;
  isRecruiting?: boolean;
}

export interface AlbaDataProps {
  id: number;
  title: string;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  imageUrls: string[] | null;
  applyCount: number;
  scrapCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAlbasResponse {
  nextCursor: number | null;
  data: AlbaDataProps[];
}

export interface PostAlbaBody {
  title: string;
  description: string;
  recruitmentEndDate: string;
  recruitmentStartDate: string;
  imageUrls: string[];
  numberOfPositions: number;
  gender: string;
  education: string;
  age: string;
  preferred: string;
  location: string;
  workStartTime: string;
  workEndTime: string;
  hourlyWage: number;
  isNegotiableWorkDays: boolean;
  isPublic: boolean;
  workDays: string[];
  workEndDate: string;
  workStartDate: string;
}

export interface PostAlbaResponse extends PostAlbaBody {
  ownerId: number;
  id: number;
  applyCount: number;
  scrapCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Alba extends PostAlbaBody {
  updatedAt: string;
  createdAt: string;
  ownerId: number;
  id: number;
  scrapCount: number;
  applyCount: number;
  isScrapped: boolean;
  phoneNumber: string;
  storePhoneNumber: string;
  storeName: string;
}

export type DateFieldName =
  | 'workEndDate'
  | 'workStartDate'
  | 'recruitmentEndDate'
  | 'recruitmentStartDate';

export type DropdownFieldName =
  | 'numberOfPositions'
  | 'gender'
  | 'education'
  | 'age'
  | 'preferred'
  | 'workStartTime'
  | 'workEndTime';
