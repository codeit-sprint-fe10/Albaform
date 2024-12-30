'use client';
import React, { useState } from 'react';
import KebabIcon from '@/public/icons/kebab.svg';
import { deleteTalk } from '@/services/albatalk';

interface EditDropdownProps {
  onEdit: () => void;
  onDelete: (id: number) => void;
  id: number;
}

const EditDropdown: React.FC<EditDropdownProps> = ({
  onEdit,
  onDelete,
  id,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const OPTIONS = [
    { key: 'edit', label: '수정하기', action: onEdit },
    { key: 'delete', label: '삭제하기', action: () => handleDelete(id) },
  ] as const;

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleOptionClick = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTalk(id);
      console.log(`Talk with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error delete talk:', error);
    }
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
              onClick={() => handleOptionClick(option.action)}
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
