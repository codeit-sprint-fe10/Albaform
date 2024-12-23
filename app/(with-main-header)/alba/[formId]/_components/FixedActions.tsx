import { Recruitment } from '@/types/recruitment';
import Image from 'next/image';

type FixedActionsProps = Pick<Recruitment, 'isScrapped'>;

const FixedActions = ({ isScrapped }: FixedActionsProps) => {
  return (
    <aside className="fixed bottom-10 right-4 flex flex-col">
      <button aria-label="스크랩하기">
        <div className="relative w-[54px] h-[54px] lg:w-[64px] lg:h-[64px]">
          <Image
            src={`/icons/bookmark-circle-${isScrapped ? 'active' : 'inactive'}.svg`}
            alt={'스크랩'}
            fill
          />
        </div>
      </button>
      <button aria-label="공유하기">
        <div className="relative w-[54px] h-[54px] lg:w-[64px] lg:h-[64px]">
          <Image src={`/icons/share-circle.svg`} alt={'공유하기'} fill />
        </div>
      </button>
    </aside>
  );
};

export default FixedActions;
