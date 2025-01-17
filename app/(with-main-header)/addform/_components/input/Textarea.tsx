'use client';

import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Textarea = ({ name, className, register, ...props }: TextareaProps) => {
  return (
    <div className="bg-background-200 rounded-lg p-3.5 lg:py-[18px] focus-within:ring-2 focus-within:ring-orange-300">
      <textarea
        id={name}
        className={`block w-full font-regular text-lg lg:text-xl bg-[inherit] text-black-400 placeholder:text-gray-400 resize-none custom-scrollbar custom-style focus:outline-none ${className}`}
        {...props}
        {...register}
      />
    </div>
  );
};

export default Textarea;
