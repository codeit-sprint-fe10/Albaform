import React from 'react';

export type UseModalReturnType = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  openModal: () => void;
  closeModal: () => void;
};

export type UseModalProps = Omit<UseModalReturnType, 'openModal'>;
