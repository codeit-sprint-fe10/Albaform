'use client';

import Modal from '@/components/Modal';
import type { UseModalProps } from '@/types/useModal';

const CheckMyApplicationModal = ({ dialogRef, closeModal }: UseModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="내 지원 내역 확인하기"
      hasCloseButton={true}
    >
      <section></section>
    </Modal>
  );
};

export default CheckMyApplicationModal;
