'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getForms } from '@/services/form';
import { GetFormsResponse } from '@/types/form';
import { FilterProps } from '../page';
import AlbaCard from './list/AlbaCard';
import AlbaListEmpty from './list/AlbaListEmpty';
import AlbaCardSkeleton from './list/AlbaCardSkeleton';

const LIMIT = 6;

const AlbaCardSkeletons = () =>
  Array(LIMIT)
    .fill(0)
    .map((_, idx) => (
      <li key={idx} className="w-[min(100%,360px)] lg:w-[469px]">
        <AlbaCardSkeleton />
      </li>
    ));

interface AlbaListSectionProps {
  filter: FilterProps;
  isPublic: boolean | undefined;
}

const AlbaListSection = ({ filter, isPublic }: AlbaListSectionProps) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<GetFormsResponse>({
      queryKey: ['forms', filter],
      queryFn: ({ pageParam }) =>
        getForms({ limit: LIMIT, cursor: pageParam as number, ...filter }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  let forms = data?.pages.flatMap((page) => page.data);

  if (isPublic !== undefined) {
    forms = forms?.filter((form) => form.isPublic === isPublic);
  }

  return (
    <>
      <ul
        className={
          'flex flex-wrap justify-center gap-x-6 gap-y-8 md:gap-y-12 lg:gap-y-16 ' +
          'mt-[180px] md:mt-[214px] lg:mt-[286px] pt-2 md:pt-4 lg:pt-14 pb-16 md:pb-24 lg:pb-32 '
        }
      >
        {isLoading ? (
          <AlbaCardSkeletons />
        ) : forms?.length === 0 ? (
          <AlbaListEmpty />
        ) : (
          forms?.map((form) => (
            <li key={form.id} className="w-[min(100%,360px)] lg:w-[469px]">
              <AlbaCard form={form} />
            </li>
          ))
        )}
        {isFetchingNextPage && <AlbaCardSkeletons />}
      </ul>
      <div ref={ref}></div>
    </>
  );
};

export default AlbaListSection;
