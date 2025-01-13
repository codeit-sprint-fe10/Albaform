import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';

const ProfileModal = ({ dialogRef, closeModal }: UseModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="프로필 수정"
      hasCloseButton={false}
    >
      프로필 수정
    </Modal>
  );
};

export default ProfileModal;
