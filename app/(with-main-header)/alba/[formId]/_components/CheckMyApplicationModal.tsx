'use client';

import Modal from '@/components/Modal';
import RecruitmentClosedIcon from '@/public/icons/recruitment-closed.svg';
import Button from '@/components/Button';
import type { UseModalProps } from '@/types/useModal';

const CheckMyApplicationModal = ({ dialogRef, closeModal }: UseModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="내 지원 내역 확인하기"
      hasCloseButton={true}
    >
      <section className="flex flex-col gap-6 m-auto">
        <div className="m-auto">
          <RecruitmentClosedIcon className="w-20 h-20 lg:w-[120px] lg:h-[120px]" />
        </div>
        <div className="text-center">
          <h3 className="text-black-400 text-2lg font-semibold lg:text-2xl">
            모집마감
          </h3>
          <p className="mt-2 lg:mt-4 text-gray-400 text-md font-regular lg:text-xl">
            모집이 종료된 알바폼입니다.
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default CheckMyApplicationModal;
