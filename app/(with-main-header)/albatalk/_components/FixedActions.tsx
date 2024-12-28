import Image from 'next/image';
import Link from 'next/link';

const FixedActions = () => {
  return (
    <Link href={'/addtalk'}>
      <aside className="w-[54px] h-[54px] lg:w-[64px] lg:h-[64px] fixed bottom-10 right-10 flex flex-col  bg-orange-300 rounded-full justify-center items-center shadow-FAB">
        <button aria-label="공유하기">
          <div className="relative w-6 h-6 lg:w-9 lg:h-9">
            <Image src={`/icons/edit.svg`} alt={'공유하기'} fill />
          </div>
        </button>
      </aside>
    </Link>
  );
};

export default FixedActions;
