import { useInfiniteQuery } from '@tanstack/react-query';

type InfiniteQueryParams<T> = T & { cursor?: number };
type InfiniteQueryResponse<R> = R & { nextCursor: number | null };

const useGetMyAlbas = <T extends object, R>(
  searchParams: InfiniteQueryParams<T>,
  queryFn: (
    params: InfiniteQueryParams<T>,
  ) => Promise<InfiniteQueryResponse<R>>,
) => {
  const infiniteQueryFn = ({ pageParam = searchParams.cursor }) =>
    queryFn({ ...searchParams, cursor: pageParam });

  return useInfiniteQuery({
    queryKey: ['myAlbas', searchParams],
    queryFn: infiniteQueryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export default useGetMyAlbas;
