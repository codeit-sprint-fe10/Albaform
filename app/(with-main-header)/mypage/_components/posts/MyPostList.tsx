import { useState } from 'react';
import InfiniteScroll from '@/components/InfiniteScroll';
import AlbatalkCard from './AlbatalkCard';
import useGetMyPosts from '../../_hooks/useGetMyPosts';
import { SortOrder } from '@/types/albatalk';
import Empty from '../Empty';
import Loader from '@/components/Loader';
import SortDropdown from './SortDropdown';
import AlbatalkCardSkeleton from './AlbatalkCardSkeleton';

const PAGE_LIMIT = 6;

const AlbaCardSkeletons = () =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="w-full lg:w-[384px]">
        <AlbatalkCardSkeleton />
      </div>
    ));

const MyPostList = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('mostRecent');
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

  return (
    <div className="flex w-full max-w-container-md justify-center">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-end">
          <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        {isLoading ? (
          <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
            <AlbaCardSkeletons />
          </div>
        ) : data?.pages[0]?.data?.length ? (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={
              <div className="mt-3">
                <Loader />
              </div>
            }
          >
            <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
              {data.pages.map((page) =>
                page.data.map((post) => (
                  <AlbatalkCard key={post.id} {...post} />
                )),
              )}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="flex justify-center">
            <Empty type="post" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostList;
