import { useQuery } from '@tanstack/react-query';
import { getGuestApplication, getMyApplication } from '@/services/application';
import { Application } from '@/types/application';
import { useUserStore } from '@/store/user';
import useGuestStore from '@/store/guest';

const useGetMyApplication = (formId: number) => {
  const user = useUserStore((state) => state.user);
  const guest = useGuestStore((state) => state.guest);

  const queryFn = user
    ? () =>
        getMyApplication({
          formId,
        })
    : () => getGuestApplication({ formId, body: guest });

  return useQuery<Application>({
    queryKey: ['myApplication', formId],
    queryFn,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useGetMyApplication;
