'use client';
import React, { ChangeEvent } from 'react';
import SearchIcon from '@/public/icons/search.svg';
import SortDropdown from './SortDropdown';
import { SortOrder } from '@/types/sort';

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
    <div className="flex justify-center border-b-2">
      <div className="flex max-w-container-200 w-full h-28 items-center justify-between gap-4">
        <div className="flex w-5/6 bg-background-200 border-none rounded-3xl px-6 py-4 justify-center items-center">
          <div className="flex items-center justify-center w-8 h-8">
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
