import Image from 'next/image';
import Link from 'next/link';

const WriteButton = () => {
  return (
    <Link
      href="/addform"
      className="fixed bottom-11 right-6 flex items-center gap-0.5 bg-orange-300 rounded-full font-semibold text-lg lg:text-xl text-gray-50 py-3.5 pl-4 pr-[18px] lg:pl-3 lg:pr-4 whitespace-nowrap shadow-md hover:bg-orange-200 transition duration-300"
    >
      <Image
        src="/icons/plus.svg"
        width={24}
        height={24}
        className="lg:w-9 lg:h-9"
        alt="폼 만들기"
      />
      폼만들기
    </Link>
  );
};

export default WriteButton;
