import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAlba } from '@/services/alba';
import { GetMyCreatedAlbasParameters } from '@/types/alba';

const useDeleteAlba = (searchParams: GetMyCreatedAlbasParameters) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAlba,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAlbas', searchParams] });
    },
    onError: () => {
      alert('삭제 실패');
    },
  });
};

export default useDeleteAlba;
