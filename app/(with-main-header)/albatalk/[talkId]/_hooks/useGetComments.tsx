import { useInfiniteQuery } from '@tanstack/react-query';
import { getComments } from '@/services/albatalk';

type UseGetCommentsProps = {
  talkId: number;
  params: {
    page: number;
    pageSize: number;
  };
};

const useGetComments = ({ talkId, params }: UseGetCommentsProps) => {
  const queryResult = useInfiniteQuery({
    queryKey: ['comments', talkId, params.page, params.pageSize],
    queryFn: ({ pageParam = params.page }) =>
      getComments({
        talkId,
        params: {
          page: pageParam,
          pageSize: params.pageSize,
        },
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

export default useGetComments;
