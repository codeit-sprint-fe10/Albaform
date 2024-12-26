'use client';

import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';
import Input from './Input';

interface Option {
  key: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  name: string;
  register?: UseFormRegisterReturn;
}

const DropdownInput = ({ options, name, register }: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-between items-center w-full font-regular text-lg lg:text-xl bg-background-200 text-black-400 placeholder:text-gray-400 rounded-lg py-[9px] px-6 lg:py-3.5 lg:px-8"
        onClick={() => setIsDropdownVisible((prev) => !prev)}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <span className="text-gray-200">선택</span>
        )}
        <Image
          src="/icons/drop-menu.svg"
          width={36}
          height={36}
          alt="드롭다운"
          className={`transition-transform duration-300 ${isDropdownVisible ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isDropdownVisible && (
        <ul className="absolute w-full top-[calc(100%+4px)] bg-gray-50 rounded-lg shadow-md z-10">
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
      )}
      {selectedOption && selectedOption.key === 'customInput' && (
        <div className="mt-3 lg:mt-4">
          <Input name={name} className="p-3.5 lg:py-4" {...register} />
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
