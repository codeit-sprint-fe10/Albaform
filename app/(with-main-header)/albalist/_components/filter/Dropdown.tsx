'use client';

import { FocusEvent, MouseEvent, useRef, useState } from 'react';
import ArrowIcon from '@/public/icons/chevron-down.svg';
import KebabIcon from '@/public/icons/kebab.svg';

export interface Option {
  key: string | boolean | undefined;
  label: string;
}

interface DropdownProps {
  type: 'filter' | 'sort' | 'menu';
  options: Option[];
  onSelect: (option: Option) => void;
}

const Dropdown = ({ type, options, onSelect }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDropdownBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) setIsOpen(false);
  };

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const divStyle = {
    filter: 'relative w-[88px] lg:w-32',
    sort: 'relative w-24 lg:w-36',
    menu: 'relative w-6 h-6 lg:w-9 lg:h-9',
  };

  const selectStyle = {
    filter:
      'flex items-center justify-between w-full h-[30px] lg:h-[42px] pl-3 pr-2 py-[6px] ' +
      'rounded border text-xs lg:text-2lg lg:font-medium ' +
      `${
        selectedOption === options[0]
          ? 'border-gray-100 bg-gray-50 text-black-100'
          : 'border-orange-300 bg-orange-50 text-orange-300'
      }`,
    sort:
      'flex items-center justify-end gap-[2px] lg:gap-1 w-full h-[30px] lg:h-[42px] ' +
      'py-[6px] text-xs lg:text-lg font-semibold text-black-300',
    menu: 'hover:contrast-0 transition duration-200',
  };

  const arrowColor = {
    filter: selectedOption === options[0] ? '#c4c4c4' : '#FCC369',
    sort: '#c4c4c4',
  };

  const ulStyle = {
    filter:
      'absolute top-[calc(100%+5px)] lg:top-[calc(100%+7px)] z-10 w-full ' +
      'border rounded border-gray-100 overflow-hidden shadow-md',
    sort:
      'absolute top-[calc(100%+5px)] lg:top-[calc(100%+7px)] z-10 w-full ' +
      'border rounded-lg border-line-100 bg-background-100 shadow-md',
    menu:
      'absolute top-[calc(100%+2px)] lg:top-[calc(100%+4px)] right-0 z-10 w-20 lg:w-32 ' +
      'border rounded-lg border-line-100 bg-background-100 shadow-md',
  };

  const optionStyle = {
    filter:
      'w-full py-2 lg:py-3 bg-gray-50 hover:bg-orange-50 text-xs lg:text-2lg ' +
      'lg:font-medium text-black-100 hover:text-orange-300 transition duration-200',
    sort:
      'w-full py-[5px] rounded-lg border-[3px] lg:border-[7px] border-gray-50 ' +
      'bg-gray-50 hover:bg-orange-50 text-xs lg:text-lg font-medium hover:font-semibold ' +
      'text-gray-400 hover:text-black-400 transition duration-200',
    menu:
      'w-full py-[5px] rounded-lg border-[3px] lg:border-[7px] border-gray-50 ' +
      'bg-gray-50 hover:bg-orange-50 text-xs lg:text-lg font-medium hover:font-semibold ' +
      'text-gray-400 hover:text-black-400 transition duration-200',
  };

  return (
    <div
      ref={dropdownRef}
      onClick={handleDropdownClick}
      onBlur={handleDropdownBlur}
      className={divStyle[type]}
    >
      <button
        type="button"
        onClick={handleSelectClick}
        className={selectStyle[type]}
      >
        {type === 'menu' ? (
          <KebabIcon
            alt="메뉴 버튼"
            width={24}
            height={24}
            className="lg:w-9 lg:h-9"
          />
        ) : (
          <>
            {selectedOption.label}
            <ArrowIcon
              alt=""
              width={16}
              height={16}
              color={arrowColor[type]}
              className={`lg:w-6 lg:h-6 ${isOpen ? 'rotate-180' : ''} transition duration-200`}
            />
          </>
        )}
      </button>
      {isOpen && (
        <ul className={ulStyle[type]}>
          {options.map((option) => {
            return (
              <li key={`${option.key}`}>
                <button
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  className={optionStyle[type]}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
