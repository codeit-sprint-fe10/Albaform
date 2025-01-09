'use client';

import { useState } from 'react';
import { SortOrder } from '@/types/albatalk';
import { SORT_OPTIONS } from '@/constants/dropdown';

interface SortDropdownProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

const SortDropdown = ({ sortOrder, setSortOrder }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSortOrderChange = (selectedOrder: SortOrder) => {
    setSortOrder(selectedOrder);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <span className="text-xs lg:text-lg font-semibold">
          {SORT_OPTIONS.find((option) => option.key === sortOrder)?.label}
        </span>
        <div
          className={`w-2 h-2 border-t-2 border-r-2 border-gray-500 transform transition-transform ${
            isDropdownOpen ? 'rotate-[135deg]' : '-rotate-45'
          }`}
        ></div>
      </button>

      {isDropdownOpen && (
        <div className="absolute top-[calc(100%+4px)] right-[calc(100%)+2px] lg:right-0 w-20 lg:w-32 px-2 py-3 bg-gray-50 border border-gray-100 rounded-lg shadow-lg z-10">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.key}
              className={`w-full text-gray-400 font-regular lg:px-4 py-2 text-center text-xs lg:text-lg rounded-lg hover:font-semibold cursor-pointer hover:bg-orange-50 hover:text-black-400 ${
                sortOrder === option.key ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handleSortOrderChange(option.key)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
