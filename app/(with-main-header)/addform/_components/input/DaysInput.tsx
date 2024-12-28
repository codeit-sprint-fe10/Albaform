'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DaysInput = ({ register }: { register: UseFormRegisterReturn }) => {
  return (
    <div className="flex gap-2.5 lg:gap-[18px]">
      {WEEKDAYS.map((day) => {
        return (
          <div key={day}>
            <input
              type="checkbox"
              id={day}
              value={day}
              className="hidden peer"
              {...register}
            />
            <label
              htmlFor={day}
              className="block font-regular lg:font-semibold text-lg lg:text-xl text-gray-500 peer-checked:text-gray-50 bg-background-200 peer-checked:bg-orange-300 rounded-xl lg:rounded-2xl p-3 lg:p-4 cursor-pointer"
            >
              {day}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default DaysInput;
