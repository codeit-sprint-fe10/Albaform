import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostTalkBody } from '@/types/albatalk';
import { patchTalk } from '@/services/albatalk';

const usePatchTalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ talkId, data }: { talkId: number; data: PostTalkBody }) => {
      return patchTalk(talkId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['talk'] });
    },
    onError: (error) => {
      console.error('Error editing talk:', error);
    },
  });
};

export default usePatchTalk;
