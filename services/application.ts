import { instance } from '@/services/axiosInstance';
import {
  Application,
  ApplicationStatusType,
  GetApplicationsParameters,
  GetApplicationsResponse,
  PostApplicationBody,
  PostApplicationResponse,
  GetGuestApplicationsBody,
} from '@/types/application';

export const postApplication = async ({
  formId,
  body,
}: {
  formId: number;
  body: PostApplicationBody;
}) => {
  const response = await instance.post<PostApplicationResponse>(
    `/forms/${formId}/applications`,
    body,
  );

  return response.data;
};

export const getApplications = async ({
  formId,
  params,
}: {
  formId: number;
  params: GetApplicationsParameters;
}) => {
  const response = await instance.get<GetApplicationsResponse>(
    `/forms/${formId}/applications`,
    {
      params,
    },
  );

  return response.data;
};

export const getApplication = async (applicationId: number) => {
  const response = await instance.get<Application>(
    `/applications/${applicationId}`,
  );

  return response.data;
};

export const getMyApplication = async ({ formId }: { formId: number }) => {
  const response = await instance.get<Application>(
    `/forms/${formId}/my-application`,
  );

  return response.data;
};

export const getGuestApplication = async ({
  formId,
  body,
}: {
  formId: number;
  body: GetGuestApplicationsBody;
}) => {
  const response = await instance.post<Application>(
    `/forms/${formId}/my-application/verify`,
    body,
  );

  return response.data;
};

export const patchApplicationStatus = async ({
  applicationId,
  status,
}: {
  applicationId: number;
  status: ApplicationStatusType;
}) => {
  const response = await instance.patch<Application>(
    `/applications/${applicationId}`,
    { status },
  );

  return response.data;
};
