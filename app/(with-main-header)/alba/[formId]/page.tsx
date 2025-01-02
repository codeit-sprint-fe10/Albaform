import Requirements from '@/app/(with-main-header)/alba/[formId]/_components/Requirements';
import Location from '@/app/(with-main-header)/alba/[formId]/_components/Location';
import SummarySection from '@/app/(with-main-header)/alba/[formId]/_components/SummarySection';
import TermsSection from '@/app/(with-main-header)/alba/[formId]/_components/TermsSection';
import ContactSection from '@/app/(with-main-header)/alba/[formId]/_components/ContactSection';
import AlertSection from '@/app/(with-main-header)/alba/[formId]/_components/AlertSection';
import DescriptionSection from '@/app/(with-main-header)/alba/[formId]/_components/DescriptionSection';
import FloatingActions from '@/app/(with-main-header)/alba/[formId]/_components/FloatingActions';
import ApplicationActions from '@/app/(with-main-header)/alba/[formId]/_components/ApplicationActions';
import Carousel from '@/app/(with-main-header)/alba/[formId]/_components/Carousel';
import { getAlbaDetail } from '@/services/alba';

const mock = {
  isPublic: true,
  createdAt: '2024-12-21T06:37:44.900Z',
  storeName: '코드잇',
  location:
    '{"address": "서울시 송파구 삼전동", "coordinates": {"lat": 37.5027233386059, "lng": 127.092519707191}}',
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
  const albaDetail = await getAlbaDetail(formId);

  return (
    <div>
      <div className="-mx-6 md:-mx-[72px] xl:mx-0 flex justify-center">
        {albaDetail.imageUrls?.length && (
          <div className="w-full">
            <Carousel imageUrls={albaDetail.imageUrls} />
          </div>
        )}
      </div>
      <div className="relative">
        <div className="flex flex-col lg:flex-row justify-between lg:gap-36">
          <div className="lg:basis-1/2">
            <div>
              <AlertSection applyCount={albaDetail.applyCount} />
              <div className="mt-8 md:mt-[80px]">
                <SummarySection {...albaDetail} />
              </div>
              <div className="mt-8 md:mt-10 lg:hidden">
                <TermsSection {...albaDetail} />
              </div>
              <div className="mt-8 lg:hidden">
                <ContactSection {...albaDetail} />
              </div>
              <div className="mt-8">
                <DescriptionSection description={albaDetail.description} />
              </div>
            </div>
            <div className="mt-8">
              <Location location={albaDetail.location} />
            </div>
            <FloatingActions isScrapped={albaDetail.isScrapped} id={formId} />
          </div>
          <div className="lg:basis-1/2">
            <div className="lg:flex flex-col">
              <div className="hidden mt-8 md:mt-10 lg:block">
                <TermsSection {...albaDetail} />
              </div>
              <div className="hidden mt-8 lg:block">
                <ContactSection {...albaDetail} />
              </div>
              <div className="mt-8 lg:order-2">
                <Requirements {...albaDetail} />
              </div>
              <div className="mt-10 mb-[30px] lg:order-1">
                <ApplicationActions formId={formId} />
              </div>
              {/*<div>*/}
              {/*  <OwnerSection formId={formId} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbaFormIdPage;
