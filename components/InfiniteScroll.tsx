'use client';

import React, { ReactNode, useCallback, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type InfiniteScrollProps = {
  children: ReactNode;
  hasNextPage: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  loader?: ReactNode;
};

const InfiniteScroll = ({
  children,
  hasNextPage,
  isLoading,
  loadNextPage,
  loader,
}: InfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isLoading) {
      loadNextPage();
    }
  }, [hasNextPage, isLoading, loadNextPage]);

  useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: hasNextPage,
  })(loadMoreRef.current);

  return (
    <>
      {children}
      <div ref={loadMoreRef} />
      {isLoading && loader}
    </>
  );
};

export default InfiniteScroll;
