import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPosts } from '@/services/albatalk';
import { GetPostsResponse } from '@/types/albatalk';
import { SortOrder } from '@/types/albatalk';

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
  const [cursorHistory, setCursorHistory] = useState([0]);

  const currentCursor = cursorHistory.at(-1) ?? 0;

  const { data, isLoading, error } = useQuery<GetPostsResponse>({
    queryKey: ['posts', { pageLimit, searchTerm, sortOrder, currentCursor }],
    queryFn: () =>
      getPosts({
        cursor: currentCursor,
        limit: pageLimit,
        keyword: searchTerm,
        orderBy: sortOrder,
      }),
    placeholderData: keepPreviousData,
    enabled: !!cursorHistory.length,
    staleTime: 20 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  const isFirstPage = cursorHistory.length === 1;
  const hasNextPage = data?.nextCursor !== null;

  const handleLoadMore = () => {
    if (data?.nextCursor) {
      setCursorHistory((prev) => [...prev, data.nextCursor]);
    }
  };

  const handleLoadPrev = () => {
    if (cursorHistory.length > 1) {
      setCursorHistory((prev) => prev.slice(0, -1));
    }
  };

  return {
    data,
    isLoading,
    error,
    isFirstPage,
    hasNextPage,
    handleLoadPrev,
    handleLoadMore,
  };
};

export default useGetPosts;
