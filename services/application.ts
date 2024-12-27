import { instance } from '@/services/axiosInstance';
import {
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
