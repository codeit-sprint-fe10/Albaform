'use client';

import Modal from '@/components/Modal';
import { UseModalProps } from '@/types/useModal';
import { useState } from 'react';
import { applicationStatus } from '@/types/application';
import RadioIcon from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/RadioIcon';

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
      <p>현재 진행상태를 알려주세요.</p>
      <div>
        {Object.entries(applicationStatus).map(([key, label]) => {
          const isSelected = selectedStatus === key;

          return (
            <label
              key={key}
              className="flex justify-between items-center px-4 py-3 border-b border-gray-300 cursor-pointer"
              onClick={() => handleChange(key)}
            >
              <span className="text-gray-800 text-sm md:text-base">
                {label}
              </span>
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
    </Modal>
  );
};

export default UpdateAlbaStatusModal;
