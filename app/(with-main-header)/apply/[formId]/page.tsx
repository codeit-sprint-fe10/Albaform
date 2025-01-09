'use client';

import { useTemporarySave } from '@/hooks/useTemporarySave';
import { useRouter } from 'next/navigation';
import ApplyForm from './_components/ApplyForm';

const ApplyPage = () => {
  const { clearData } = useTemporarySave();
  const { back } = useRouter();

  const handleButtonClick = () => {
    window.alert('지원서 작성을 취소했습니다.');
    clearData();
    back();
  };

  return (
    <section className="w-[min(100%,360px)] lg:w-[640px] mx-auto">
      <div className="flex items-center justify-between h-20 lg:h-32">
        <h1 className="text-xl lg:text-3xl font-semibold text-black-500">
          알바폼 지원하기
        </h1>
        <button
          type="button"
          onClick={handleButtonClick}
          className={
            'w-20 lg:w-32 h-10 lg:h-14 rounded-lg bg-gray-100 ' +
            'text-lg lg:text-xl font-semibold text-gray-50'
          }
        >
          작성 취소
        </button>
      </div>
      <ApplyForm />
    </section>
  );
};

export default ApplyPage;
