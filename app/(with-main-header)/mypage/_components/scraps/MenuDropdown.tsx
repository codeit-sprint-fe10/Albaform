'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SCRAP_OPTIONS } from '@/constants/dropdown';

interface Option {
  key: string;
  label: string;
}

const MenuDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: Option) => {
    setIsDropdownVisible(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownVisible(false);
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
        type="button"
        className="block"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        <Image
          src="/icons/kebab.svg"
          width={24}
          height={24}
          alt="카드 메뉴"
          className="lg:w-9 lg:h-9"
        />
      </button>
      {isDropdownVisible && (
        <ul className="absolute top-[calc(100%+6px)] lg:top-[calc(100%+9px)] right-0 w-auto border border-line-100 bg-gray-50 rounded-lg shadow-md z-10">
          {SCRAP_OPTIONS.map((option) => (
            <li
              key={option.key}
              className="rounded-lg text-center font-medium text-gray-400 cursor-pointer whitespace-nowrap hover:bg-orange-50 hover:font-semibold hover:text-black-400  my-1 mx-[3px] lg:m-[7px] py-1 px-[15px] lg:py-1.5 lg:px-[31px]"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuDropdown;
