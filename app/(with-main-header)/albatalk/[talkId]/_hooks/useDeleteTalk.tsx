import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTalk } from '@/services/albatalk';
import { useRouter } from 'next/navigation';

const useDeleteTalk = (talkId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteTalk(talkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.replace('/albatalk');
    },
    onError: (error) => {
      console.error('Error deleting talk:', error);
    },
  });
};

export default useDeleteTalk;
