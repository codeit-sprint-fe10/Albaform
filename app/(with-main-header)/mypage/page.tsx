'use client';
import Tap from './_components/Tap';
import SortDropdown from './_components/SortDropdown';
import KebabIcon from '@/public/icons/kebab.svg';

const Mypage = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-6 items-center justify-center mt-4 lg:mt-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-black-500 text-xl lg:text-3xl text-left font-semibold">
            마이페이지
          </h1>
          <button className="bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer">
            <KebabIcon className="w-6 h-6 lg:w-9 lg:h-9" />
          </button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Tap />
          <div className="w-full flex justify-end">
            <SortDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
