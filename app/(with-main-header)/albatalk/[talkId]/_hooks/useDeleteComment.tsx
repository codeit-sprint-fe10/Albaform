import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/services/albatalk';

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
    },
  });
};

export default useDeleteComment;
