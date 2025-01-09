import { type FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

type PrivateInputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const PrivateInputField = ({
  id,
  label,
  placeholder,
  register,
  error,
}: PrivateInputFieldProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 font-regular text-md lg:text-lg">
      <label htmlFor={id} className="text-black-400">
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          {...register}
          className="w-full text-gray-400 p-3 bg-background-200 rounded-lg"
        />
        <button
          type="button"
          onClick={handleClick}
          className="absolute top-1/2 transform -translate-y-1/2 right-5"
        >
          <Image
            src={`/icons/visibility-${visible ? 'on' : 'off'}.svg`}
            alt={visible ? '내용 가리기' : '내용 보이기'}
            width={24}
            height={24}
          />
        </button>
      </div>
      {error && <span className="text-error ml-2">{error.message}</span>}
    </div>
  );
};

export default PrivateInputField;
