import Link from 'next/link';
import Image from 'next/image';

type ApplicationActionsProps = {
  formId: number;
};

const ApplicationActions = ({ formId }: ApplicationActionsProps) => {
  return (
    <div className="font-semibold text-lg lg:text-xl flex flex-col gap-[10px] lg:gap-[16px]">
      <Link
        href={`/apply/${formId}`}
        className="rounded-lg bg-orange-300 flex items-center justify-center gap-[5px] p-[16px] text-gray-50"
      >
        <div className="relative w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]">
          <Image src="/icons/writing.svg" alt="" fill />
        </div>
        <span>지원하기</span>
      </Link>
      <Link
        href={`/myapply/${formId}`}
        className="rounded-lg flex items-center justify-center gap-[5px] p-[16px] text-orange-300 border border-orange-300"
      >
        <div className="relative w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]">
          <Image src="/icons/note.svg" alt="" fill />
        </div>
        <span>내 지원 내역 보기</span>
      </Link>
    </div>
  );
};

export default ApplicationActions;
