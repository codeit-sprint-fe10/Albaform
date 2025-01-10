import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyScraps } from '@/services/mypage';
import { AlbasOrderBy } from '@/types/alba';

interface UseGetScrapsParams {
  pageLimit: number;
  orderBy: AlbasOrderBy;
  isRecruiting?: boolean;
  isPublic?: boolean;
}

const useGetMyScraps = ({ pageLimit, ...scrapParams }: UseGetScrapsParams) => {
  const queryFn = ({ pageParam }: { pageParam: number }) => {
    return getMyScraps({
      cursor: pageParam,
      limit: pageLimit,
      ...scrapParams,
    });
  };

  return useInfiniteQuery({
    queryKey: ['scraps', pageLimit, ...Object.values(scrapParams)],
    queryFn,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: 0,
  });
};

export default useGetMyScraps;
