'use client';

import { useEffect, useRef, useState } from 'react';
import DownIcon from '@/public/icons/chevron-down.svg';
import useMyScrapsStore from '@/store/myscraps';

interface Option {
  key: string | boolean | undefined;
  label: string;
}

interface DropdownProps {
  name: string;
  options: Option[];
}

const ScrapsSortDropdown = ({ name, options }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const setScrapParams = useMyScrapsStore((state) => state.setScrapParams);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const buttonStyle =
    name === 'orderBy'
      ? 'gap-2 font-semibold text-2sm lg:text-lg text-black-300'
      : `justify-between w-[88px] lg:w-[126px] border rounded-[4px] font-regular text-xs lg:text-2lg py-1.5 pr-2.5 pl-3 lg:py-2 lg:pr-3 lg:pl-4 ${selectedOption === options[0] ? 'border-gray-100 bg-gray-50 text-black-100' : 'border-orange-300 bg-orange-50 text-orange-300'}  whitespace-nowrap`;

  const imageStyle =
    name === 'orderBy'
      ? 'text-gray-200'
      : `${selectedOption === options[0] ? 'text-gray-200' : 'text-orange-100'}`;

  const dropDownStyle =
    name === 'orderBy'
      ? 'w-auto border-line-100 rounded-lg'
      : 'w-full border-gray-100 rounded-[4px]';

  const optionStyle =
    name === 'orderBy'
      ? 'rounded-lg text-center font-medium text-xs lg:text-lg text-gray-400 hover:font-semibold hover:text-black-400 m-[3px] lg:m-[7px] py-1 px-[5px] lg:py-1.5 lg:px-4'
      : 'font-regular text-xs lg:text-2lg text-black-100 hover:text-orange-300 py-2 px-2.5 lg:py-[13px] lg:px-4';

  const handleOptionClick = (option: Option) => {
    setScrapParams({ [name]: option.key });
    setSelectedOption(option);
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
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center ${buttonStyle}`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="text-xs lg:text-lg font-semibold">
          {selectedOption.label}
        </span>
        <DownIcon
          width={16}
          height={16}
          alt="드롭다운"
          className={`lg:w-6 lg:h-6 ${imageStyle} transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isDropdownOpen && (
        <div
          className={`absolute top-[calc(100%+6px)] lg:top-[calc(100%+8px)] right-0 border bg-gray-50 shadow-md z-40 overflow-hidden ${dropDownStyle}`}
        >
          {options.map((option) => (
            <div
              key={`${option.key}`}
              className={`cursor-pointer whitespace-nowrap hover:bg-orange-50  ${optionStyle}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapsSortDropdown;
