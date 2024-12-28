import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconUrl?: string;
  iconAlt?: string;
  content?: string;
  design?: 'solid' | 'outlined';
  disabled?: boolean;
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
  className = '',
}: ButtonProps) => {
  let buttonStyle =
    'flex flex-row items-center justify-center gap-1 ' +
    'w-full h-[58px] md:h-[72px] rounded-lg ' +
    'text-lg md:text-xl font-semibold ';

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
