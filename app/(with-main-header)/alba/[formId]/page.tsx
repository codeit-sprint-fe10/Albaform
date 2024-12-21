import Chip from '@/components/Chip';
import { formatFullDateTime } from '@/utils/dateFormatter';
import Image from 'next/image';

const mock = {
  isPublic: true,
  createdAt: '2024-12-21T06:37:44.900Z',
  storeName: '코드잇',
  location: '서울시 종로구',
  scrapCount: 8,
  applyCount: 5,
  title:
    '코드잇 스터디카페 관리 (주말 오전) 모집합니다 서울 종로구 용산구 서대문',
};

const Page = async ({ params }: { params: Promise<{ formId: number }> }) => {
  const { formId } = await params;
  console.log(formId); // TODO api 호출 후 제거

  return (
    <div className="mt-[50px]">
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
    </div>
  );
};

export default Page;
