import Link from 'next/link';
import Image from 'next/image';
import { FormDataProps } from '@/types/form';
import { isWithinInterval } from '@/utils/date';
import { calculateDDay } from '@/utils/dDayCalculator';
import { formatDateWithSpace } from '@/utils/dateFormatter';
import PrivateAlbaCard from './PrivateAlbaCard';
import Badge from '@/components/Badge';
import MenuDropdown from '../filter/MenuDropdown';

interface AlbaCardProps {
  form: FormDataProps;
}

const AlbaCard = ({ form }: AlbaCardProps) => {
  if (!form.isPublic) return <PrivateAlbaCard />;

  const publicBadgeValue = form.isPublic ? '공개' : '비공개';

  const recruitBadgeValue = isWithinInterval(new Date(), {
    start: new Date(form.recruitmentStartDate),
    end: new Date(form.recruitmentEndDate),
  })
    ? '모집 중'
    : '모집 마감';

  const recruitPeriod =
    formatDateWithSpace(form.recruitmentStartDate).concat(' ~ ') +
    formatDateWithSpace(form.recruitmentEndDate);

  const recruitDDay =
    calculateDDay(form.recruitmentEndDate) < 0
      ? '모집 마감'
      : `마감 D-${calculateDDay(form.recruitmentEndDate)}`;

  const leftBarStyle =
    'before:absolute before:left-[0px] before:inset-y-0 ' +
    'before:block before:w-[1.5px] before:bg-line-200';

  const rightBarStyle =
    'after:absolute after:right-[0px] after:inset-y-0 ' +
    'after:block after:w-[1.5px] after:bg-line-200';

  return (
    <Link
      href={`/alba/${form.id}`}
      className={
        'group flex flex-col gap-3 lg:gap-6 ' +
        'rounded-xl lg:rounded-2xl hover:shadow-lg transition duration-200'
      }
    >
      {form.imageUrls && form.imageUrls[0] ? (
        <Image
          src={form.imageUrls[0]}
          alt={`알바폼이미지-${form.title}`}
          width={469}
          height={312}
          quality={100}
          className="w-full aspect-[3/2] object-cover rounded-xl lg:rounded-2xl"
        />
      ) : (
        <Image
          src="/icons/empty-form.svg"
          alt="대체이미지"
          width={469}
          height={312}
          className="w-full aspect-[3/2] object-none bg-gray-100 rounded-xl lg:rounded-2xl"
        />
      )}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 lg:gap-3">
          <Badge value={publicBadgeValue} />
          <Badge value={recruitBadgeValue} />
          <span className="text-md lg:text-lg text-black-100">
            {recruitPeriod}
          </span>
        </div>
        <MenuDropdown formId={form.id} />
      </div>
      <h3
        className={
          'h-[52px] lg:h-16 px-1 line-clamp-2 text-2lg lg:text-xl ' +
          'font-semibold text-black-500 group-hover:underline'
        }
      >
        {form.title}
      </h3>
      <div
        className={
          'grid grid-cols-3 gap-[1px] py-[10px] lg:py-4 rounded-xl lg:rounded-2xl border ' +
          'border-line-200 text-center text-xs lg:text-lg text-black-200'
        }
      >
        <div>지원자 {form.applyCount}명</div>
        <div className={`relative ${leftBarStyle} ${rightBarStyle}`}>
          스크랩 {form.scrapCount}명
        </div>
        <div>{recruitDDay}</div>
      </div>
    </Link>
  );
};

export default AlbaCard;
