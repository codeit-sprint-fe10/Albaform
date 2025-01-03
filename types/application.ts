export const orderByTypes = ['asc', 'desc'];

export const applicationStatus = {
  REJECTED: '거절',
  INTERVIEW_PENDING: '면접대기',
  INTERVIEW_COMPLETED: '면접완료',
  HIRED: '채용완료',
} as const;

export type ApplicationStatusType = keyof typeof applicationStatus;

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
