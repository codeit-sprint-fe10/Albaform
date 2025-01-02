export type FormsOrderBy =
  | 'mostRecent'
  | 'highestWage'
  | 'mostApplied'
  | 'mostScrapped';

export interface GetFormsParameters {
  orderBy: FormsOrderBy;
  limit: number;
  cursor: number;
  keyword?: string;
  isRecruiting?: boolean;
}

export interface FormDataProps {
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

export interface GetFormsResponse {
  nextCursor: number | null;
  data: FormDataProps[];
}

export interface PostFormBody {
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

export interface PostFormResponse extends PostFormBody {
  ownerId: number;
  id: number;
  applyCount: number;
  scrapCount: number;
  createdAt: string;
  updatedAt: string;
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
