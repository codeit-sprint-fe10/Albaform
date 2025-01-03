'use client';

import useGetMyApplication from '@/app/(with-main-header)/myapply/[formId]/_hooks/useGetMyApplication';
import { convertMonthsToYearsAndMonths } from '@/utils/dateFormatter';
import DownloadIcon from '@/public/icons/download.svg';
import { getResumeFile } from '@/services/resumeFile';

type ApplicationDetailProps = {
  formId: number;
};

const mock = {
  applicantId: 0,
  updatedAt: '2025-01-02T07:06:16.590Z',
  createdAt: '2025-01-02T07:06:16.590Z',
  status: 'REJECTED',
  introduction:
    '코드잇 스터디 카페입니다. \n주말 토, 일 오픈업무 하실 분 구합니다.\n\n성실하게 일하실 분들만 지원 바랍니다.\n작성한 이력서(사진 부착)를 알바폼에 첨부해주시고, 아래와 같이 문자 보내주세요. \n근무 중 전화통화 불가합니다.\n\n 예) OOO입니다. __에 거주합니다. 알바폼 지원. \n\n이력서 검토 후 면접진행자에 한해 면접일정 개별 연락드리겠습니다. \n많은 지원 바랍니다.',
  resumeName: 'resumeName.pdf',
  resumeId: 266,
  experienceMonths: 13,
  phoneNumber: '01044448888',
  name: '김희진',
  id: 0,
};

const ApplicationDetail = ({ formId }: ApplicationDetailProps) => {
  // const { data, isError } = useGetMyApplication(formId);

  // if (isError) {
  //   return <div>🚨공습경보🆘</div>;
  // }

  const handleDownloadClick = async () => {
    try {
      await getResumeFile(mock.resumeId, mock.resumeName);
    } catch {
      alert('이력서 다운로드 실패!');
    }
  };

  return (
    <div className="py-14 lg:py-28 w-full">
      <h3 className="text-black-500 font-2lg font-semibold lg:text-3xl mb-4 lg:mb-14">
        제출 내용
      </h3>
      <div className="font-regular text-md text-black-400 lg:text-2xl">
        <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">이름</span>
          <p>{mock.name}</p>
        </div>
        <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">연락처</span>
          <p>{mock.phoneNumber}</p>
        </div>
        <div className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">경력</span>
          <p>{convertMonthsToYearsAndMonths(mock.experienceMonths)}</p>
        </div>
        <div className="py-4 lg:py-8 flex flex-col gap-4">
          <span className="text-black-100">이력서</span>
          <button
            type="button"
            onClick={handleDownloadClick}
            className="flex gap-6 justify-between items-center p-4 bg-background-200 rounded-lg hover:font-bold hover:underline "
          >
            <span className="flex-1 text-left lg:text-xl text-black-400">
              {mock.resumeName}
            </span>
            <DownloadIcon className="w-6 h-6 lg:w-9 lg:h-9" />
          </button>
        </div>
        <div className="flex flex-col gap-4 py-4 lg:py-8">
          <span className="text-black-100">자기소개</span>
          <p className="p-4 border border-line-100 rounded-lg lg:text-xl">
            {mock.introduction}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
