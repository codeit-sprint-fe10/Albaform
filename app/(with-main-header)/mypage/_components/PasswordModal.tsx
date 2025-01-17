import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';
import PasswordForm from './form/PasswordForm';

const PasswordModal = ({ dialogRef, closeModal }: UseModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="비밀번호 변경"
      hasCloseButton={false}
      allowDimClose={false}
    >
      <PasswordForm closeModal={closeModal} />
    </Modal>
  );
};

export default PasswordModal;
