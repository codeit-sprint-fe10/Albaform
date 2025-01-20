'use client';

import Modal from '@/components/Modal';
import { UseModalProps } from '@/types/useModal';
import {
  applicationStatus,
  ApplicationStatusType,
  DEFAULT_APPLICATION_STATUS,
} from '@/types/application';
import RadioIcon from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/RadioIcon';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { patchApplicationStatus } from '@/services/application';
import { toast } from 'react-toastify';

interface UpdateApplicationStatusProps extends UseModalProps {
  applicationId: number;
  status?: ApplicationStatusType;
  setStatus: (value: ApplicationStatusType) => void;
}

const UpdateApplicationStatusModal = ({
  dialogRef,
  closeModal,
  applicationId,
  status = DEFAULT_APPLICATION_STATUS,
  setStatus,
}: UpdateApplicationStatusProps) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      status,
    },
  });

  const selectedStatus = watch('status');

  const onSubmit = async (data: { status: ApplicationStatusType }) => {
    try {
      const toBeStatus = data.status;
      await patchApplicationStatus({ applicationId, status: toBeStatus });
      setStatus(toBeStatus);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('상태 변경에 실패했습니다.');
    }
  };

  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="진행상태 선택"
      hasCloseButton={false}
    >
      <p className="text-center text-gray-400 font-regular text-md lg:text-xl mt-2 mb-6 lg:mt-4 lg:mb-12">
        현재 진행상태를 알려주세요.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 font-medium text-black-400 text-md lg:text-2lg">
          {Object.entries(applicationStatus).map(([key, label]) => {
            const isSelected = selectedStatus === key;
            return (
              <label
                key={key}
                className={`p-3.5 flex justify-between items-center border rounded-lg cursor-pointer transition-all duration-300 ${isSelected ? 'border-orange-300 bg-orange-50' : 'border-line-100'}`}
              >
                <span>{label}</span>
                <input
                  {...register('status')}
                  type="radio"
                  value={key}
                  checked={selectedStatus === key}
                  className="hidden"
                />
                <RadioIcon isSelected={isSelected} />
              </label>
            );
          })}
        </div>
        <div className="flex justify-between gap-1 mt-8">
          <button
            type="button"
            className="bg-gray-100 rounded-lg font-semibold text-lg lg:text-xl text-gray-50 w-full"
            onClick={closeModal}
          >
            취소
          </button>
          <Button type="submit" content="선택하기" />
        </div>
      </form>
    </Modal>
  );
};

export default UpdateApplicationStatusModal;
