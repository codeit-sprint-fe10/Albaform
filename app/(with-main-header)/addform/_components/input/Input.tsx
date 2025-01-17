'use client';

import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

const Input = ({
  name,
  type = 'text',
  children,
  className,
  register,
  ...props
}: PropsWithChildren<InputProps>) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        className={`w-full font-regular text-lg lg:text-xl bg-background-200 text-black-400 placeholder:text-gray-400 rounded-lg ${className} outline-none focus:ring-2 focus:ring-orange-300`}
        {...props}
        {...register}
      />
      {children}
    </div>
  );
};

export default Input;
