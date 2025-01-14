'use client';

import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';
import ProfileForm from './form/ProfileForm';
import { useUserStore } from '@/store/user';

const ProfileModal = ({ dialogRef, closeModal }: UseModalProps) => {
  const user = useUserStore((state) => state.user);

  if (!user) return;
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="프로필 수정"
      hasCloseButton={false}
    >
      <ProfileForm closeModal={closeModal} user={user} />
    </Modal>
  );
};

export default ProfileModal;
