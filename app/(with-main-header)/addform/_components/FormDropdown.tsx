'use client';

import { useState } from 'react';
import WritingChip from './WritingChip';
import DownIcon from '@/public/icons/chevron-down.svg';

interface FormDropdownProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tabStatuses: Record<string, boolean>;
}

const FORM_OPTIONS = [
  { key: 1, label: '모집 내용' },
  { key: 2, label: '모집 조건' },
  { key: 3, label: '근무 조건' },
] as const;

const FormDropdown = ({
  currentStep,
  setCurrentStep,
  tabStatuses,
}: FormDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: (typeof FORM_OPTIONS)[number]) => {
    setCurrentStep(option.key);
    setIsOpen((prev) => !prev);
  };

  return (
    <ul
      className={`rounded-2xl cursor-pointer overflow-hidden ${isOpen ? 'border border-gray-200 bg-gray-50' : ''}`}
    >
      {FORM_OPTIONS.map((option) => {
        const isSelected = FORM_OPTIONS[currentStep - 1] === option;

        return (
          <li
            key={option.key}
            onClick={() => handleOptionClick(option)}
            className={`flex justify-between items-center font-bold text-md text-black-100 py-3 px-6 ${!isSelected && !isOpen ? 'hidden' : ''} ${isSelected ? 'bg-orange-300  text-gray-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 py-[2px]">
                <div
                  className={`flex justify-center items-center w-5 h-5 bg-background-300 rounded-full text-gray-200 ${isSelected ? 'bg-orange-50 text-orange-300' : ''}`}
                >
                  {option.key}
                </div>
                {option.label}
              </div>
              {tabStatuses[`tab${option.key}`] && (
                <WritingChip isSelected={isSelected} />
              )}
            </div>
            {isSelected && (
              <DownIcon
                width={24}
                height={24}
                className={`text-gray-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FormDropdown;
