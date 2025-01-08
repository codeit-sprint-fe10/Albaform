import Modal from '@/components/Modal';
import { UseModalProps } from '@/types/useModal';

interface UpdateAlbaStatusModalProps extends UseModalProps {
  applicationId: number;
}

const UpdateAlbaStatusModal = ({
  dialogRef,
  closeModal,
  applicationId,
}: UpdateAlbaStatusModalProps) => {
  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="진행상태 선택"
      hasCloseButton={false}
    >
      <p>현재 진행상태를 알려주세요.</p>
    </Modal>
  );
};

export default UpdateAlbaStatusModal;
