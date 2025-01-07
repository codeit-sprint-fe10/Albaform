'use client';

import InfiniteScroll from '@/components/InfiniteScroll';
import { GetMyCreatedAlbasParameters } from '@/types/alba';
import useGetMyCreatedAlbas from '../_hooks/useGetMyCreatedAlbas';
import { useState } from 'react';
import Card from './Card';

const PAGE_LIMIT = 6;

const MyAlbas = () => {
  const [searchParams, setSearchParams] = useState<GetMyCreatedAlbasParameters>(
    { limit: PAGE_LIMIT, orderBy: 'mostRecent' },
  );

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetMyCreatedAlbas(searchParams);

  return (
    <div>
      {data?.pages.length ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
        >
          <ul className="grid gap-8 md:gap-y-12 md:gap-x-6 lg:gap-y-16 md:grid-cols-[repeat(auto-fit,_327px)] lg:grid-cols-[repeat(auto-fit,_469px)] justify-center place-items-center pb-10">
            {data.pages.map((page) =>
              page.data.map((myAlba) => (
                <li key={myAlba.id}>
                  <Card {...myAlba} />
                </li>
              )),
            )}
          </ul>
        </InfiniteScroll>
      ) : (
        <div>todo</div>
      )}
    </div>
  );
};

export default MyAlbas;
