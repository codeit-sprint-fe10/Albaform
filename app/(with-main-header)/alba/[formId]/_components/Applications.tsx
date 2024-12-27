'use client';

import { GetApplicationsParameters, orderByTypes } from '@/types/application';
import { Fragment } from 'react';
import useGetApplications from '@/app/(with-main-header)/alba/[formId]/_hooks/useGetApplications';
import InfiniteScroll from '@/components/InfiniteScroll';
import useToggleOrderBy from '@/app/(with-main-header)/alba/[formId]/_hooks/useToggleOrderBy';

type ApplicationsProps = {
  id: number;
};

const PAGE_LIMIT = 5;

const Applications = ({ id }: ApplicationsProps) => {
  const [orderByExperience, toggleOrderByExperience] = useToggleOrderBy(
    orderByTypes[1],
  );
  const [orderByStatus, toggleOrderByStatus] = useToggleOrderBy(
    orderByTypes[1],
  );

  const searchParams: GetApplicationsParameters = {
    limit: PAGE_LIMIT,
    orderByExperience,
    orderByStatus,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetApplications({ formId: id, searchParams });

  return (
    <>
      <div>
        <button onClick={toggleOrderByExperience}>Toggle Experience</button>
        <button onClick={toggleOrderByStatus}>Toggle Status</button>
      </div>
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isLoading={isFetchingNextPage}
        loadNextPage={fetchNextPage}
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
    </>
  );
};

export default Applications;
