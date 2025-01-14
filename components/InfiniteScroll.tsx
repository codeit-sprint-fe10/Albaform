'use client';

import React, { ReactNode, useEffect } from 'react';
import { IntersectionOptions, useInView } from 'react-intersection-observer';

type InfiniteScrollProps<T> = {
  children: ReactNode;
  hasNextPage: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  loader?: ReactNode;
  inViewOptions?: T;
};

const InfiniteScroll = ({
  children,
  hasNextPage,
  isLoading,
  loadNextPage,
  loader,
  inViewOptions,
}: InfiniteScrollProps<IntersectionOptions>) => {
  const { inView, ref } = useInView(inViewOptions);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      loadNextPage();
    }
  }, [inView, hasNextPage, isLoading, loadNextPage]);

  return (
    <>
      {children}
      {isLoading ? loader : <div ref={ref} className="w-full" />}
    </>
  );
};

export default InfiniteScroll;
