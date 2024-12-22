'use client';

import { Recruitment } from '@/types/recruitment';

type LocationProps = Pick<Recruitment, 'location'>;

const Location = ({ location }: LocationProps) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(location)
      .then(() => {
        alert('복사되었습니다!'); // TODO toast box
      })
      .catch((err) => {
        console.error('Clipboard copy failed: ', err);
      });
  };

  return (
    <section>
      <h3 className="py-[16px] font-semibold text-2lg lg:text-3xl">
        근무 지역
      </h3>
      <div className="text-md lg:text-2xl flex items-center gap-[30px]">
        <span className="font-medium text-black-400">{location}</span>
        <button
          className="font-bold text-orange-300 whitespace-nowrap"
          onClick={handleCopy}
        >
          복사
        </button>
      </div>
      <div className="mt-[16px] lg:mt-[48px]">지도영역</div>
    </section>
  );
};

export default Location;
