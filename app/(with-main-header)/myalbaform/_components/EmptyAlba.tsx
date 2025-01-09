import Image from 'next/image';

const EmptyAlba = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 lg:gap-8 h-[50dvh]">
      <Image
        src="/icons/empty-form.svg"
        width={80}
        height={80}
        alt="알바미등록"
        className="lg:w-[120px] lg:h-[120px]"
      />
      <p className="text-center font-regular text-md lg:text-2lg text-gray-200">
        등록된 알바폼이 없어요. <br /> 1분 만에 등록하고 알바를 구해보세요!
      </p>
    </div>
  );
};

export default EmptyAlba;
