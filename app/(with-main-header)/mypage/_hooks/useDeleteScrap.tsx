import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteScrap } from '@/services/mypage';

const useDeleteScrap = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteScrap(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scraps'] });
    },
    onError: (error) => {
      console.error('Error deleting scrap:', error);
    },
  });
};

export default useDeleteScrap;
