import Link from 'next/link';
import Image from 'next/image';
import { FormDataProps } from '@/types/form';
import { isWithinInterval } from '@/utils/date';
import { formatDate } from '@/utils/dateFormatter';
import PrivateAlbaCard from './PrivateAlbaCard';
import { calculateDDay } from '@/utils/dDayCalculator';

interface AlbaCardProps {
  form: FormDataProps;
}

const AlbaCard = ({ form }: AlbaCardProps) => {
  if (!form.isPublic) return <PrivateAlbaCard />;

  return (
    <Link
      href={`/alba/${form.id}`}
      className={
        'flex flex-col gap-6 lg:gap-9 w-[min(100%,360px)] lg:w-[469px] ' +
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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>{form.isPublic ? '공개' : '비공개'}</div>
          <div>
            {isWithinInterval(new Date(), {
              start: new Date(form.recruitmentStartDate),
              end: new Date(form.recruitmentEndDate),
            })
              ? '모집 중'
              : '모집 마감'}
          </div>
          <div>{`${formatDate(form.recruitmentStartDate)} ~ ${formatDate(form.recruitmentEndDate)}`}</div>
        </div>
      </div>
      <div>{form.title}</div>
      <div>
        <div>지원자 {form.applyCount}명</div>
        <div>스크랩 {form.scrapCount}명</div>
        <div>
          {calculateDDay(form.recruitmentEndDate) < 0
            ? '모집 마감'
            : `모집 D-${calculateDDay(form.recruitmentEndDate)}`}
        </div>
      </div>
    </Link>
  );
};

export default AlbaCard;
