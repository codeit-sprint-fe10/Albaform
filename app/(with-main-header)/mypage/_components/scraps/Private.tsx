import Image from 'next/image';

const Private = () => {
  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col justify-center items-center w-full h-full backdrop-blur-sm bg-black-400/50 rounded-xl lg:rounded-2xl">
      <Image src="/icons/private.svg" width={80} height={80} alt="비공개" />
      <div className="text-md text-gray-50">비공개 처리된 알바폼이에요</div>
    </div>
  );
};

export default Private;
