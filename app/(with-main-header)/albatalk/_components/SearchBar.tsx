'use client';
import React, { ChangeEvent } from 'react';
import SearchIcon from '@/public/icons/search.svg';
import SortDropdown from './SortDropdown';
import { SortOrder } from '@/types/albatalk';

interface SearchBarProps {
  searchTerm: string;
  sortOrder: SortOrder;
  cursorHistory: number[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  setCursorHistory: React.Dispatch<React.SetStateAction<number[]>>;
}
const SearchBar = ({
  searchTerm,
  sortOrder,
  setSearchTerm,
  setSortOrder,
  setCursorHistory,
}: SearchBarProps) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCursorHistory([0]);
  };

  return (
    <div className="flex justify-center md:border-b-2">
      <div className="flex w-full flex-col h-28 mt-4 items-end justify-center gap-4 md:flex-row lg:max-w-container-200 md:items-center md:justify-between lg:gap-4 md:mt-0">
        <div className="flex w-full h-14 md:w-4/5 lg:w-5/6 bg-background-200 border-none rounded-2xl px-6 py-4 justify-center items-center md:rounded-3xl">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
            <SearchIcon className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-2 bg-background-200 focus:outline-none"
          />
        </div>
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </div>
  );
};

export default SearchBar;
