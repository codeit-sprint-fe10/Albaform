import { useQuery } from '@tanstack/react-query';
import { getApplication } from '@/services/application';
import { Application } from '@/types/application';

const useGetApplication = (applicationId: number) => {
  return useQuery<Application>({
    queryKey: ['application', applicationId],
    queryFn: () => getApplication(applicationId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export default useGetApplication;
