import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyComments } from '@/services/mypage';

interface UseGetCommentsParams {
  page: number;
  pageSize: number;
}

const useGetMyComments = ({ page, pageSize }: UseGetCommentsParams) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['myComments', page, pageSize],
    queryFn: ({ pageParam = page }) =>
      getMyComments({
        page: pageParam,
        pageSize: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : null;
    },
    initialPageParam: 1,
  });
  const totalItemCount = queryResult.data?.pages[0]?.totalItemCount || 0;

  return { ...queryResult, totalItemCount };
};

export default useGetMyComments;
