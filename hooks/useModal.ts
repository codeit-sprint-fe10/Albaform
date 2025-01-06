import { useRef } from 'react';

const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null!);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return {
    dialogRef,
    openModal,
    closeModal,
  };
};

export default useModal;
