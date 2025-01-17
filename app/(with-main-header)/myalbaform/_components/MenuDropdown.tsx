'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MENU_OWNER_OPTIONS } from '@/constants/dropdown';
import KebabIcon from '@/public/icons/kebab.svg';

interface Option {
  key: string;
  label: string;
}

const MenuDropdown = ({
  id,
  openModal,
}: {
  id: number;
  openModal: VoidFunction;
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleOptionClick = (option: Option) => {
    if (option.key === 'modify') {
      router.push(`/alba/${id}/edit`);
    }
    if (option.key === 'delete') {
      openModal();
      setIsDropdownVisible(false);
    }
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
    <div
      className="relative"
      ref={dropdownRef}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <button
        type="button"
        className="block"
        aria-label="카드 메뉴"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        <KebabIcon
          width={24}
          height={24}
          className="lg:w-9 lg:h-9 hover:contrast-0 transition duration-300"
        />
      </button>
      {isDropdownVisible && (
        <ul className="absolute top-[calc(100%+6px)] lg:top-[calc(100%+9px)] right-0 w-auto border border-line-100 bg-gray-50 rounded-lg shadow-md z-10">
          {MENU_OWNER_OPTIONS.map((option) => (
            <li
              key={option.key}
              className="rounded-lg font-medium text-gray-400 cursor-pointer whitespace-nowrap hover:bg-orange-50 hover:font-semibold hover:text-black-400  my-1 mx-[3px] lg:m-[7px] py-1 px-[15px] lg:py-1.5 lg:px-[31px]"
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
