import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTalk } from '@/services/albatalk';

const useDeleteTalk = (talkId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTalk(talkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myposts'] });
    },
    onError: (error) => {
      console.error('Error deleting talk:', error);
    },
  });
};

export default useDeleteTalk;
