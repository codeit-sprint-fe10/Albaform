import Image from 'next/image';
import AlbaCardSkeleton from './AlbaCardSkeleton';

const PrivateAlbaCard = () => {
  return (
    <div className="relative w-[min(100%,360px)] lg:w-[469px] ">
      <div
        className={
          'absolute inset-0 flex flex-col items-center justify-center gap-4 lg:gap-6 ' +
          'rounded-xl lg:rounded-2xl border-2 border-gray-200 bg-[#3E3E3EAA] backdrop-blur'
        }
      >
        <Image
          src="/icons/private.svg"
          alt="비공개 알바폼"
          width={80}
          height={80}
          className="lg:w-[120px] lg:h-[120px]"
        />
        <span className="text-md lg:text-2lg font-medium text-gray-50">
          비공개 처리된 알바폼이에요
        </span>
      </div>
      <AlbaCardSkeleton isPulse={false} />
    </div>
  );
};

export default PrivateAlbaCard;
