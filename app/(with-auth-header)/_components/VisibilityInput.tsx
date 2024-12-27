'use client';

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import Image from 'next/image';

type VisibilityInputProps = InputHTMLAttributes<HTMLInputElement>;

const VisibilityInput = (props: VisibilityInputProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleButtonClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <input type={visible ? 'text' : 'password'} {...props} />
      <button
        type="button"
        onClick={handleButtonClick}
        className="absolute top-[calc(50%-12px)] right-[14px]"
      >
        <Image
          src={`/icons/visibility-${visible ? 'on' : 'off'}.svg`}
          alt={visible ? '내용 가리기' : '내용 보이기'}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default VisibilityInput;
