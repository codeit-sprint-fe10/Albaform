'use client';

import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal';
import { useEffect } from 'react';
import Image from 'next/image';

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
      allowDimClose={true}
      blurDim={true}
      hasCloseButton={false}
    >
      <Image
        src={'/icons/recruitment-closed.png'}
        alt="모집마감 이미지"
        width={80}
        height={80}
        className="lg:w-[120px] lg:h-[120px]"
      />
      <h3 className="text-black-400 text-2lg font-semibold lg:text-2xl">
        모집마감
      </h3>
      <p className="text-gray-400 text-md font-regular lg:text-xl">
        모집이 종료된 알바폼입니다.
      </p>
    </Modal>
  );
};

export default RecruitmentClosedModal;
