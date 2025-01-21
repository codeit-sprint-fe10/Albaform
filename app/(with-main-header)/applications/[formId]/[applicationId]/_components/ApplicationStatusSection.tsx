'use client';

import {
  applicationStatus,
  DEFAULT_APPLICATION_STATUS,
} from '@/types/application';
import { formatDateTimeWithLetters } from '@/utils/dateFormatter';
import InfoIcon from '@/public/icons/info.svg';
import CloseIcon from '@/public/icons/x-thin.svg';
import { useState } from 'react';
import UpdateApplicationStatusModal from '@/app/(with-main-header)/applications/[formId]/[applicationId]/_components/UpdateApplicationStatusModal';
import useModal from '@/hooks/useModal';
import EditIcon from '@/public/icons/edit.svg';
import useGetMyApplication from '@/app/(with-main-header)/myapply/[formId]/_hooks/useGetMyApplication';

const ApplicationStatusSection = ({
  formId,
  applicationId,
}: {
  formId: number;
  applicationId: number;
}) => {
  const { data } = useGetMyApplication(formId);

  const [showTooltip, setShowTooltip] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(
    data?.status || DEFAULT_APPLICATION_STATUS,
  ); // 상태변경 Modal에서 상태변경 api호출후 변경된값으로 리렌더링을 하기위해 사용

  const { dialogRef, openModal, closeModal } = useModal();

  if (!data) {
    return null;
  }

  return (
    <>
      <section className="font-regular text-md text-black-400 lg:text-xl lg:p-6 lg:bg-background-100 lg:rounded-lg lg:border lg:border-line-100">
        <p className="flex justify-between items-center py-4 border-b border-line-100">
          <span className="text-black-100">지원일시</span>
          <span>{formatDateTimeWithLetters(data.createdAt)}</span>
        </p>
        <p className="flex justify-between items-center py-4 border-b border-line-100 lg:border-none">
          <button onClick={openModal} className="flex items-center gap-1">
            <span className="text-black-100">진행상태</span>
            <EditIcon className="w-6 h-6 lg:w-9 lg:h-9 text-gray-100" />
          </button>
          <span>{applicationStatus[currentStatus]}</span>
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
        status={currentStatus}
        setStatus={setCurrentStatus}
      />
    </>
  );
};

export default ApplicationStatusSection;
