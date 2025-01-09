'use client';

import React, { useState, useEffect, useRef } from 'react';
import KebabIcon from '@/public/icons/kebab.svg';
import { EditDropdownAction } from '@/types/albatalk';

interface EditDropdownProps {
  onAction: (action: EditDropdownAction) => void;
}

const OPTIONS = [
  { key: 'edit', label: '수정하기' },
  { key: 'delete', label: '삭제하기' },
] as const;

const EditDropdown = ({ onAction }: EditDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = (key: EditDropdownAction) => {
    onAction(key);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        className="bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <KebabIcon className="w-6 h-6 lg:w-9 lg:h-9" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-[calc(100%+4px)] right-4 w-20 lg:w-32 px-2 py-3 bg-gray-50 border border-gray-100 rounded-lg shadow-lg z-10">
          {OPTIONS.map((option) => (
            <div
              key={option.key}
              className="w-full text-gray-400 font-regular lg:px-4 py-2 text-center text-xs lg:text-lg rounded-lg hover:font-semibold cursor-pointer hover:bg-orange-50 hover:text-black-400"
              onClick={() => handleOptionClick(option.key)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditDropdown;
