import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchAlba, postAlba } from '@/services/alba';
import { PostAlbaBody } from '@/types/alba';

const keysToInvalidate = ['myAlbas', 'forms'];

const usePostAlba = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      formId,
      data,
    }: {
      formId?: number;
      data: PostAlbaBody;
    }) => {
      if (formId) {
        return await patchAlba(formId, data);
      }
      return await postAlba(data);
    },
    onSuccess: (data) => {
      router.replace(`/alba/${data.id}`);

      queryClient.invalidateQueries({
        predicate: (query) => {
          if (
            Array.isArray(query.queryKey) &&
            typeof query.queryKey[0] === 'string'
          ) {
            return keysToInvalidate.includes(query.queryKey[0]);
          }
          return false;
        },
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export default usePostAlba;
