import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyCreatedAlbas } from '@/services/alba';
import { GetMyCreatedAlbasParameters } from '@/types/alba';

const useGetMyCreatedAlbas = (searchParams: GetMyCreatedAlbasParameters) => {
  const queryFn = ({ pageParam = searchParams.cursor }) =>
    getMyCreatedAlbas({ ...searchParams, cursor: pageParam });

  return useInfiniteQuery({
    queryKey: ['myAlbas', searchParams],
    queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export default useGetMyCreatedAlbas;
