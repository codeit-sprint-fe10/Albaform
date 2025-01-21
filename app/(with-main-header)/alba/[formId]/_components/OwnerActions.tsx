'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import DeleteAlbaModal from '@/app/(with-main-header)/alba/[formId]/_components/DeleteAlbaModal';
import EditIcon from '@/public/icons/edit.svg';

type OwnerActionsProps = {
  formId: number;
};

const OwnerActions = ({ formId }: OwnerActionsProps) => {
  const { push } = useRouter();
  const { dialogRef, openModal, closeModal } = useModal();

  const handleOnEdit = () => {
    push(`/alba/${formId}/edit`);
  };

  const handleOnDelete = () => {
    openModal();
  };

  return (
    <>
      <div className="font-semibold text-lg lg:text-xl flex lg:flex-col gap-2.5 lg:gap-4">
        <Button
          content={
            <>
              <EditIcon className="w-6 h-6 lg:w-9 lg:h-9 text-orange-50" />
              수정하기
            </>
          }
          onClick={handleOnEdit}
          className="order-2 lg:order-1"
        />
        <button
          className="order-1 rounded-lg bg-line-200 w-3/12 lg:w-full h-[58px] lg:h-[72px] flex items-center justify-center gap-1"
          onClick={handleOnDelete}
        >
          <Image
            src="/icons/trash-can.svg"
            alt="삭제하기"
            width={24}
            height={24}
            className="lg:w-9 lg:h-9"
          />
          <span className="hidden text-gray-300 text-xl font-semibold lg:inline">
            삭제하기
          </span>
        </button>
      </div>
      <DeleteAlbaModal
        formId={formId}
        dialogRef={dialogRef}
        closeModal={closeModal}
      />
    </>
  );
};

export default OwnerActions;
