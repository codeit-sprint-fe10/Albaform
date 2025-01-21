import Image from 'next/image';

const AlbaListEmpty = () => {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-9 pt-[160px] md:pt-[200px] lg:pt-[240px]">
      <Image
        src="/icons/empty-form.svg"
        alt=""
        width={80}
        height={80}
        className="lg:w-[120px] lg:h-[120px]"
      />
      <p className="text-center text-md lg:text-2lg lg:font-medium text-gray-400">
        등록된 알바폼이 없어요.
        <br />
        1분 만에 등록하고 알바를 구해보세요!
      </p>
    </div>
  );
};

export default AlbaListEmpty;
