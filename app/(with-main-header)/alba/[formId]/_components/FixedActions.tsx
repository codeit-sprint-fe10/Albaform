'use client';

import { Alba } from '@/types/alba';
import Image from 'next/image';
import { postAlbaScrap } from '@/services/alba';
import { useState } from 'react';

type FixedActionsProps = Pick<Alba, 'id' | 'isScrapped'>;

const FixedActions = ({ id, isScrapped }: FixedActionsProps) => {
  const [isActiveScrapped, setIsActiveScrapped] = useState(isScrapped);

  const handleScrapClick = async () => {
    const result = await postAlbaScrap(id);
    setIsActiveScrapped(result);
    alert('스크랩성공!'); //TODO 토스트박스
  };

  return (
    <aside className="fixed bottom-10 right-4 flex flex-col">
      <button type="button" onClick={handleScrapClick} aria-label="스크랩하기">
        <Image
          src={`/icons/bookmark-circle-${isActiveScrapped ? 'active' : 'inactive'}.svg`}
          alt={'스크랩'}
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
      <button type="button" aria-label="공유하기">
        <Image
          src={`/icons/share-circle.svg`}
          alt={'공유하기'}
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
    </aside>
  );
};

export default FixedActions;
