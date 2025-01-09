'use client';

import { useState, useRef, useEffect } from 'react';
import { SortOrder } from '@/types/albatalk';
import { SORT_OPTIONS } from '@/constants/dropdown';
import DownIcon from '@/public/icons/chevron-down.svg';

interface SortDropdownProps {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}

const SortDropdown = ({ sortOrder, setSortOrder }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSortOrderChange = (selectedOrder: SortOrder) => {
    setSortOrder(selectedOrder);
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <span className="text-xs lg:text-lg font-semibold">
          {SORT_OPTIONS.find((option) => option.key === sortOrder)?.label}
        </span>

        <DownIcon
          width={16}
          height={16}
          alt="드롭다운"
          className={`lg:w-6 lg:h-6 text-gray-200 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-20 top-[calc(100%+4px)] right-[calc(100%)+2px] lg:right-0 w-20 lg:w-32 px-2 py-3 bg-gray-50 border border-gray-100 rounded-lg shadow-lg z-10">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.key}
              className={`w-full bg-gray-50 text-gray-400 font-regular lg:px-4 py-2 text-center text-xs lg:text-lg rounded-lg hover:font-semibold cursor-pointer hover:bg-orange-50 hover:text-black-400 ${
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
