'use client';

import InfiniteScroll from '@/components/InfiniteScroll';
import Filters from './Filters';
import ScrapCard from './ScrapCard';
import useGetMyScraps from '../../_hooks/useGetMyScraps';
import useMyScrapsStore from '@/store/myscraps';
import Loader from '@/components/Loader';
import Empty from '../Empty';

const PAGE_LIMIT = 6;

const MyScrapList = () => {
  const scrapParams = useMyScrapsStore((state) => state.scrapParams);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyScraps({ pageLimit: PAGE_LIMIT, ...scrapParams });

  return (
    <div>
      <Filters />
      {data?.pages[0]?.data.length ? (
        <div className="w-full flex flex-col items-center gap-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12">
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<Loader />}
          >
            {data.pages.map((page) =>
              page?.data.map((scrap) => (
                <ScrapCard key={scrap.id} {...scrap} />
              )),
            )}
          </InfiniteScroll>
        </div>
      ) : (
        <Empty type="scrap" />
      )}
    </div>
  );
};

export default MyScrapList;
