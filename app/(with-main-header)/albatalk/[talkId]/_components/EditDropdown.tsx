'use client';
import React, { useState } from 'react';
import KebabIcon from '@/public/icons/kebab.svg';

interface EditDropdownProps {
  onAction: (action: 'edit' | 'delete') => void;
}

const EditDropdown = ({ onAction }: EditDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const OPTIONS = [
    { key: 'edit', label: '수정하기', action: 'edit' },
    { key: 'delete', label: '삭제하기', action: 'delete' },
  ] as const;

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = (action: 'edit' | 'delete') => {
    onAction(action);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer"
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
              onClick={() => handleOptionClick(option.key as 'edit' | 'delete')}
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
