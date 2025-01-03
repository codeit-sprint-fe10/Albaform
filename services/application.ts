import { instance } from '@/services/axiosInstance';
import {
  Application,
  GetApplicationsParameters,
  GetApplicationsResponse,
} from '@/types/application';

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
