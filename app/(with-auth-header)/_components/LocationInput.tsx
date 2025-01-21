'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { CustomFieldName } from '@/types/form';
import { LOCATION } from '@/constants/form';

interface LocationInputProps {
  placeholder: string;
  className: string;
}

const LocationInput = ({ placeholder, className }: LocationInputProps) => {
  const { setValue, setError, clearErrors, getValues } =
    useFormContext<Record<CustomFieldName, string>>();
  const location = getValues('location');
  const [address, setAddress] = useState('');

  const handleInputClick = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        try {
          const fullAddress = data.address;
          const extraAddress = data.bname ? ` ${data.bname}` : '';
          const detailedAddress = `${fullAddress}${extraAddress}`;
          setAddress(detailedAddress);

          const geocoder = new kakao.maps.services.Geocoder();
          geocoder.addressSearch(fullAddress, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              const locationValue = JSON.stringify({
                address: detailedAddress,
                coordinates: { lat: result[0].y, lng: result[0].x },
              });
              setValue('location', locationValue);
            }
          });
          clearErrors('location');
        } catch (error) {
          console.dir(error);
          setError('location', {
            type: 'custom',
            message: LOCATION.message.error,
          });
        }
      },
    }).open();
  };

  const handleInputBlur = () => {
    if (!address)
      setError('location', {
        type: 'custom',
        message: LOCATION.message.required,
      });
  };

  useEffect(() => {
    if (location) setAddress(JSON.parse(location).address);
  }, [location]);

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <Script
        src={
          `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}` +
          `&libraries=services&autoload=false`
        }
        strategy="lazyOnload"
        onLoad={() => kakao.maps.load(() => {})}
      />
      <div className="relative mb-1">
        <input
          type="text"
          id="location"
          name="location"
          value={address}
          placeholder={placeholder}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          readOnly
          required
          className={`${className} cursor-pointer indent-5 lg:indent-9`}
        />
        <label
          htmlFor="location"
          className={
            'absolute top-[calc(50%-12px)] lg:top-[calc(50%-18px)] ' +
            'left-2 lg:left-[10px] cursor-pointer'
          }
        >
          <Image
            src="/icons/pin-solid.svg"
            width={24}
            height={24}
            alt=""
            className="lg:w-9 lg:h-9"
          />
        </label>
      </div>
    </>
  );
};

export default LocationInput;
