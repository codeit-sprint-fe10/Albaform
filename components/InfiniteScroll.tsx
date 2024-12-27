import React from 'react';

type InfiniteScrollProps = {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loader?: React.ReactNode;
  children: React.ReactNode;
};

const InfiniteScroll = ({
  loadMore,
  hasMore,
  loader,
  children,
}: InfiniteScrollProps) => {
  return <div></div>;
};

export default InfiniteScroll;
