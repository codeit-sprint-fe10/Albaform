import Requirements from '@/app/(with-main-header)/alba/[formId]/_components/Requirements';
import Location from '@/app/(with-main-header)/alba/[formId]/_components/Location';
import SummarySection from '@/app/(with-main-header)/alba/[formId]/_components/SummarySection';
import TermsSection from '@/app/(with-main-header)/alba/[formId]/_components/TermsSection';
import ContactSection from '@/app/(with-main-header)/alba/[formId]/_components/ContactSection';
import AlertSection from '@/app/(with-main-header)/alba/[formId]/_components/AlertSection';
import DescriptionSection from '@/app/(with-main-header)/alba/[formId]/_components/DescriptionSection';
import FixedActions from '@/app/(with-main-header)/alba/[formId]/_components/FixedActions';
import ApplicationActions from '@/app/(with-main-header)/alba/[formId]/_components/ApplicationActions';
import Image from 'next/image';
import IconEllipse480 from '@/public/icons/ellipse-480.svg';
import IconEllipse481 from '@/public/icons/ellipse-481.svg';

const mock = {
  isPublic: true,
  createdAt: '2024-12-21T06:37:44.900Z',
  storeName: '코드잇',
  location:
    '서울특별시 중구 청계천로 100 시그니쳐타워 동관 1층 코드잇 스터디카페',
  scrapCount: 8,
  applyCount: 5,
  title:
    '코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구 서대문',
  workEndTime: '21:00',
  workStartTime: '06:00',
  workEndDate: '2024-12-21T15:31:08.301Z',
  workStartDate: '2024-11-03T15:31:08.301Z',
  hourlyWage: 10000,
  workDays: ['월', '화', '수'],
  isNegotiableWorkDays: false,
  storePhoneNumber: '02-1234-5678',
  phoneNumber: '010-1234-5678',
  recruitmentEndDate: '2024-12-31T15:31:08.301Z',
  recruitmentStartDate: '2024-11-03T15:31:08.301Z',
  description:
    '코드잇 스터디 카페입니다. \n주말 토, 일 오픈업무 하실 분 구합니다.\n\n성실하게 일하실 분들만 지원 바랍니다.\n작성한 이력서(사진 부착)를 알바폼에 첨부해주시고, 아래와 같이 문자 보내주세요. \n근무 중 전화통화 불가합니다.\n\n 예) OOO입니다. __에 거주합니다. 알바폼 지원. \n\n이력서 검토 후 면접진행자에 한해 면접일정 개별 연락드리겠습니다. \n많은 지원 바랍니다.',
  numberOfPositions: 0,
  gender: '성별무관',
  education: '학력무관',
  age: '연령무관',
  preferred: '업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대',
  isScrapped: false,
  imageUrls: [
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/268/1734927454801/1.png',
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/268/1734927494408/2.png',
  ],
};

const AlbaFormIdPage = async ({
  params,
}: {
  params: Promise<{ formId: number }>;
}) => {
  const { formId } = await params;
  console.log(formId); // TODO api 호출 후 제거

  return (
    <div>
      <div className="-mx-[24px] md:-mx-[72px] flex justify-center">
        <div className="relative w-full h-[260px] lg:h-[560px] -mx-[24px]">
          <Image src={mock.imageUrls[1]} alt="" fill className="object-cover" />
          <div className="hidden lg:block absolute bottom-3 left-1/2">
            <div className="flex justify-between items-center gap-[15px]">
              <IconEllipse480 />
              <IconEllipse481 />
              <IconEllipse481 />
            </div>
          </div>
          <div className="text-gray-100 text-xs lg:text-2lg font-regular absolute bottom-3 lg:bottom-4 right-3 lg:right-4 bg-[rgba(0,0,0,0.2)] rounded-[100px] flex justify-center gap-[4px] lg:gap-[8px] px-[10px] lg:px-[16px] py-[2px] lg:py-[8px]">
            <span className="font-semibold">1</span>
            <span>/</span>
            <span>{mock.imageUrls.length}</span>
          </div>
        </div>
      </div>

      <div>
        <AlertSection applyCount={mock.applyCount} />
        <div className="mt-[32px] md:mt-[80px]">
          <SummarySection {...mock} />
        </div>
        <div className="mt-[32px] md:mt-[40px]">
          <TermsSection {...mock} />
        </div>
        <div className="mt-[32px]">
          <ContactSection {...mock} />
        </div>
        <div className="mt-[32px]">
          <DescriptionSection description={mock.description} />
        </div>
      </div>
      <div className="mt-[32px]">
        <Requirements {...mock} />
      </div>
      <div className="mt-[32px]">
        <Location location={mock.location} />
      </div>
      <div className="mt-[40px] mb-[30px]">
        <ApplicationActions formId={formId} />
      </div>
      <FixedActions isScrapped={mock.isScrapped} />
    </div>
  );
};

export default AlbaFormIdPage;
