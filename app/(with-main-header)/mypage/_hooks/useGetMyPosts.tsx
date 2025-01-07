import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/services/mypage';
import { SortOrder } from '@/types/mypage';

interface UseGetPostsParams {
  pageLimit: number;
  sortOrder: SortOrder;
}

const useGetMyPosts = ({ pageLimit, sortOrder }: UseGetPostsParams) => {
  const queryFn = ({ pageParam }: { pageParam: number }) => {
    return getMyPosts({
      cursor: pageParam || 0,
      limit: pageLimit,
      orderBy: sortOrder,
    });
  };

  return useInfiniteQuery({
    queryKey: ['myposts', sortOrder, pageLimit],
    queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export default useGetMyPosts;
