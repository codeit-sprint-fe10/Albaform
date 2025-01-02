'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WriteFAB = () => {
  const { push } = useRouter();

  const handleButtonClick = () => {
    push('/addform');
  };

  const buttonStyle =
    'fixed right-6 md:right-[72px] lg:right-[max(72px,calc((100%-1456px)/2))] ' +
    'bottom-16 md:bottom-24 lg:bottom-32 flex items-center justify-center gap-[2px] ' +
    'w-[120px] lg:w-[140px] h-[54px] lg:h-16 rounded-full bg-orange-300 hover:bg-orange-200 ' +
    'text-lg lg:text-xl font-semibold text-gray-50 shadow-md shadow-gray-300 ' +
    'transition duration-200';

  return (
    <button onClick={handleButtonClick} className={buttonStyle}>
      <Image
        src="/icons/plus.svg"
        alt=""
        width={24}
        height={24}
        className="lg:w-9 lg:h-9"
      />
      폼 만들기
    </button>
  );
};

export default WriteFAB;
