'use client';

import Modal from '@/components/Modal';
import { UseModalProps } from '@/types/useModal';
import { useState } from 'react';
import { applicationStatus } from '@/types/application';
import RadioIcon from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/RadioIcon';
import Button from '@/components/Button';

interface UpdateAlbaStatusModalProps extends UseModalProps {
  applicationId: number;
}

const UpdateAlbaStatusModal = ({
  dialogRef,
  closeModal,
  applicationId,
}: UpdateAlbaStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] =
    useState<string>('INTERVIEW_PENDING');

  const handleChange = (value: string) => {
    setSelectedStatus(value);
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
      <div className="flex flex-col gap-2 font-medium text-black-400 text-md lg:text-2lg">
        {Object.entries(applicationStatus).map(([key, label]) => {
          const isSelected = selectedStatus === key;
          return (
            <label
              key={key}
              className={`p-3.5 flex justify-between items-center border rounded-lg cursor-pointer transition-all duration-300 ${isSelected ? 'border-orange-300 bg-orange-50' : 'border-line-100'} `}
              onClick={() => handleChange(key)}
            >
              <span>{label}</span>
              <input
                type="radio"
                name="albaStatus"
                value={key}
                checked={isSelected}
                onChange={() => handleChange(key)}
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
        <Button content="선택하기" />
      </div>
    </Modal>
  );
};

export default UpdateAlbaStatusModal;
