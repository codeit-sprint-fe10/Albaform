'use client';

import {
  applicationStatus,
  GetApplicationsParameters,
  orderByTypes,
} from '@/types/application';
import useGetApplications from '@/app/(with-main-header)/alba/[formId]/_hooks/useGetApplications';
import InfiniteScroll from '@/components/InfiniteScroll';
import useToggleOrderBy from '@/app/(with-main-header)/alba/[formId]/_hooks/useToggleOrderBy';
import Image from 'next/image';

type ApplicationsProps = {
  formId: number;
};

const PAGE_LIMIT = 5;

const Applications = ({ formId }: ApplicationsProps) => {
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
    useGetApplications({ formId, searchParams });

  return (
    <div>
      <h3 className="text-black-500 font-2lg font-semibold lg:text-3xl">
        지원 현황
      </h3>
      <div className="grid grid-cols-4 items-center gap-4 text-black-100 font-regular text-md lg:text-xl border-b border-line-100">
        <div className="py-6">이름</div>
        <div className="py-6">전화번호</div>
        <div className="py-6">
          <button
            onClick={toggleOrderByExperience}
            className="flex gap-1 items-center lg:gap-2"
          >
            경력
            <Image
              src={`/icons/arrow-${orderByExperience}.svg`}
              alt={orderByExperience}
              width={32}
              height={32}
              className="lg:w-9 lg:h-9"
            />
          </button>
        </div>
        <div className="py-6">
          <button
            onClick={toggleOrderByStatus}
            className="flex gap-1 items-center lg:gap-2"
          >
            상태
            <Image
              src={`/icons/arrow-${orderByStatus}.svg`}
              alt={orderByExperience}
              width={32}
              height={32}
              className="lg:w-9 lg:h-9"
            />
          </button>
        </div>
      </div>
      <div className="text-black-400 text-md font-regular lg:text-xl">
        <InfiniteScroll
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          loadNextPage={fetchNextPage}
          loader={<p>Loading applications...</p>}
        >
          {data?.pages.map((page) =>
            page.data.map((application) => (
              <div
                key={application.applicantId}
                className="grid grid-cols-4 gap-4 border-b border-line-100 py-6"
              >
                <div>{application.name}</div>
                <div>{application.phoneNumber}</div>
                <div>{application.experienceMonths}</div>
                <div>{applicationStatus[application.status]}</div>
              </div>
            )),
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Applications;
