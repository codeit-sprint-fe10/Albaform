'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';

interface LocationInputProps {
  setValue: (name: 'location', value: string) => void;
}

const LocationInput = ({ setValue }: LocationInputProps) => {
  const [address, setAddress] = useState<string>('');
  const name = 'location';

  const handleClick = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        const extraAddress = data.bname ? ` (${data.bname})` : '';
        const detailedAddress = `${fullAddress}${extraAddress}`;
        setAddress(detailedAddress);
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(fullAddress, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const { x: lng, y: lat } = result[0];
            const location = JSON.stringify({
              address: detailedAddress,
              coordinates: { lat, lng },
            });
            setValue(name, location);
          }
        });
      },
    }).open();
  };

  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {});
    }
  });

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />
      <label
        className="block font-medium text-md lg:text-xl text-black-300 mb-3"
        htmlFor={name}
      >
        근무 위치<span className="text-orange-300 pl-[2px]">*</span>
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          className="w-full font-regular text-lg lg:text-xl bg-background-200 text-black-400 placeholder:text-gray-400 rounded-lg py-[14px] lg:py-4 pl-12 lg:pl-[68px] pr-4 cursor-pointer "
          placeholder="위치를 입력해주세요."
          value={address}
          onClick={handleClick}
          readOnly
        />
        <Image
          src="/icons/stroke.svg"
          width={24}
          height={24}
          alt="마커"
          className="absolute top-1/2 left-4 -translate-y-1/2 lg:w-9 lg:h-9 lg:left-6"
        />
      </div>
    </>
  );
};

export default LocationInput;
