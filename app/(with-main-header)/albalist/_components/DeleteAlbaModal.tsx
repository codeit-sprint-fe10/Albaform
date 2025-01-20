'use client';

import { useQueryClient } from '@tanstack/react-query';
import { deleteAlba } from '@/services/alba';
import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import DeleteAlbaModalIcon from '@/public/icons/delete-alba.svg';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface DeleteModalProps extends UseModalProps {
  formId: number;
}

const DeleteModal = ({ dialogRef, closeModal, formId }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  const handleDeleteClick = async () => {
    try {
      await deleteAlba(formId);
      await queryClient.invalidateQueries({ queryKey: ['forms'] });
      toast.success('알바폼을 삭제하였습니다.');
    } catch {
      toast.error('오류가 발생했습니다.');
      replace(window.location.pathname);
      document.location.reload();
    }
  };

  return (
    <Modal dialogRef={dialogRef} onClose={closeModal} hasCloseButton={false}>
      <section className="flex flex-col gap-6">
        <div className="m-auto">
          <DeleteAlbaModalIcon className="w-20 h-20 lg:w-[120px] lg:h-[120px]" />
        </div>
        <div className="text-center">
          <h3 className="text-black-400 text-2lg font-semibold lg:text-2xl">
            알바폼을 삭제할까요?
          </h3>
          <p className="mt-2 lg:mt-4 text-gray-400 text-md font-regular lg:text-xl">
            삭제 후 정보를 복구할 수 없어요.
          </p>
        </div>
        <div>
          <Button onClick={handleDeleteClick} content="삭제하기" />
          <Button
            onClick={closeModal}
            content="다음에 할게요"
            design="outlined"
            className="border-none"
          />
        </div>
      </section>
    </Modal>
  );
};

export default DeleteModal;
