import Image from 'next/image';
import useDeleteScrap from '../../_hooks/useDeleteScrap';

const Private = ({ id }: { id: number }) => {
  const { mutate: deleteMutation, isPending } = useDeleteScrap(id);
  const handleDelete = () => {
    deleteMutation();
  };
  return (
    <div className="absolute top-0 left-0 z-20 flex flex-col justify-center items-center w-full h-full backdrop-blur-sm bg-black-400/50 rounded-xl lg:rounded-2xl">
      <Image src="/icons/private.svg" width={80} height={80} alt="비공개" />
      <div className="flex flex-col gap-2 items-center">
        <div className="text-md text-gray-50">비공개 처리된 알바폼이에요</div>
        <button
          className="w-[100px] text-md text-gray-50 bg-gray-500 rounded-2xl hover:bg-orange-50 hover:text-gray-500"
          onClick={!isPending ? handleDelete : undefined}
          disabled={isPending}
        >
          스크랩 취소
        </button>
      </div>
    </div>
  );
};

export default Private;
