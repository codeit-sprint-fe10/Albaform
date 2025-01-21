import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteScrap } from '@/services/mypage';

const keysToInvalidate = ['scraps', 'forms'];

const useDeleteScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteScrap(id),
    onSuccess: () => {
      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
    onError: (error) => {
      console.error('Error deleting scrap:', error);
    },
  });
};

export default useDeleteScrap;
