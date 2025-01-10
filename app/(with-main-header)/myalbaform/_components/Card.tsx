import Link from 'next/link';
import Image from 'next/image';
import { AlbaCardType } from '@/types/alba';
import { format, isWithinInterval } from '@/utils/date';
import { calculateDDay } from '@/utils/dDayCalculator';
import Badge from '@/components/Badge';
import MenuDropdown from './MenuDropdown';

const Card = ({
  id,
  title,
  isPublic,
  imageUrls,
  recruitmentStartDate,
  recruitmentEndDate,
  scrapCount,
  applyCount,
}: AlbaCardType) => {
  const status = isWithinInterval(new Date(), {
    start: new Date(recruitmentStartDate),
    end: new Date(recruitmentEndDate),
  })
    ? '모집 중'
    : '마감';

  const period = `${format(new Date(recruitmentStartDate), 'yyyy. MM. dd')} ~ ${format(new Date(recruitmentEndDate), 'yyyy. MM. dd')}`;

  const dDay =
    calculateDDay(recruitmentEndDate) < 0
      ? '마감'
      : `마감 D-${calculateDDay(recruitmentEndDate)}`;

  const rightBarStyle =
    'after:absolute after:top-1/2 after:-translate-y-1/2 after:right-0 after:w-[1px] after:h-3.5 after:bg-line-100';

  return (
    <Link
      href={`alba/${id}`}
      className="block max-w-[327px] lg:max-w-[477px] hover:-translate-y-2.5 transition duration-200"
    >
      <Image
        src={imageUrls[0] || '/icons/empty-form.svg'}
        alt={`${title} 이미지`}
        width={327}
        height={208}
        quality={100}
        priority
        className={`lg:w-[477px] lg:h-[304px] aspect-video rounded-xl lg:rounded-2xl bg-gray-100 mb-6 ${imageUrls[0] ? 'object-cover' : 'object-none'}`}
      />
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <div className="flex items-center gap-2">
          <Badge value={isPublic ? '공개' : '비공개'} />
          <Badge value={status} />
          <div className="font-regular text-md text-black-100 lg:ml-3">
            {period}
          </div>
        </div>
        <MenuDropdown id={id} />
      </div>
      <h3 className="h-[52px] lg:h-16 font-semibold text-2lg lg:text-xl text-black-500 mb-6 lg:mb-8">
        {title}
      </h3>
      <div className="flex border border-line-100 rounded-xl lg:rounded-2xl font-regular text-xs lg:text-lg text-black-200 py-2.5 lg:py-3">
        <div className={`relative flex-1 flex justify-center ${rightBarStyle}`}>
          지원자 {applyCount}명
        </div>
        <div className={`relative flex-1 flex justify-center ${rightBarStyle}`}>
          스크랩 {scrapCount}명
        </div>
        <div className="flex-1 flex justify-center">{dDay}</div>
      </div>
    </Link>
  );
};

export default Card;
