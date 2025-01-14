export const orderByTypes = ['asc', 'desc'];

export const applicationStatus = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접대기',
  INTERVIEW_COMPLETED: '면접완료',
  HIRED: '채용완료',
} as const;

export type ApplicationStatusType = keyof typeof applicationStatus;

export const DEFAULT_APPLICATION_STATUS = Object.keys(
  applicationStatus,
)[1] as ApplicationStatusType;

export type orderByType = (typeof orderByTypes)[number];

export interface Application {
  applicantId: number;
  updatedAt: string;
  createdAt: string;
  status: ApplicationStatusType;
  introduction: string;
  resumeName: string;
  resumeId: number;
  experienceMonths: number;
  phoneNumber: string;
  name: string;
  id: number;
}

export type PostApplicationBody = Pick<
  Application,
  | 'name'
  | 'phoneNumber'
  | 'experienceMonths'
  | 'resumeId'
  | 'resumeName'
  | 'introduction'
> & { password: string };

export type PostApplicationResponse = Application;

export interface GetApplicationsResponse {
  nextCursor: number;
  data: Application[];
}

export interface GetApplicationsParameters {
  cursor?: number;
  limit: number;
  orderByExperience?: orderByType;
  orderByStatus?: orderByType;
}

export interface GetGuestApplicationsBody {
  name: string;
  phoneNumber: string;
  password: string;
}

export interface GetMyAppliedAlbasParameters {
  cursor?: number;
  limit: number;
  status?: ApplicationStatusType;
  keyword?: string;
}

interface AppliedApplication {
  id: number;
  resumeId: number;
  resumeName: string;
  status: ApplicationStatusType;
  createdAt: string;
  updatedAt: string;
  form: {
    id: number;
    title: string;
    description: string;
    recruitmentStartDate: string;
    recruitmentEndDate: string;
    owner: {
      id: number;
      storeName: string;
      imageUrl: string | null;
    };
  };
}

export type ApplicationCardType = Pick<
  AppliedApplication,
  'id' | 'resumeId' | 'resumeName' | 'status' | 'createdAt' | 'form'
>;

export interface GetMyAppliedAlbasResponse {
  data: ApplicationCardType[];
  nextCursor: number | null;
}

export type MyAppliedAlbasFilterType = Pick<
  GetMyAppliedAlbasParameters,
  'keyword' | 'status'
>;
