export interface PostFormBody {
  title: string;
  description: string;
  imageUrls: string[] | null;
  workDays: string[];
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
}

type FormOrderBy = {
  mostRecent: '최신순';
  highestWage: '시급 높은순';
  mostApplied: '지원자 많은순';
  mostScrapped: '스크랩 많은순';
};

export type FormOrderByEnglish = keyof FormOrderBy;

export type FormOrderByKorean = FormOrderBy[keyof FormOrderBy];

export interface GetFormsParameters {
  orderBy: FormOrderByEnglish;
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
