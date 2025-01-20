'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainHeader from '@/components/MainHeader';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 w-full border-b border-solid border-line-100 bg-gray-50 z-50">
        <div className="px-6 md:px-[72px] lg:max-w-container m-auto">
          <MainHeader />
        </div>
      </div>
      <div className="relative flex min-h-dvh flex-col items-center justify-center bg-background-100 overflow-hidden">
        <div className="relative group animate-float">
          <h1 className="relative text-[7rem] md:text-[10rem] font-bold">
            404
          </h1>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`absolute top-0 left-0 text-[7rem] md:text-[10rem] font-bold text-orange-300 opacity-50`}
              style={{ transform: `translate(${i * 1.2}px, ${i * 1.2}px)` }}
            >
              404
            </span>
          ))}
        </div>
        <p className="mt-4 text-center font-bold text-lg md:text-2xl text-black-500 ">
          아무것도 없는 공간입니다. 😕
          <br />
          잘못된 링크를 통해 오신 것 같아요.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-orange-200 to-orange-300 px-8 py-4 text-sm md:text-xl font-semibold text-gray-50 shadow-md transition duration-200 hover:scale-110"
          >
            홈으로
          </Link>
          <button
            className="rounded-lg bg-gradient-to-r from-gray-50 to-orange-50 px-8 py-4 text-sm md:text-xl font-semibold text-orange-300 shadow-md transition duration-200 hover:scale-110 ring-2 ring-orange-300"
            onClick={() => router.back()}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
