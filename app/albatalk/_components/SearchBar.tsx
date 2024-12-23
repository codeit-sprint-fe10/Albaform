import { ChangeEvent } from 'react';
import SearchIcon from '@/public/icons/search.svg';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setNextCursor: React.Dispatch<React.SetStateAction<number>>;
  setSortOrder: React.Dispatch<
    React.SetStateAction<'mostRecent' | 'mostLiked' | 'mostCommented'>
  >;
  sortOrder: 'mostRecent' | 'mostLiked' | 'mostCommented';
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  setNextCursor,
  setSortOrder,
  sortOrder,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setNextCursor(0);
  };

  const handleSortOrderChange = (
    order: 'mostRecent' | 'mostLiked' | 'mostCommented',
  ) => {
    setSortOrder(order);
    setCurrentPage(1);
    setNextCursor(0);
  };
  return (
    <div className="flex justify-center border-b-2">
      <div className="flex max-w-container-200 w-full h-28 items-center justify-between gap-4">
        <div className="flex w-full max-w-6xl bg-background-200 border-none rounded-3xl px-6 py-4 justify-center items-center">
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
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 ${sortOrder === 'mostRecent' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleSortOrderChange('mostRecent')}
          >
            최신순
          </button>
          <button
            className={`px-4 py-2 ${sortOrder === 'mostLiked' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleSortOrderChange('mostLiked')}
          >
            좋아요순
          </button>
          <button
            className={`px-4 py-2 ${sortOrder === 'mostCommented' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleSortOrderChange('mostCommented')}
          >
            댓글 많은순
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
