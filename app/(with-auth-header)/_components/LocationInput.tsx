'use client';

import { InputHTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { LOCATION } from '@/constants/form';

interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (name: 'location', value: string) => void;
  setError: (
    name: 'location',
    error: { type: string; message: string },
  ) => void;
  clearErrors: (name: 'location') => void;
}

const LocationInput = ({
  setValue,
  setError,
  clearErrors,
  ...props
}: LocationInputProps) => {
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

  useEffect(() => {
    if (kakao.maps) {
      kakao.maps.load(() => {});
    }
  }, []);

  return (
    <div className="relative mb-1">
      <input
        type="text"
        id="location"
        name="location"
        value={address}
        onClick={handleInputClick}
        readOnly
        required
        {...props}
      />
      <Image
        src="/icons/pin-solid.svg"
        width={0}
        height={0}
        alt=""
        className={
          'absolute top-[calc(50%-12px)] lg:top-[calc(50%-18px)] left-[14px] ' +
          'w-6 lg:w-9 h-6 lg:h-9'
        }
      />
    </div>
  );
};

export default LocationInput;
