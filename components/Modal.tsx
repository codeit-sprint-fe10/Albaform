'use client';

import React, { useEffect } from 'react';
import useDetectDevice from '@/hooks/useDetectDevice';
import Image from 'next/image';

interface ModalProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  title?: string;
  allowDimClose?: boolean;
  blurDim?: boolean;
  hasCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  dialogRef,
  title = '',
  allowDimClose = true,
  blurDim = false,
  hasCloseButton = true,
  onClose,
  children,
}: ModalProps) => {
  const { isMobile } = useDetectDevice();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // dialog는 기본적으로 esc onClose를 제공하지만 dim close가 되지 않을경우 esc close처리 제외
      if (event.key === 'Escape' && !allowDimClose) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={`${isMobile ? 'mt-auto mb-0 w-full max-w-[100%]' : ''} rounded-t-xl md:min-w-[350px] lg:min-w-[450px] md:rounded-xl bg-white shadow-3xl open:animate-slideIn open:backdrop:animate-fadeIn backdrop:bg-black-500 backdrop:bg-opacity-50 ${blurDim ? 'backdrop:backdrop-blur-sm' : ''}`}
      onClick={allowDimClose ? onClose : undefined}
    >
      <div
        className="p-6 lg:px-10 lg:py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <h3 className="font-semibold text-black-400 text-2lg lg:text-3xl">
            {title}
          </h3>
          {hasCloseButton && (
            <button
              className="absolute top-0 right-0 text-gray-500"
              onClick={onClose}
              aria-label="닫기"
            >
              <Image
                src="/icons/x.svg"
                width={24}
                height={24}
                alt=""
                className="lg:w-9 lg:h-9"
              />
            </button>
          )}
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
