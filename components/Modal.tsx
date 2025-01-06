'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  allowDimClose?: boolean;
  hasCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({
  dialogRef,
  allowDimClose = true,
  hasCloseButton = true,
  onClose,
  children,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-xl bg-white shadow-3xl open:animate-slideIn open:backdrop:animate-fadeIn backdrop:bg-black-500 backdrop:bg-opacity-50 "
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
