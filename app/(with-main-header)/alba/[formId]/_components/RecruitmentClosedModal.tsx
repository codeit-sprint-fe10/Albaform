'use client';

import useModal from '@/hooks/useModal';
import Modal from '@/components/Modal';
import { useEffect } from 'react';
import RecruitmentClosedIcon from '@/public/icons/recruitment-closed.svg';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const RecruitmentClosedModal = () => {
  const { dialogRef, openModal, closeModal } = useModal();
  const { push } = useRouter();

  useEffect(() => {
    openModal();
  }, []);

  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      allowDimClose={false}
      blurDim={true}
      hasCloseButton={false}
    >
      <section className="flex flex-col gap-6">
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
        <div>
          <Button content="홈으로 가기" onClick={() => push('/')} />
        </div>
      </section>
    </Modal>
  );
};

export default RecruitmentClosedModal;
