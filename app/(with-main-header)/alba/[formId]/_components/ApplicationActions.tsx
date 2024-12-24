import Link from 'next/link';
import Image from 'next/image';

type ApplicationActionsProps = {
  formId: number;
};

const ApplicationActions = ({ formId }: ApplicationActionsProps) => {
  return (
    <div className="font-semibold text-lg lg:text-xl flex flex-col gap-2.5 lg:gap-4">
      <Link
        href={`/apply/${formId}`}
        className="rounded-lg bg-orange-300 flex items-center justify-center gap-1.5 p-4 text-gray-50"
      >
        <Image
          src="/icons/writing.svg"
          alt=""
          width={24}
          height={24}
          className="lg:w-9 lg:h-9"
        />
        <span>지원하기</span>
      </Link>
      <Link
        href={`/myapply/${formId}`}
        className="rounded-lg flex items-center justify-center gap-1.5 p-4 text-orange-300 border border-orange-300"
      >
        <Image
          src="/icons/note.svg"
          alt=""
          width={24}
          height={24}
          className="lg:w-9 lg:h-9"
        />
        <span>내 지원 내역 보기</span>
      </Link>
    </div>
  );
};

export default ApplicationActions;
