import { GetApplicationsParameters } from '@/types/application';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/application';

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
    retry: false, // TODO 에러 처리 후 제거
  });
};

export default useGetApplications;
