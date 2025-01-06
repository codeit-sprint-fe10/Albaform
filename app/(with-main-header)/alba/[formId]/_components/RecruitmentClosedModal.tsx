'use client';

import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal';
import { useEffect } from 'react';

type RecruitmentClosedModalProps = {
  formId?: number;
};

const RecruitmentClosedModal = ({}: RecruitmentClosedModalProps) => {
  const { dialogRef, openModal, closeModal } = useModal();

  useEffect(() => {
    openModal();
  });

  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      allowDimClose={false}
      hasCloseButton={false}
    >
      <h3 className="text-xl font-semibold">모집마감</h3>
      <p className="mt-2 text-gray-600">
        This is a modal using the &lt;dialog&gt; tag.
      </p>
    </Modal>
  );
};

export default RecruitmentClosedModal;
