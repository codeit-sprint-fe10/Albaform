import { useQuery } from '@tanstack/react-query';
import { getMyApplication } from '@/services/application';
import { Application } from '@/types/application';

const useGetMyApplication = (formId: number) => {
  return useQuery<Application>({
    queryKey: ['myApplication', formId],
    queryFn: () =>
      getMyApplication({
        formId,
      }),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export default useGetMyApplication;
