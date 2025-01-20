import { GetApplicationsParameters } from '@/types/application';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/application';
import { AxiosError } from 'axios';

type useGetApplicationsProps = {
  formId: number;
  searchParams: GetApplicationsParameters;
};

const useGetApplications = ({
  formId,
  searchParams,
}: useGetApplicationsProps) => {
  const queryFn = ({ pageParam = searchParams.cursor }) =>
    getApplications({
      formId,
      params: { ...searchParams, cursor: pageParam },
    });

  return useInfiniteQuery({
    queryKey: ['applications', searchParams],
    queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    retry: (failureCount, error: AxiosError) => {
      if (error.response?.status === 403) {
        return false;
      }

      return failureCount < 3;
    },
  });
};

export default useGetApplications;
