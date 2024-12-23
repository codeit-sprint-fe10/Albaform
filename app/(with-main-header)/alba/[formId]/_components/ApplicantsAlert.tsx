'use client';

import IconUser from '@/public/icons/user.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ApplicantsAlertProps = {
  count: number;
};

const ApplicantsAlert = ({ count }: ApplicantsAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`flex items-center justify-between gap-[8px] px-[24px] py-[12px] rounded-[14px] bg-gradient-to-t from-black/20 to-black/20 bg-[rgba(42,44,61,0.90)] transition-all duration-500 ease-out ${!isVisible ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'}`}
    >
      <IconUser className="fill-gray-50" />
      <p className="flex-1 text-gray-50 font-medium text-sm lg:text-xl">
        현재 <span className="text-orange-300">{count}명</span>이 지원했어요!
      </p>
      <button onClick={handleClick}>
        <div className="relative w-[24px] lg:w-[36px] h-[24px] lg:h-[36px]">
          <Image src="/icons/x-thin.svg" alt="닫기 버튼" fill />
        </div>
      </button>
    </div>
  );
};

export default ApplicantsAlert;
