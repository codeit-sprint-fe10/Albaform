import { type FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

type PrivateInputFieldProps = {
  name: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const PrivateInputField = ({
  name,
  placeholder,
  register,
  error,
}: PrivateInputFieldProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <label htmlFor={name}>{name}</label>
      <input
        type={visible ? 'text' : 'password'}
        id={name}
        placeholder={placeholder}
        {...register}
      />
      <button
        type="button"
        onClick={handleClick}
        className="absolute top-[calc(50%-12px)] right-[14px]"
      >
        <Image
          src={`/icons/visibility-${visible ? 'on' : 'off'}.svg`}
          alt={visible ? '내용 가리기' : '내용 보이기'}
          width={24}
          height={24}
        />
      </button>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default PrivateInputField;
