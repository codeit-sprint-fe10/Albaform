'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import SearchIcon from '@/public/icons/search.svg';

interface SearchInputProps {
  onUpdate: (keyword: string) => void;
}

const SearchInput = ({ onUpdate }: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.slice(0, 20));
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') onUpdate(value);
  };

  const handleIconClick = () => {
    onUpdate(value);
  };

  return (
    <div className="relative">
      <input
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        value={value}
        placeholder="어떤 알바를 찾고 있나요?"
        className={
          'w-full h-14 lg:h-16 my-2 md:my-4 lg:my-6 pl-12 lg:pl-16 rounded-2xl lg:rounded-3xl ' +
          'bg-background-200 outline-none text-lg lg:text-xl text-black-400 '
        }
      />
      <SearchIcon
        onClick={handleIconClick}
        alt=""
        width={24}
        height={24}
        color="#ABABAB"
        className={
          'absolute top-[calc((100%-24px)/2)] lg:top-[calc((100%-36px)/2)] left-4 ' +
          'lg:w-9 lg:h-9 hover:contrast-0 cursor-pointer transition duration-200'
        }
      />
    </div>
  );
};

export default SearchInput;
