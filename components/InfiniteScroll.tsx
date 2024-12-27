'use client';

import React, { ReactNode, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

type InfiniteScrollProps = {
  children: ReactNode;
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  loader?: ReactNode;
};

const InfiniteScroll = ({
  children,
  hasNextPage,
  isLoading,
  onLoadMore,
  loader,
}: InfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isLoading) {
        onLoadMore();
      }
    },
    enabled: hasNextPage,
  })(loadMoreRef.current);

  return (
    <>
      {children}
      {isLoading && loader}
      <div ref={loadMoreRef} />
    </>
  );
};

export default InfiniteScroll;
