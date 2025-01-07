export type AlbasOrderBy =
  | 'mostRecent'
  | 'highestWage'
  | 'mostApplied'
  | 'mostScrapped';

export interface GetAlbasParameters {
  orderBy: AlbasOrderBy;
  limit: number;
  cursor?: number;
  keyword?: string;
  isRecruiting?: boolean;
}

export type AlbasFilterType = Pick<
  GetAlbasParameters,
  'orderBy' | 'keyword' | 'isRecruiting'
>;

export type AlbaCardType = Pick<
  Alba,
  | 'id'
  | 'title'
  | 'recruitmentStartDate'
  | 'recruitmentEndDate'
  | 'imageUrls'
  | 'applyCount'
  | 'scrapCount'
  | 'isPublic'
  | 'createdAt'
  | 'updatedAt'
>;

export interface GetAlbasResponse {
  nextCursor: number | null;
  data: AlbaCardType[];
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

export interface GetMyCreatedAlbasParameters extends GetAlbasParameters {
  isPublic?: boolean;
}

export type MyAlbasFilterType = Pick<
  GetMyCreatedAlbasParameters,
  'orderBy' | 'keyword' | 'isRecruiting' | 'isPublic'
>;
