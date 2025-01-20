'use client';

import useGetMyApplication from '@/app/(with-main-header)/myapply/[formId]/_hooks/useGetMyApplication';
import { convertMonthsToYearsAndMonths } from '@/utils/dateFormatter';
import DownloadIcon from '@/public/icons/download.svg';
import { getResumeFile } from '@/services/resumeFile';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';

type ApplicationDetailProps = {
  formId: number;
};

const ApplicationDetail = ({ formId }: ApplicationDetailProps) => {
  const { data, isLoading, isError } = useGetMyApplication(formId);

  if (isLoading) {
    <div className="transform translate-y-20">
      <Loader />
    </div>;
  }

  if (isError) {
    return <div>🚨공습경보🆘</div>;
  }

  const handleDownloadClick = async () => {
    try {
      if (data) {
        await getResumeFile(data.resumeId, data.resumeName);
      }
    } catch {
      toast.error('이력서 다운로드에 실패했습니다');
    }
  };

  return (
    <div className="py-14 lg:py-28 w-full">
      <h3 className="text-black-500 font-2lg font-semibold lg:text-3xl mb-4 lg:mb-14">
        제출 내용
      </h3>
      {data && (
        <div className="font-regular text-md text-black-400 lg:text-2xl">
          <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
            <span className="text-black-100">이름</span>
            <p>{data.name}</p>
          </div>
          <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
            <span className="text-black-100">연락처</span>
            <p>{data.phoneNumber}</p>
          </div>
          <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
            <span className="text-black-100">경력</span>
            <p>{convertMonthsToYearsAndMonths(data.experienceMonths)}</p>
          </div>
          <div className="py-4 lg:py-8 flex flex-col gap-4">
            <span className="text-black-100">이력서</span>
            <button
              type="button"
              onClick={handleDownloadClick}
              className="flex gap-6 justify-between items-center p-4 bg-background-200 rounded-lg hover:font-bold hover:underline "
            >
              <span className="flex-1 text-left lg:text-xl text-black-400">
                {data.resumeName}
              </span>
              <DownloadIcon className="w-6 h-6 lg:w-9 lg:h-9" />
            </button>
          </div>
          <div className="flex flex-col gap-4 py-4 lg:py-8">
            <span className="text-black-100">자기소개</span>
            <p className="p-4 border border-line-100 rounded-lg lg:text-xl">
              {data.introduction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
