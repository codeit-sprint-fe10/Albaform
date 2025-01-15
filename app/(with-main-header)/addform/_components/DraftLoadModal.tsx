import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { UseModalProps } from '@/types/useModal';
import Image from 'next/image';

interface DraftLoadModalProps extends UseModalProps {
  onClick: VoidFunction;
}

const DraftLoadModal = ({
  dialogRef,
  closeModal,
  onClick,
}: DraftLoadModalProps) => {
  return (
    <Modal dialogRef={dialogRef} onClose={closeModal} hasCloseButton={true}>
      <section className="flex flex-col gap-6">
        <div className="m-auto">
          <Image
            src="/icons/draft-load.svg"
            width={80}
            height={80}
            className="lg:w-[120px] lg:h-[120px]"
            alt="임시저장 로드"
          />
        </div>
        <div className="text-center mt-2">
          <h3 className="text-black-400 text-2lg font-semibold lg:text-2xl">
            작성 중인 알바폼이 있어요!
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

export default DraftLoadModal;
