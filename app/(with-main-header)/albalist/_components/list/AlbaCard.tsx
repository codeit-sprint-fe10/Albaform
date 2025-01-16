import Link from 'next/link';
import Image from 'next/image';
import { AlbaCardType } from '@/types/alba';
import { isWithinInterval } from '@/utils/date';
import { calculateDDay } from '@/utils/dDayCalculator';
import { formatDateWithSpace } from '@/utils/dateFormatter';
import PrivateAlbaCard from './PrivateAlbaCard';
import Badge from '@/components/Badge';
import MenuDropdown from '../filter/MenuDropdown';

interface AlbaCardProps {
  alba: AlbaCardType;
}

const AlbaCard = ({ alba }: AlbaCardProps) => {
  if (!alba.isPublic) return <PrivateAlbaCard />;

  const publicBadgeValue = alba.isPublic ? '공개' : '비공개';

  const recruitBadgeValue = isWithinInterval(new Date(), {
    start: new Date(alba.recruitmentStartDate),
    end: new Date(alba.recruitmentEndDate),
  })
    ? '모집 중'
    : '모집 마감';

  const recruitPeriod =
    formatDateWithSpace(alba.recruitmentStartDate).concat(' ~ ') +
    formatDateWithSpace(alba.recruitmentEndDate);

  const recruitDDay =
    calculateDDay(alba.recruitmentEndDate) < 0
      ? '모집 마감'
      : `마감 D-${calculateDDay(alba.recruitmentEndDate)}`;

  const leftBarStyle =
    'before:absolute before:left-[0px] before:inset-y-0 ' +
    'before:block before:w-[1.5px] before:bg-line-200';

  const rightBarStyle =
    'after:absolute after:right-[0px] after:inset-y-0 ' +
    'after:block after:w-[1.5px] after:bg-line-200';

  return (
    <Link
      href={`/alba/${alba.id}`}
      className={
        'group flex flex-col gap-3 lg:gap-6 rounded-xl lg:rounded-2xl ' +
        'hover:-translate-y-2 hover:shadow-lg transition duration-200'
      }
    >
      {alba.imageUrls[0] ? (
        <Image
          src={alba.imageUrls[0]}
          alt={`알바폼 이미지 - ${alba.title}`}
          width={469}
          height={312}
          quality={100}
          className="w-full aspect-[3/2] object-cover rounded-xl lg:rounded-2xl"
        />
      ) : (
        <Image
          src="/icons/empty-form.svg"
          alt="대체 이미지"
          width={469}
          height={312}
          className={
            'aspect-[3/2] w-full h-auto object-none bg-gray-100' +
            ' rounded-xl lg:rounded-2xl'
          }
        />
      )}
      <div className="flex items-center justify-between px-2 lg:px-3">
        <div className="flex items-center gap-2 lg:gap-3">
          <Badge value={publicBadgeValue} />
          <Badge value={recruitBadgeValue} />
          <span className="text-md lg:text-lg text-black-100">
            {recruitPeriod}
          </span>
        </div>
        <MenuDropdown albaId={alba.id} />
      </div>
      <h3
        className={
          'h-[52px] lg:h-16 px-2 lg:px-3 line-clamp-2 text-2lg lg:text-xl ' +
          'font-semibold text-black-500 group-hover:underline'
        }
      >
        {alba.title}
      </h3>
      <div
        className={
          'grid grid-cols-3 gap-[1px] py-[10px] lg:py-4 rounded-xl lg:rounded-2xl border ' +
          'border-line-200 text-center text-xs lg:text-lg text-black-200'
        }
      >
        <div>지원자 {alba.applyCount}명</div>
        <div className={`relative ${leftBarStyle} ${rightBarStyle}`}>
          스크랩 {alba.scrapCount}명
        </div>
        <div>{recruitDDay}</div>
      </div>
    </Link>
  );
};

export default AlbaCard;
