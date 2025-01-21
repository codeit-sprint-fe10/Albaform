'use client';

import { Alba } from '@/types/alba';
import GoogleMap from '@/app/(with-main-header)/alba/[formId]/_components/GoogleMap';
import { toast } from 'react-toastify';

type LocationProps = Pick<Alba, 'location'>;

const Location = ({ location }: LocationProps) => {
  const {
    address,
    coordinates: { lat, lng },
  } = JSON.parse(location);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success('복사되었습니다!');
      })
      .catch((err) => {
        console.error('Clipboard copy failed: ', err);
      });
  };

  return (
    <section>
      <h3 className="py-4 font-semibold text-2lg lg:text-3xl">근무 지역</h3>
      <div className="text-md lg:text-2xl flex items-center gap-[30px]">
        <span className="font-medium text-black-400">{address}</span>
        <button
          className="font-bold tex  t-orange-300 whitespace-nowrap"
          onClick={handleCopy}
        >
          복사
        </button>
      </div>
      <div className="mt-4 lg:mt-12 w-full h-[210px]">
        <GoogleMap lat={Number(lat)} lng={Number(lng)} />
      </div>
    </section>
  );
};

export default Location;
