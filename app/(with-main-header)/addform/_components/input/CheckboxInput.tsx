'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxInputProps {
  label: string;
  register?: UseFormRegisterReturn;
  className?: string;
}

const CheckboxInput = ({ label, register, className }: CheckboxInputProps) => {
  return (
    <div className={`group select-none ${className}`}>
      <label className="inline-flex items-center gap-2.5 py-2 px-2.5 lg:py-4 lg:px-3.5 cursor-pointer">
        <input type="checkbox" className="hidden peer" {...register} />
        <div className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px] rounded-[4px] border border-gray-200 peer-checked:bg-orange-300 peer-checked:border-orange-300 flex items-center justify-center">
          <span className="text-gray-50 text-xs hidden group-[:has(.peer:checked)]:block ">
            ✔
          </span>
        </div>
        <span className="font-medium text-md lg:text-xl text-black-400 ">
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckboxInput;
