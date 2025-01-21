'use client';

import { useState } from 'react';
import AlbatalkCard from './_components/AlbatalkCard';
import SearchBar from './_components/SearchBar';
import WriteButton from './_components/WriteButton';
import useGetPosts from './_hooks/useGetPosts';
import { SortOrder } from '@/types/albatalk';
import AlbatalkCardSkeleton from './_components/AlbatalkCardSkeleton';
import InfiniteScroll from '@/components/InfiniteScroll';
import Loader from '@/components/Loader';

const PAGE_LIMIT = 6;

const AlbatalkCardSkeletons = () =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="w-full">
        <AlbatalkCardSkeleton />
      </div>
    ));

const Albatalk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('mostRecent');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPosts({
      pageLimit: PAGE_LIMIT,
      searchTerm,
      sortOrder,
    });

  return (
    <div className="w-full flex justify-center lg:max-w-container lg:px-[72px]">
      <div className="w-full flex flex-col items-center justify-between mt-4 relative">
        <div className="w-full flex flex-col gap-10 mb-16">
          <SearchBar
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            setSearchTerm={setSearchTerm}
            setSortOrder={setSortOrder}
          />

          {isLoading ? (
            <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
              <AlbatalkCardSkeletons />
            </div>
          ) : data?.pages[0]?.data.length ? (
            <InfiniteScroll
              hasNextPage={hasNextPage}
              isLoading={isFetchingNextPage}
              loadNextPage={fetchNextPage}
              loader={
                <div className="w-full mt-3">
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
            <div className="w-full flex flex-col items-center justify-center text-gray-500 gap-4">
              <p className="text-lg lg:text-xl font-medium">
                검색 결과가 없습니다.
              </p>
              <p className="text-sm lg:text-md">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </div>
      </div>
      <WriteButton />
    </div>
  );
};

export default Albatalk;
