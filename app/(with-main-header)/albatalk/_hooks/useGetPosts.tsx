import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '@/services/albatalk';
import { SortOrder } from '@/types/albatalk';
import useDebounce from '@/hooks/useDebounce';

interface UseGetPostsParams {
  pageLimit: number;
  searchTerm: string;
  sortOrder: SortOrder;
}

const useGetPosts = ({
  pageLimit,
  searchTerm,
  sortOrder,
}: UseGetPostsParams) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryFn = ({ pageParam }: { pageParam: number }) => {
    return getPosts({
      cursor: pageParam || 0,
      limit: pageLimit,
      orderBy: sortOrder,
      keyword: debouncedSearchTerm,
    });
  };

  return useInfiniteQuery({
    queryKey: ['posts', sortOrder, pageLimit, debouncedSearchTerm],
    queryFn,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
};

export default useGetPosts;
