'use client';

import { useRouter } from 'next/navigation';
import { getApplications } from '@/services/application';
import { postAlbaScrap } from '@/services/alba';
import { useUserStore } from '@/store/user';
import useModal from '@/hooks/useModal';
import {
  MENU_OWNER_OPTIONS,
  MENU_APPLICANT_OPTIONS,
} from '@/constants/dropdown';
import Dropdown, { Option } from './Dropdown';
import DeleteAlbaModal from '../DeleteAlbaModal';
import { useQueryClient } from '@tanstack/react-query';

const MenuDropdown = ({ albaId }: { albaId: number }) => {
  const queryClient = useQueryClient();
  const { isGuest, isOwner } = useUserStore((state) => state);
  const { dialogRef, openModal, closeModal } = useModal();
  const { push } = useRouter();

  const handleDropdownSelect = async (option: Option) => {
    switch (option.key) {
      case 'apply':
        push(`/apply/${albaId}`);
        break;
      case 'scrap':
        try {
          await postAlbaScrap(albaId);
          queryClient.invalidateQueries({ queryKey: ['forms'] });
          alert(`알바폼을 스크랩하였습니다.`);
        } catch {
          alert('이미 스크랩한 알바폼입니다.');
        }
        break;
      case 'modify':
        try {
          await getApplications({ formId: albaId, params: { limit: 1 } });
          push(`/alba/${albaId}/edit`);
        } catch {
          alert('본인의 알바폼만 수정 가능합니다.');
        }
        break;
      case 'delete':
        try {
          await getApplications({ formId: albaId, params: { limit: 1 } });
          openModal();
        } catch {
          alert('본인의 알바폼만 삭제 가능합니다.');
        }
        break;
    }
  };

  if (isGuest !== false) return;
  return (
    <>
      <Dropdown
        type="menu"
        options={isOwner ? MENU_OWNER_OPTIONS : MENU_APPLICANT_OPTIONS}
        onSelect={handleDropdownSelect}
      />
      {isOwner && (
        <DeleteAlbaModal
          formId={albaId}
          dialogRef={dialogRef}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default MenuDropdown;
