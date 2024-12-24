import { Recruitment } from '@/types/recruitment';
import Image from 'next/image';

type FixedActionsProps = Pick<Recruitment, 'isScrapped'>;

const FixedActions = ({ isScrapped }: FixedActionsProps) => {
  return (
    <aside className="fixed bottom-10 right-4 flex flex-col">
      <button aria-label="스크랩하기">
        <Image
          src={`/icons/bookmark-circle-${isScrapped ? 'active' : 'inactive'}.svg`}
          alt={'스크랩'}
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
      <button aria-label="공유하기">
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
