import Badge from '@/components/Badge';
import { formatFullDateTime } from '@/utils/dateFormatter';
import Image from 'next/image';
import { Recruitment } from '@/types/recruitment';

type SectionFirstProps = Pick<
  Recruitment,
  | 'isPublic'
  | 'createdAt'
  | 'storeName'
  | 'location'
  | 'title'
  | 'scrapCount'
  | 'applyCount'
>;

const SummarySection = ({
  isPublic,
  createdAt,
  storeName,
  location,
  title,
  scrapCount,
  applyCount,
}: SectionFirstProps) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <Badge value={isPublic ? '공개' : '비공개'} />
          <Badge value={'모집중'} />
        </div>
        <span className="text-gray-500 font-regular text-xs lg:text-2lg">
          {formatFullDateTime(createdAt)} 등록
        </span>
      </div>
      <div className="mt-[24px] lg:mt-[48px]">
        <span className="text-black-400 font-semibold text-md lg:text-2xl relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-black-400">
          {storeName}
        </span>
        <span className="text-gray-400 font-medium text-sm lg:text-xl ml-[10px] lg:ml-[16px]">
          {location} ・ 경력무관
        </span>
      </div>
      <h2 className="font-semibold text-black-500 text-xl lg:text-3xl mt-[12px] lg:mt-[16px]">
        {title}
      </h2>
      <div className="mt-[32px] lg:mt-[40px] px-[8px] py-[12px] relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-[1px] before:bg-line-100 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-line-100">
        <div className="grid grid-cols-[3fr_7fr] grid-rows-2 gap-4">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/icons/bookmark.svg"
              alt="bookmark icon"
              width={24}
              height={24}
              className="lg:w-[36px] lg:h-[36px]"
            />
            <span className="text-black-400 font-semibold text-xs lg:text-2lg">
              스크랩
            </span>
          </div>
          <span className="text-black-200 font-semibold text-xs lg:text-2lg flex items-center">
            {scrapCount}회
          </span>
          <div className="flex items-center gap-[8px]">
            <Image
              src="/icons/user.svg"
              alt="user icon"
              width={24}
              height={24}
              className="lg:w-[36px] lg:h-[36px]"
            />
            <span className="text-black-400 font-semibold text-xs lg:text-2lg flex items-center">
              지원현황
            </span>
          </div>
          <span className="text-black-200 font-semibold text-xs lg:text-2lg leading-[20px] ">
            현재까지 <strong>{applyCount}명</strong>이 알바폼에 지원했어요!
          </span>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
