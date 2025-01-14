import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAlba } from '@/services/alba';

type InfiniteQueryParams<T> = T & { cursor?: number };

const useDeleteAlba = <T extends object>(
  searchParams: InfiniteQueryParams<T>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAlba,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAlbas', searchParams] }); // 캐시 무효화
    },
    onError: () => {
      alert('삭제 실패');
    },
  });
};

export default useDeleteAlba;
