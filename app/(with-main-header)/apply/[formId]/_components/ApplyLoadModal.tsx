import Image from 'next/image';
import { UseModalProps } from '@/types/useModal';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

interface ApplyLoadModalProps extends UseModalProps {
  onClick: VoidFunction;
}

const ApplyLoadModal = ({
  dialogRef,
  closeModal,
  onClick,
}: ApplyLoadModalProps) => {
  return (
    <Modal dialogRef={dialogRef} onClose={closeModal} hasCloseButton={true}>
      <section className="flex flex-col gap-6">
        <Image
          src="/icons/draft-load.svg"
          width={80}
          height={80}
          className="lg:w-[120px] lg:h-[120px] mx-auto"
          alt=""
        />
        <div className="text-center mt-2">
          <h3 className="text-black-400 text-2lg font-semibold lg:text-2xl">
            작성 중인 지원서가 있어요!
          </h3>
          <p className="mt-2 lg:mt-4 text-gray-400 text-md font-regular lg:text-xl">
            이어서 작성하시겠어요?
          </p>
        </div>
        <Button content="이어쓰기" onClick={onClick} />
      </section>
    </Modal>
  );
};

export default ApplyLoadModal;
