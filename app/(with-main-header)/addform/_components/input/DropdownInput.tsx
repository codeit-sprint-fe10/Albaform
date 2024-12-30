'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import Image from 'next/image';
import Input from './Input';
import { DropdownFieldName, PostFormBody } from '@/types/form';

interface Option {
  key: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  name: DropdownFieldName;
  setValue: (name: DropdownFieldName, value: string) => void;
  widthStyle?: string;
  paddingStyle?: string;
  register?: UseFormRegister<PostFormBody>;
  icon?: ReactNode;
  type?: string;
  defaultValue: string | number;
}

const DropdownInput = ({
  options,
  name,
  widthStyle = 'w-full',
  paddingStyle = 'py-[9px] px-6 lg:py-3.5 lg:px-8',
  register,
  icon,
  type,
  setValue,
  defaultValue,
}: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    defaultValue,
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.label);
    setValue(name, option.label);
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
        className={`flex items-center gap-2 lg:gap-4 font-regular text-lg lg:text-xl bg-background-200 text-black-400 placeholder:text-gray-400 rounded-lg ${paddingStyle} ${widthStyle}`}
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        {icon}
        <div className="flex justify-between items-center flex-1">
          {selectedOption ? (
            selectedOption
          ) : (
            <span className="text-gray-200">선택</span>
          )}
          <Image
            src="/icons/drop-menu.svg"
            width={36}
            height={36}
            alt="드롭다운"
            className={`transition-transform duration-300 ${isDropdownVisible ? 'rotate-180' : 'rotate-0'} ${type && 'w-6 h-6 lg:w-9 lg:h-9'}`}
          />
        </div>
      </button>

      {isDropdownVisible && (
        <div
          className={`absolute top-[calc(100%+4px)] w-full bg-gray-50 rounded-lg shadow-md z-10 pr-[1px] ${widthStyle}`}
        >
          <ul className="max-h-[160px] lg:max-h-[200px] font-regular text-lg lg:text-xl text-black-100 overflow-y-auto custom-scrollbar">
            {options.map((option) => {
              return (
                <li
                  key={option.key}
                  onClick={() => handleOptionClick(option)}
                  className="py-3.5 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-orange-50"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {selectedOption === '직접입력' && register && (
        <div className="mt-3 lg:mt-4">
          <Input
            name={name}
            className="p-3.5 lg:py-4"
            register={register(name)}
          />
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
