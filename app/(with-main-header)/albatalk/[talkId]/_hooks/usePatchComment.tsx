import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from '@/services/albatalk';
import { PostCommentBody } from '@/types/albatalk';

const usePatchComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostCommentBody }) => {
      return patchComment(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error) => {
      console.error('Error editing comments:', error);
    },
  });
};

export default usePatchComment;
