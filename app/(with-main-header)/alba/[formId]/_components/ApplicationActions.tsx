'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import CheckMyApplicationModal from '@/app/(with-main-header)/alba/[formId]/_components/CheckMyApplicationModal';
import { useUserStore } from '@/store/user';

type ApplicationActionsProps = {
  formId: number;
};

const ApplicationActions = ({ formId }: ApplicationActionsProps) => {
  const user = useUserStore((state) => state.user);
  const { push } = useRouter();

  const { dialogRef, openModal, closeModal } = useModal();

  const handleMyApplicationOnClick = () => {
    if (user) {
      push(`/myapply/${formId}`);
    } else {
      openModal();
    }
  };

  return (
    <div className="font-semibold text-lg lg:text-xl flex flex-col gap-2.5 lg:gap-4">
      <Link
        href={`/apply/${formId}`}
        className="rounded-lg bg-orange-300 flex items-center justify-center gap-1.5 p-4 text-gray-50"
      >
        <Image
          src="/icons/writing.svg"
          alt=""
          width={24}
          height={24}
          className="lg:w-9 lg:h-9"
        />
        <span>지원하기</span>
      </Link>
      <Button
        onClick={handleMyApplicationOnClick}
        content="내 지원 내역 보기"
        iconUrl="/icons/note.svg"
        design="outlined"
      />
      <CheckMyApplicationModal
        dialogRef={dialogRef}
        closeModal={closeModal}
        formId={formId}
      />
    </div>
  );
};

export default ApplicationActions;
