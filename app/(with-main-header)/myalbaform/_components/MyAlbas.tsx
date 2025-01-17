'use client';

import InfiniteScroll from '@/components/InfiniteScroll';
import CreatedCard from './CreatedCard';
import AppliedCard from './AppliedCard';
import useGetMyAlbas from '../_hooks/useGetMyCreatedAlbas';
import {
  useMyAppliedAlbaformStore,
  useMyCreatedAlbaformStore,
} from '@/store/myalbaform';
import AlbaCardSkeleton from '../../albalist/_components/list/AlbaCardSkeleton';
import EmptyAlba from './EmptyAlba';
import { getMyCreatedAlbas } from '@/services/alba';
import { getMyAppliedAlbas } from '@/services/application';
import {
  AlbaCardType,
  GetAlbasResponse,
  GetMyCreatedAlbasParameters,
} from '@/types/alba';
import {
  ApplicationCardType,
  GetMyAppliedAlbasParameters,
  GetMyAppliedAlbasResponse,
} from '@/types/application';
import AppliedCardSkeleton from './AppliedCardSkeleton';
import useDeleteAlba from '../_hooks/useDeleteAlba';

const PAGE_LIMIT = 6;

const AlbaCardSkeletons = ({ isOwner }: { isOwner: boolean }) =>
  Array(PAGE_LIMIT)
    .fill(0)
    .map((_, idx) => (
      <li
        key={idx}
        className={isOwner ? 'w-[min(100%,327px)] lg:w-[477px]' : ''}
      >
        {isOwner ? <AlbaCardSkeleton /> : <AppliedCardSkeleton />}
      </li>
    ));

export type QueryParameters =
  | GetMyCreatedAlbasParameters
  | GetMyAppliedAlbasParameters;
export type QueryResponse = GetAlbasResponse | GetMyAppliedAlbasResponse;

const MyAlbas = ({ isOwner }: { isOwner: boolean }) => {
  const createdStore = useMyCreatedAlbaformStore((state) => state.searchParams);
  const appliedStore = useMyAppliedAlbaformStore((state) => state.searchParams);

  const searchParams = isOwner ? createdStore : appliedStore;

  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useGetMyAlbas<QueryParameters, QueryResponse>(
      { limit: PAGE_LIMIT, ...searchParams },
      isOwner ? getMyCreatedAlbas : getMyAppliedAlbas,
    );
  const { mutate: deleteAlba } = useDeleteAlba({
    limit: PAGE_LIMIT,
    ...searchParams,
  });

  const handleDelete = (id: number) => deleteAlba(id);

  return (
    <ul
      className={`grid ${isOwner ? 'md:grid-cols-[repeat(auto-fit,min(100%,327px))]' : 'md:grid-cols-[repeat(auto-fit,min(100%,375px))]'} lg:grid-cols-[repeat(auto-fit,477px)] justify-center place-items-start content-start gap-8 md:gap-y-12 md:gap-x-6 lg:gap-y-16`}
    >
      {isLoading ? (
        <AlbaCardSkeletons isOwner={isOwner} />
      ) : data?.pages?.[0]?.data?.length ? (
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={<AlbaCardSkeletons isOwner={isOwner} />}
        >
          {data.pages.map((page) =>
            page.data.map((myAlba) => (
              <li key={myAlba.id}>
                {isOwner ? (
                  <CreatedCard
                    onDelete={handleDelete}
                    {...(myAlba as AlbaCardType)}
                  />
                ) : (
                  <AppliedCard {...(myAlba as ApplicationCardType)} />
                )}
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
