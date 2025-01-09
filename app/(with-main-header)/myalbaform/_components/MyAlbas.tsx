'use client';

import InfiniteScroll from '@/components/InfiniteScroll';
import Card from './Card';
import AlbaCardSkeleton from '../../albalist/_components/list/AlbaCardSkeleton';
import EmptyAlba from './EmptyAlba';
import useGetMyCreatedAlbas from '../_hooks/useGetMyCreatedAlbas';
import useMyalbaformStore from '@/store/myalbaform';

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
  const searchParams = useMyalbaformStore((state) => state.searchParams);

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useGetMyCreatedAlbas({ limit: PAGE_LIMIT, ...searchParams });

  return (
    <ul className="grid gap-8 md:gap-y-12 md:gap-x-6 lg:gap-y-16 md:grid-cols-[repeat(auto-fit,_327px)] lg:grid-cols-[repeat(auto-fit,_469px)] justify-center place-items-center">
      {isLoading ? (
        <AlbaCardSkeletons />
      ) : data?.pages.length && data?.pages[0].data.length ? (
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
