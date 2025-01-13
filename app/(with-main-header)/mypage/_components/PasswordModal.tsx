import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';

const PasswordModal = ({ dialogRef, closeModal }: UseModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="비밀번호 변경"
      hasCloseButton={false}
    >
      비밀번호 변경
    </Modal>
  );
};

export default PasswordModal;
