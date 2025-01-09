'use client';

import { Alba } from '@/types/alba';
import Image from 'next/image';
import { deleteAlbaScrap, postAlbaScrap } from '@/services/alba';
import { useState } from 'react';

type FloatingActionsProps = Pick<Alba, 'id' | 'isScrapped'>;

const FloatingActions = ({ id, isScrapped }: FloatingActionsProps) => {
  const [isActiveScrapped, setIsActiveScrapped] = useState(isScrapped);

  const handleScrapClick = async () => {
    try {
      const result = isActiveScrapped
        ? await deleteAlbaScrap(id)
        : await postAlbaScrap(id);
      setIsActiveScrapped(result);
      alert(`스크랩 ${result ? '저장' : '삭제'} 성공!`);
    } catch (error) {
      console.error(error);
      alert('스크랩 요청 실패');
    }
  };

  return (
    <aside className="fixed bottom-10 right-4 flex flex-col z-10">
      <button type="button" onClick={handleScrapClick} aria-label="스크랩하기">
        <Image
          src={`/icons/bookmark-circle-${isActiveScrapped ? 'active' : 'inactive'}.svg`}
          alt=""
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
      <button type="button" aria-label="공유하기">
        <Image
          src={`/icons/share-circle.svg`}
          alt=""
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
    </aside>
  );
};

export default FloatingActions;
