import Chip from '@/components/Chip';
import {
  formatDate,
  formatDateWithSpace,
  formatFullDateTime,
} from '@/utils/dateFormatter';
import Image from 'next/image';
import TermsDetail from '@/app/(with-main-header)/alba/_components/TermsDetail';
import ApplicantsAlert from '@/app/(with-main-header)/alba/_components/ApplicantsAlert';
import { calculateDDay } from '@/utils/dDayCalculator';
import Requirements from '@/app/(with-main-header)/alba/_components/Requirements';
import Location from '@/app/(with-main-header)/alba/_components/Location';

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
};

const Page = async ({ params }: { params: Promise<{ formId: number }> }) => {
  const { formId } = await params;
  console.log(formId); // TODO api 호출 후 제거

  return (
    <div className="mt-[50px]">
      <div className="fixed top-[60px] md:top-[80px] lg:top-[110px] left-1/2 transform -translate-x-1/2 z-50 w-[300px] lg:w-[1085px]">
        <ApplicantsAlert count={mock.applyCount} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <Chip value={mock.isPublic ? '공개' : '비공개'} />
          <Chip value={'모집중'} />
        </div>
        <span className="text-gray-500 font-regular text-xs lg:text-2lg">
          {formatFullDateTime(mock.createdAt)} 등록
        </span>
      </div>

      <div>
        <span className="text-black-400 font-semibold text-md lg:text-2xl relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-black-400">
          {mock.storeName}
        </span>
        <span className="text-gray-400 font-medium text-sm lg:text-xl ml-[10px] lg:ml-[16px]">
          {mock.location} ・ 경력무관
        </span>
      </div>

      <h2 className="font-semibold text-black-500 text-xl lg:text-3xl">
        {mock.title}
      </h2>

      <div className="px-[8px] py-[12px] relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-[1px] before:bg-line-100 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-line-100">
        <div className="grid grid-cols-[3fr_7fr] grid-rows-2 gap-4">
          <div className="flex items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]">
              <Image src="/icons/bookmark.svg" alt="bookmark icon" fill />
            </div>
            <span className="text-black-400 font-semibold text-xs lg:text-2lg">
              스크랩
            </span>
          </div>
          <span className="text-black-200 font-semibold text-xs lg:text-2lg flex items-center">
            {mock.scrapCount}회
          </span>
          <div className="flex items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]">
              <Image src="/icons/user.svg" alt="user icon" fill />
            </div>
            <span className="text-black-400 font-semibold text-xs lg:text-2lg flex items-center">
              지원현황
            </span>
          </div>
          <span className="text-black-200 font-semibold text-xs lg:text-2lg leading-[20px] ">
            현재까지 <strong>{mock.applyCount}명</strong>이 알바폼에 지원했어요!
          </span>
        </div>
      </div>

      <div className="grid grid-rows-2 grid-cols-2 gap-2">
        <TermsDetail
          title="시급"
          value={mock.hourlyWage.toLocaleString() + '원'}
          iconUrl={'/icons/money.svg'}
        />
        <TermsDetail
          title="기간"
          value={`${formatDate(mock.workStartDate).slice(2)}~${formatDate(mock.workEndDate).slice(2)}`}
          iconUrl={'/icons/calendar-clock.svg'}
        />
        <TermsDetail
          title="요일"
          value={
            mock.isNegotiableWorkDays ? '협의가능' : mock.workDays.join(', ')
          }
          iconUrl={'/icons/calendar.svg'}
        />
        <TermsDetail
          title="시간"
          value={`${mock.workStartTime}~${mock.workEndTime}`}
          iconUrl={'/icons/clock.svg'}
        />
      </div>

      <div>
        <div className="border-b border-line-100 flex items-center justify-between py-[14px] font-regular text-xs lg:text-xl">
          <span className="text-black-100 ">
            모집기간
            <span className="ml-1.5 text-orange-300 font-semibold">{`D-${calculateDDay(mock.recruitmentEndDate)}`}</span>
          </span>
          <span className="text-black-400 ">{`${formatDateWithSpace(mock.recruitmentStartDate)} ~ ${formatDateWithSpace(mock.recruitmentStartDate)}`}</span>
        </div>
        <div className="border-b border-line-100 flex items-center justify-between py-[14px] font-regular text-xs lg:text-xl">
          <span className="text-black-100 ">가게 전화번호</span>
          <span className="text-black-400 ">{mock.storePhoneNumber}</span>
        </div>
        <div className="border-b border-line-100 flex items-center justify-between py-[14px] font-regular text-xs lg:text-xl">
          <span className="text-black-100 ">모집기간</span>
          <span className="text-black-400 ">{mock.phoneNumber}</span>
        </div>
      </div>

      <div>
        <p className="text-black-400 font-regular text-lg lg:text-2xl whitespace-pre-wrap">
          {mock.description}
        </p>
      </div>

      <Requirements {...mock} />
      <Location location={mock.location} />
    </div>
  );
};

export default Page;
