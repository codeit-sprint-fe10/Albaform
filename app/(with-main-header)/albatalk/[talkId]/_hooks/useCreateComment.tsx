import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '@/services/albatalk';

type UseCreateCommentProps = {
  onSuccess: () => void;
};

const useCreateComment = ({ onSuccess }: UseCreateCommentProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      return postComment(id, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error) => {
      console.error('댓글 등록 실패:', error);
    },
  });
};

export default useCreateComment;
