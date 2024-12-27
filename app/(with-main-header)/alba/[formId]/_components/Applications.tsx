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
      <table className="table-auto w-full text-left">
        <thead className="text-black-100 font-regular text-md lg:text-xl">
          <tr>
            <th className="py-6 border-b border-line-100">이름</th>
            <th className="py-6 border-b border-line-100">전화번호</th>
            <th className="py-6 border-b border-line-100">
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
            </th>
            <th className="py-6 border-b border-line-100">
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
            </th>
          </tr>
        </thead>
        <tbody className="text-black-400 text-md font-regular lg:text-xl">
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage}
            loadNextPage={fetchNextPage}
            loader={<p>Loading applications...</p>}
          >
            {data?.pages.map((page, pageIndex) => (
              <tr key={pageIndex}>
                {page.data.map((application) => {
                  return (
                    <>
                      <td className="py-6 border-b border-line-100">
                        {application.name}
                      </td>
                      <td className="py-6 border-b border-line-100">
                        {application.phoneNumber}
                      </td>
                      <td className="py-6 border-b border-line-100">
                        {application.experienceMonths}
                      </td>
                      <td className="py-6 border-b border-line-100">
                        {applicationStatus[application.status]}
                      </td>
                    </>
                  );
                })}
              </tr>
            ))}
          </InfiniteScroll>
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
