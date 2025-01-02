'use client';

import useGetMyApplication from '@/app/(with-main-header)/myapply/[formId]/_hooks/useGetMyApplication';
import {
  convertMonthsToYearsAndMonths,
  formatDateTimeWithLetters,
} from '@/utils/dateFormatter';

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
  resumeName: 'resumeName',
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

  return (
    <div className="py-14 lg:py-28 w-full">
      <h3 className="text-black-500 font-2lg font-semibold lg:text-3xl mb-4 lg:mb-14">
        제출 내용
      </h3>
      <div className="font-regular text-md text-black-400 lg:text-2xl">
        <p className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">이름</span>
          <span>{mock.name}</span>
        </p>
        <p className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">연락처</span>
          <span>{mock.phoneNumber}</span>
        </p>
        <p className="flex justify-between items-center py-4 lg:py-8 border-b border-line-100">
          <span className="text-black-100">경력</span>
          <span>{convertMonthsToYearsAndMonths(mock.experienceMonths)}</span>
        </p>
        <p className="flex justify-between items-center py-4 lg:py-8">
          <span className="text-black-100">이력서</span>
          <span>엥?</span>
        </p>
        <p className="flex flex-col gap-4 py-4 lg:py-8">
          <span className="text-black-100">자기소개</span>
          <span className="p-4 border border-line-100 rounded-lg lg:text-xl">
            {mock.introduction}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ApplicationDetail;
