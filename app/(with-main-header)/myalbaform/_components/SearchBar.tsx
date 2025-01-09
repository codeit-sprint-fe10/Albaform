'use client';

import { KeyboardEvent } from 'react';
import useMyalbaformStore from '@/store/myalbaform';
import SearchIcon from '@/public/icons/search.svg';

const SearchBar = () => {
  const setSearchParams = useMyalbaformStore((state) => state.setSearchParams);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      e.stopPropagation();
      setSearchParams({ keyword: value || undefined });
    }
  };

  return (
    <div className="fixed top-[50px] md:top-[68px] lg:top-[92px] left-0 w-full border-b border-line-100 bg-gray-50 z-50">
      <div className="lg:max-w-container lg:m-auto py-2 md:py-4 lg:py-6 px-6 md:px-[72px]">
        <div className="relative">
          <SearchIcon
            width={24}
            height={24}
            className="absolute top-1/2 -translate-y-1/2 left-3.5 lg:left-6 lg:w-9 lg:h-9 text-gray-300 "
            alt="검색바"
          />
          <input
            placeholder="검색어로 조회해보세요."
            className="w-full md:w-5/6 rounded-2xl lg:rounded-3xl outline-none bg-background-200 text-lg lg:text-xl text-black-400 placeholder:text-gray-400 py-3.5 pr-[17px] pl-[46px] lg:py-4 lg:pr-6 lg:pl-[68px]"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
