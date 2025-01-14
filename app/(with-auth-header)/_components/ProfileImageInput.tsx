'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { postImage } from '@/services/image';
import { useMutation } from '@tanstack/react-query';

const allowedTypes = ['image/png', 'image/jpeg'];

const ProfileImageInput = () => {
  const { setValue } = useFormContext();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const { mutateAsync, isPending } = useMutation({ mutationFn: postImage });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) return;
      const newImageUrl = await mutateAsync(file);
      setImageUrl(newImageUrl);
      setValue('imageUrl', newImageUrl);
    }

    event.target.value = '';
  };

  const handleRemoveClick = () => {
    setImageUrl(null);
    setValue('imageUrl', null);
  };

  return (
    <div className="relative m-auto">
      <label
        htmlFor="imageUrl"
        className={
          'block relative w-20 h-20 lg:w-[100px] lg:h-[100px] rounded-full ' +
          'border-[3px] border-line-100 bg-line-100 cursor-pointer'
        }
      >
        <Image
          src={imageUrl ? imageUrl : '/icons/profile.svg'}
          alt="프로필 이미지"
          fill
          className="rounded-full"
        />
      </label>
      {imageUrl ? (
        <button
          onClick={handleRemoveClick}
          className={
            'absolute right-0 bottom-0 flex items-center justify-center w-6 h-6 ' +
            'lg:w-9 lg:h-9 rounded-full border-2 border-gray-50 bg-background-300'
          }
        >
          <Image
            src="/icons/x.svg"
            alt="이미지 제거하기"
            width={19}
            height={19}
            className="lg:w-7 lg:h-7"
          />
        </button>
      ) : (
        <label
          htmlFor="imageUrl"
          className={
            'absolute right-0 bottom-0 flex items-center justify-center w-6 h-6 ' +
            'lg:w-9 lg:h-9 rounded-full border-2 border-gray-50 bg-background-300 cursor-pointer'
          }
        >
          <Image
            src="/icons/edit.svg"
            alt="이미지 등록하기"
            width={19}
            height={19}
            className="lg:w-7 lg:h-7"
          />
        </label>
      )}
      <input
        className="hidden"
        type="file"
        id="imageUrl"
        name="imageUrl"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        disabled={isPending}
      />
    </div>
  );
};

export default ProfileImageInput;
