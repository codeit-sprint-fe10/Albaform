import React, { useState } from 'react';

interface SortDropdownProps {
  sortOrder: 'mostRecent' | 'mostLiked' | 'mostCommented';
  setSortOrder: React.Dispatch<
    React.SetStateAction<'mostRecent' | 'mostLiked' | 'mostCommented'>
  >;
}

const SortDropdown = ({ sortOrder, setSortOrder }: SortDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSortOrderChange = (
    selectedOrder: 'mostRecent' | 'mostLiked' | 'mostCommented',
  ) => {
    setSortOrder(selectedOrder);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="px-4 py-2 bg-white rounded-md flex items-center justify-between gap-3 cursor-pointer"
        onClick={handleDropdownToggle}
      >
        <span className="text-lg font-semibold">
          {sortOrder === 'mostRecent'
            ? '최신순'
            : sortOrder === 'mostLiked'
              ? '좋아요순'
              : '댓글 많은순'}
        </span>
        <div
          className={`w-2 h-2 border-t-2 border-r-2 border-gray-500 transform transition-transform ${
            isDropdownOpen ? 'rotate-[135deg]' : '-rotate-45'
          }`}
        ></div>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 top-12 w-32 px-2 py-3 bg-gray-50 border border-gray-100 rounded-lg shadow-lg z-10">
          <div
            className={`w-full px-4 py-2 text-center text-lg rounded-lg font-semibold cursor-pointer hover:bg-orange-50 ${
              sortOrder === 'mostRecent' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleSortOrderChange('mostRecent')}
          >
            최신순
          </div>
          <div
            className={`w-full px-4 py-2 text-center text-lg rounded-lg font-semibold cursor-pointer hover:bg-orange-50 ${
              sortOrder === 'mostLiked' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleSortOrderChange('mostLiked')}
          >
            좋아요순
          </div>
          <div
            className={`w-full px-4 py-2 text-center text-lg rounded-lg font-semibold cursor-pointer hover:bg-orange-50 ${
              sortOrder === 'mostCommented' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleSortOrderChange('mostCommented')}
          >
            댓글 많은순
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
