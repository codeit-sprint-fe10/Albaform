'use client';

import { GetApplicationsParameters, orderByType } from '@/types/application';
import { Fragment, useState } from 'react';
import useGetApplications from '@/app/(with-main-header)/alba/[formId]/_hooks/useGetApplications';
import InfiniteScroll from '@/components/InfiniteScroll';

type ApplicationsProps = {
  id: number;
};

const PAGE_LIMIT = 5;

const Applications = ({ id }: ApplicationsProps) => {
  const searchParams: GetApplicationsParameters = {
    limit: PAGE_LIMIT,
    orderByExperience: 'asc',
    orderByStatus: 'desc',
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetApplications({ formId: id, searchParams });

  return (
    <InfiniteScroll
      hasNextPage={hasNextPage}
      isLoading={isFetchingNextPage}
      onLoadMore={fetchNextPage}
      loader={<p>Loading applications...</p>}
    >
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.data.map((application) => (
            <div key={application.id}>{application.name}</div>
          ))}
        </Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default Applications;
