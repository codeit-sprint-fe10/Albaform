'use client';

import { useState } from 'react';
import InfiniteScroll from '@/components/InfiniteScroll';
import Card from './Card';
import AlbaCardSkeleton from '../../albalist/_components/list/AlbaCardSkeleton';
import useGetMyCreatedAlbas from '../_hooks/useGetMyCreatedAlbas';
import { GetMyCreatedAlbasParameters } from '@/types/alba';
import EmptyAlba from './EmptyAlba';

const PAGE_LIMIT = 6;

const AlbaCardSkeletons = () =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <li key={idx} className="w-[min(100%,360px)] lg:w-[469px]">
        <AlbaCardSkeleton />
      </li>
    ));

const MyAlbas = () => {
  const [searchParams, setSearchParams] = useState<GetMyCreatedAlbasParameters>(
    { limit: PAGE_LIMIT, orderBy: 'mostRecent' },
  );

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useGetMyCreatedAlbas(searchParams);

  return (
    <ul className="grid gap-8 md:gap-y-12 md:gap-x-6 lg:gap-y-16 md:grid-cols-[repeat(auto-fit,_327px)] lg:grid-cols-[repeat(auto-fit,_469px)] justify-center place-items-center pb-10">
      {isLoading ? (
        <AlbaCardSkeletons />
      ) : data?.pages.length ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={<AlbaCardSkeletons />}
        >
          {data.pages.map((page) =>
            page.data.map((myAlba) => (
              <li key={myAlba.id}>
                <Card {...myAlba} />
              </li>
            )),
          )}
        </InfiniteScroll>
      ) : (
        <EmptyAlba />
      )}
    </ul>
  );
};

export default MyAlbas;
