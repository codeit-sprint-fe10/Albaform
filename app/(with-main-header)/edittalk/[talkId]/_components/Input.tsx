'use client';

import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Input = ({
  name,
  children,
  className,
  register,
  ...props
}: PropsWithChildren<InputProps>) => {
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        className={`w-full font-regular text-md lg:text-lg bg-background-200 text-black-400 placeholder:text-gray-400 rounded-lg ${className}`}
        {...props}
        {...register}
      />
      {children}
    </div>
  );
};

export default Input;
