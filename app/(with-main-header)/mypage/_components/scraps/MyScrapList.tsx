'use client';

import InfiniteScroll from '@/components/InfiniteScroll';
import Filters from './Filters';
import ScrapCard from './ScrapCard';
import useGetMyScraps from '../../_hooks/useGetMyScraps';
import useMyScrapsStore from '@/store/myscraps';
import Loader from '@/components/Loader';
import Empty from '../Empty';
import ScrapCardSkeleton from './ScrapCardSkeleton';

const PAGE_LIMIT = 6;

const ScrapCardSkeletons = () =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <div key={idx} className="w-full">
        <ScrapCardSkeleton />
      </div>
    ));

const MyScrapList = () => {
  const scrapParams = useMyScrapsStore((state) => state.scrapParams);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyScraps({ pageLimit: PAGE_LIMIT, ...scrapParams });

  return (
    <div className="max-w-container">
      <Filters />
      {isLoading ? (
        <div className="w-full flex flex-col items-center gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
          <ScrapCardSkeletons />
        </div>
      ) : data?.pages[0]?.data.length ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={
            <div className="mt-9">
              <Loader />
            </div>
          }
        >
          <div className="w-full flex flex-col items-center gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
            {data.pages.map((page) =>
              page?.data.map((scrap) => (
                <ScrapCard key={scrap.id} {...scrap} />
              )),
            )}
          </div>
        </InfiniteScroll>
      ) : (
        <Empty type="scrap" />
      )}
    </div>
  );
};

export default MyScrapList;
