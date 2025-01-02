'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getForms } from '@/services/form';
import { GetFormsResponse } from '@/types/form';
import { FilterProps } from '../page';
import AlbaCard from './AlbaCard';
import AlbaListEmpty from './AlbaListEmpty';
import AlbaCardSkeleton from './AlbaCardSkeleton';

const LIMIT = 6;

const AlbaCardSkeletons = () =>
  Array(LIMIT)
    .fill(0)
    .map((_, idx) => (
      <li key={idx}>
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
      <ul className="mt-[130px] md:mt-[146px] lg:mt-[194px] flex flex-wrap justify-center gap-6">
        {isLoading ? (
          <AlbaCardSkeletons />
        ) : forms?.length === 0 ? (
          <AlbaListEmpty />
        ) : (
          forms?.map((form) => (
            <li key={form.id}>
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
