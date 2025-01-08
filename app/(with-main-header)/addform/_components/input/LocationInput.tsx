'use client';

import { useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import Input from './Input';

interface LocationInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const LocationInput = ({ name, value = '', onChange }: LocationInputProps) => {
  const [address, setAddress] = useState(
    value ? JSON.parse(value).address : '',
  );
  const { trigger } = useFormContext();
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
            onChange(location);
            trigger(name);
          }
        });
      },
    }).open();
  };

  return (
    <div>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="lazyOnload"
        onLoad={() => kakao.maps.load(() => {})}
      />
      <Input
        name={name}
        placeholder="위치를 입력해주세요."
        value={address}
        className="py-[14px] lg:py-4 pl-12 lg:pl-[68px] pr-4 cursor-pointer"
        onClick={handleClick}
        readOnly
      >
        <Image
          src="/icons/stroke.svg"
          width={24}
          height={24}
          alt="마커"
          className="absolute top-1/2 left-4 -translate-y-1/2 lg:w-9 lg:h-9 lg:left-6"
        />
      </Input>
    </div>
  );
};

export default LocationInput;
