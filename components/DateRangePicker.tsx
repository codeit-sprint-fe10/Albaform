'use client';

import { useState } from 'react';
import {
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isWithinInterval,
} from '@/utils/date';

type DateRangePickerProps = {
  onChange?: (range: { startDate: Date | null; endDate: Date | null }) => void;
};

const DateRangePicker = ({ onChange }: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDayClick = (day: Date) => {
    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
      onChange?.({
        startDate: day,
        endDate: null,
      });
      return;
    }

    if (day < startDate) {
      setStartDate(day);
      onChange?.({
        startDate: day,
        endDate: null,
      });
      return;
    }

    setEndDate(day);
    onChange?.({
      startDate: startDate && !endDate ? day : startDate,
      endDate: day,
    });
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
          <div key={weekIndex} className="flex overflow-hidden rounded-full">
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
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => handleDayMouseEnter(day)}
                  onMouseLeave={handleDayMouseLeave}
                  className={`relative w-11 lg:w-16 flex items-center justify-center text-sm font-medium lg:text-xl
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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 p-2 rounded-md w-full flex justify-between items-center"
      >
        {startDate && endDate
          ? `${format(startDate, 'yyyy.MM.dd')} ~ ${format(endDate, 'yyyy.MM.dd')}`
          : '시작일 ~ 종료일'}
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border shadow-md px-[9px] pb-4 lg:px-[14px] lg:pb-6 rounded-md z-10">
          <h3 className="text-center font-medium text-md lg:text-2lg py-3 px-[14px] lg:py-3 my-2 lg:mt-6 lg:mb-0">
            기간 선택
          </h3>
          <div className="flex justify-between items-center py-[11px] px-[14px] lg:py-3 mb-2">
            <button onClick={handlePrevMonth}>&lt;</button>
            <h3 className="font-semibold text-lg lg:text-xl">
              {format(currentDate, 'yyyy. MM')}
            </h3>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="flex">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="w-11 h-11 lg:w-16 lg:h-16 flex items-center justify-center text-center font-medium text-sm lg:text-xl text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[14px] lg:gap-6 pt-[7px] lg:pt-3">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
