import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from '@/services/albatalk';

const usePatchComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => {
      return patchComment(id, { content });
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
