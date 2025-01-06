import { useState } from 'react';
import InfiniteScroll from '@/components/InfiniteScroll';
import AlbatalkCard from './AlbatalkCard';
import useGetMyPosts from '../_hooks/useGetMyPosts';
import { SortOrder } from '@/types/albatalk';

const PAGE_LIMIT = 6;

const MyPostList = ({ sortOrder }: { sortOrder: SortOrder }) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyPosts({
    pageLimit: PAGE_LIMIT,
    sortOrder: sortOrder,
  });
  console.log(data);
  return (
    <div className="flex w-full max-w-container-md">
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={<p>Loading applications...</p>}
        >
          {data?.pages.map((page) =>
            page.data.map((post) => (
              <AlbatalkCard
                key={post.id}
                title={post.title}
                content={post.content}
                writer={post.writer}
                createdAt={post.createdAt}
                commentCount={post.commentCount}
                likeCount={post.likeCount}
                talkId={post.id}
              />
            )),
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MyPostList;
