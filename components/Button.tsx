import Image from 'next/image';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconUrl?: string;
  iconAlt?: string;
  content?: string | ReactNode;
  design?: 'solid' | 'outlined';
  disabled?: boolean;
  sizeClass?: string;
  className?: string;
}

const Button = ({
  type = 'button',
  onClick,
  iconUrl,
  iconAlt = '',
  content = '',
  design = 'solid',
  disabled = false,
  sizeClass = '',
  className = '',
}: ButtonProps) => {
  let buttonStyle =
    'flex flex-row items-center justify-center gap-1 rounded-lg ' +
    (sizeClass || 'w-full h-[58px] lg:h-[72px] rounded-lg text-lg lg:text-xl') +
    ' font-semibold transition duration-200 ';

  switch (design) {
    case 'solid':
      buttonStyle += disabled
        ? 'bg-gray-100 text-gray-50 '
        : 'bg-orange-300 hover:bg-orange-200 focus:bg-orange-200 text-gray-50 ';
      break;
    case 'outlined':
      buttonStyle += disabled
        ? 'border border-gray-100 text-gray-100 '
        : 'border border-orange-300 hover:border-orange-200 focus:border-orange-200 ' +
          'text-orange-300 hover:text-orange-200 focus:text-orange-200 ';
      break;
  }

  const iconStyle = 'w-6 h-6 md:w-9 md:h-9';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle + className}
    >
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={iconAlt}
          width={0}
          height={0}
          className={iconStyle}
        />
      )}
      {content}
    </button>
  );
};

export default Button;
