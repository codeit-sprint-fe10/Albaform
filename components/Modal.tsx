'use client';

import React, { useEffect } from 'react';
import useDetectDevice from '@/hooks/useDetectDevice';

interface ModalProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  allowDimClose?: boolean;
  blurDim?: boolean;
  hasCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  dialogRef,
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
      className={`${isMobile ? 'mt-auto mb-0 w-full max-w-[100%]' : ''} rounded-t-xl md:rounded-xl bg-white shadow-3xl open:animate-slideIn open:backdrop:animate-fadeIn backdrop:bg-black-500 backdrop:bg-opacity-50 ${blurDim ? 'backdrop:backdrop-blur-sm' : ''}`}
      onClick={allowDimClose ? onClose : undefined}
    >
      <div className="p-6" onClick={(e) => e.stopPropagation()}>
        {hasCloseButton && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ×
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
