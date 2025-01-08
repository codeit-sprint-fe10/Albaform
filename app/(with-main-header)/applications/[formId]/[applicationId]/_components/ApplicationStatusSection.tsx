'use client';

import { Application, applicationStatus } from '@/types/application';
import { formatDateTimeWithLetters } from '@/utils/dateFormatter';
import InfoIcon from '@/public/icons/info.svg';
import CloseIcon from '@/public/icons/x-thin.svg';
import { useState } from 'react';
import UpdateApplicationStatusModal from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/UpdateApplicationStatusModal';
import useModal from '@/hooks/useModal';
import EditIcon from '@/public/icons/edit.svg';

type ApplicationStatusSectionProps = Pick<
  Application,
  'id' | 'createdAt' | 'status'
>;

const ApplicationStatusSection = ({
  id: applicationId,
  createdAt,
  status,
}: ApplicationStatusSectionProps) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const { dialogRef, openModal, closeModal } = useModal();

  return (
    <>
      <section className="font-regular text-md text-black-400 lg:text-xl lg:p-6 lg:bg-background-100 lg:rounded-lg lg:border lg:border-line-100">
        <p className="flex justify-between items-center py-4 border-b border-line-100">
          <span className="text-black-100">지원일시</span>
          <span>{formatDateTimeWithLetters(createdAt)}</span>
        </p>
        <p className="flex justify-between items-center py-4 border-b border-line-100 lg:border-none">
          <button onClick={openModal} className="flex items-center gap-1">
            <span className="text-black-100">진행상태</span>
            <EditIcon className="w-6 h-6 lg:w-9 lg:h-9 text-gray-100" />
          </button>
          <span>{applicationStatus[status]}</span>
        </p>
      </section>
      <div
        className={`relative px-3 lg:px-6 py-2 lg:py-4 w-72 lg:w-[476px] bg-blue-200 flex items-center gap-2 rounded-xl font-semibold text-gray-50 text-2sm lg:text-xl before:content-[''] before:absolute before:bottom-full before:left-1/4 before:border-8 before:border-solid before:border-b-blue-200 before:border-gray-50 transition-opacity duration-500 ease-out transform ${
          showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <InfoIcon className="w-6 h-6 lg:w-9 lg:h-9" />
        <p className="flex-1">알바폼 현재 진행상태를 변경할 수 있어요!</p>
        <button aria-label="닫기" onClick={() => setShowTooltip(false)}>
          <CloseIcon className="w-6 h-6 lg:w-9 lg:h-9" />
        </button>
      </div>
      <UpdateApplicationStatusModal
        applicationId={applicationId}
        dialogRef={dialogRef}
        closeModal={closeModal}
      />
    </>
  );
};

export default ApplicationStatusSection;
