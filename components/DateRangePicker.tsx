'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isWithinInterval,
} from '@/utils/date';
import { DateFieldName } from '@/types/alba';
import { useFormContext } from 'react-hook-form';

interface DateRangePickerProps {
  setValue: (name: DateFieldName, value: string) => void;
  startDateName: DateFieldName;
  endDateName: DateFieldName;
  defaultStartDate: string;
  defaultEndDate: string;
}

const DateRangePicker = ({
  setValue,
  startDateName,
  endDateName,
  defaultStartDate,
  defaultEndDate,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const { trigger, register } = useFormContext();

  const handleDayClick = (day: Date) => {
    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
      setValue(startDateName, day.toISOString());
      setValue(endDateName, '');
      trigger(startDateName);
      trigger(endDateName);
      return;
    }

    if (day < startDate) {
      setStartDate(day);
      setValue(startDateName, day.toISOString());
      trigger(startDateName);
      return;
    }

    setEndDate(day);
    setValue(endDateName, day.toISOString());
    trigger(endDateName);
    setIsOpen(false);
  };

  const handleDayMouseEnter = (day: Date) => {
    if (startDate && !endDate) {
      setHoverDate(day);
    }
  };
  const handleDayMouseLeave = () => setHoverDate(null);
  const handlePrevMonth = () => setCurrentDate(addMonths(currentDate, -1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const renderDays = () => {
    const daysInCurrentMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();

    const prevMonth = addMonths(currentDate, -1);
    const nextMonth = addMonths(currentDate, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    const prevMonthDays = Array.from(
      { length: firstDayOfMonth },
      (_, i) =>
        new Date(
          prevMonth.getFullYear(),
          prevMonth.getMonth(),
          daysInPrevMonth - firstDayOfMonth + i + 1,
        ),
    );

    const currentMonthDays = Array.from(
      { length: daysInCurrentMonth },
      (_, i) =>
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
    );

    const nextMonthDays = Array.from(
      { length: 42 - (prevMonthDays.length + currentMonthDays.length) },
      (_, i) => new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i + 1),
    );

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    const weeks = [];
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7));
    }

    return (
      <>
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="flex max-w-[560px] overflow-hidden rounded-full"
          >
            {week.map((day) => {
              const isSelected =
                isSameDay(day, startDate) || isSameDay(day, endDate);
              const isInRange =
                startDate &&
                ((endDate &&
                  isWithinInterval(day, { start: startDate, end: endDate })) ||
                  (!endDate &&
                    hoverDate &&
                    isWithinInterval(day, {
                      start: startDate,
                      end: hoverDate,
                    })));

              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              const isRangeStart = isSameDay(day, startDate);
              const isRangeEnd = isSameDay(day, endDate || hoverDate);

              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => handleDayMouseEnter(day)}
                  onMouseLeave={handleDayMouseLeave}
                  className={`relative w-11 lg:w-auto flex items-center justify-center text-sm font-medium lg:text-xl lg:px-5
                    ${isCurrentMonth && !isSelected && 'text-black-400'}
                    ${!isCurrentMonth && !isSelected && 'text-gray-100'}
                    ${
                      isInRange &&
                      `before:absolute before:h-7 lg:before:h-10 before:top-2/4 before:-translate-y-1/2 before:inset-0 before:bg-orange-50 before:-z-10
                      ${isRangeStart && 'before:rounded-l-full'}
                      ${isRangeEnd && 'before:rounded-r-full'}
                    `
                    }
                    group
                  `}
                >
                  <div
                    className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center
                    ${isSelected && 'bg-orange-300 text-gray-50'}
                    ${!isSelected && 'group-hover:bg-gray-100 group-hover:text-black-400 group-hover:rounded-full'}
                  `}
                  >
                    {day.getDate()}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  const updateCalendarPosition = () => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      const availableSpaceBelow = window.innerHeight - rect.bottom;
      const availableSpaceAbove = rect.top;
      const calendarHeight = 600;
      setIsOpenUp(
        availableSpaceAbove > availableSpaceBelow &&
          availableSpaceAbove >= calendarHeight,
      );
    }
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    updateCalendarPosition();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', updateCalendarPosition, true);
      window.addEventListener('resize', updateCalendarPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateCalendarPosition, true);
      window.removeEventListener('resize', updateCalendarPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    if (defaultStartDate) {
      setStartDate(new Date(defaultStartDate));
    }
    if (defaultEndDate) {
      setEndDate(new Date(defaultEndDate));
    }
  }, [defaultStartDate, defaultEndDate]);

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 w-full bg-background-200 rounded-lg font-regular text-lg lg:text-xl text-black-400 p-3.5 lg:py-4"
      >
        <Image
          src="/icons/calendar-fill.svg"
          width={24}
          height={24}
          alt="모집 기간"
          className="lg:w-9 lg:h-9"
        />
        {startDate && endDate ? (
          `${format(startDate, 'yyyy.MM.dd')} ~ ${format(endDate, 'yyyy.MM.dd')}`
        ) : (
          <span className="text-gray-400">시작일 ~ 종료일</span>
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute left-0 border-[0.5px] lg:w-[640px] bg-gray-50 rounded-lg shadow-md px-[9px] pb-4 lg:px-9 lg:pb-6 z-10 ${isOpenUp ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]'}`}
        >
          <div className="relative flex justify-between items-center py-3 px-3.5 lg:py-3 my-2 lg:mt-6 lg:mb-0">
            <button type="button" onClick={() => setIsOpen(false)}>
              <Image
                src="/icons/x.svg"
                width={24}
                height={24}
                alt="닫기"
                className="lg:w-9 lg:h-9"
              />
            </button>
            <h3 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-medium text-md lg:text-2lg ">
              기간 선택
            </h3>
          </div>
          <div className="flex justify-between items-center py-[11px] px-3.5 lg:py-3 mb-2">
            <button type="button" onClick={handlePrevMonth}>
              <Image
                src="/icons/chevron-right.svg"
                width={24}
                height={24}
                alt="이전달"
                className="lg:w-9 lg:h-9"
              />
            </button>
            <h3 className="font-semibold text-lg lg:text-xl">
              {format(currentDate, 'yyyy. MM')}
            </h3>
            <button type="button" onClick={handleNextMonth}>
              <Image
                src="/icons/chevron-left.svg"
                width={24}
                height={24}
                alt="다음달"
                className="lg:w-9 lg:h-9"
              />
            </button>
          </div>
          <div className="flex lg:justify-around max-w-[560px]">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="w-11 h-11 lg:w-16 lg:h-16 flex items-center justify-center text-center font-medium text-sm lg:text-xl text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3.5 lg:gap-6 pt-[7px] lg:pt-3">
            {renderDays()}
          </div>
        </div>
      )}
      <input
        className="hidden"
        {...register(startDateName, { required: 'Start date is required' })}
      />
      <input
        className="hidden"
        {...register(endDateName, { required: 'End date is required' })}
      />
    </div>
  );
};

export default DateRangePicker;
