import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTalk } from '@/services/albatalk';
import { PostTalkBody } from '@/types/albatalk';

const usePostTalk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostTalkBody) => {
      return postTalk(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      return data;
    },
    onError: (error) => {
      console.error('Error posting talk:', error);
    },
  });
};

export default usePostTalk;
