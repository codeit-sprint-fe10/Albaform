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
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export default usePostAlba;
