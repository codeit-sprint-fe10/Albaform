'use client';

import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { postImage } from '@/services/image';

interface FileInputProps {
  setValue: (name: 'imageUrl', value: string | null) => void;
  imageUrl?: string;
}

const FileInput = ({ setValue, imageUrl }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>();
  const allowedTypes = ['image/png', 'image/jpeg'];
  const name = 'imageUrl';

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) return;
      const newImage = await postImage(file);
      setPreview(newImage);
      setValue(name, newImage);
      console.log(newImage);
    }

    event.target.value = '';
  };

  const handleRemoveClick = () => {
    setPreview(null);
    setValue(name, null);
  };

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div>
      <div className="font-medium text-md lg:text-xl text-black-400 mb-4">
        이미지 첨부
      </div>
      <div className="flex gap-4 flex-wrap h-40 lg:h-60 ">
        {!preview && (
          <label htmlFor={name}>
            <div className="inline-flex flex-col gap-2 w-40 h-40 lg:w-60 lg:h-60 justify-center items-center bg-background-200 rounded-lg cursor-pointer p-7 lg:p-10">
              <Image
                src="/icons/upload.svg"
                alt="이미지 업로드"
                width={24}
                height={24}
                className="lg:w-9 lg:h-9"
              />
              <div className="text-md lg:text-lg text-gray-500">
                이미지 넣기
              </div>
            </div>
          </label>
        )}
        {preview && (
          <div className="relative">
            <Image
              src={preview}
              alt="미리보기"
              width={160}
              height={160}
              className="rounded-lg aspect-square lg:w-60 lg:h-60"
            />
            <button
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
              onClick={handleRemoveClick}
            >
              <Image
                src="/icons/x-circle.svg"
                alt="제거 버튼"
                width={24}
                height={24}
                className="lg:w-8 lg:h-8"
              />
            </button>
          </div>
        )}
      </div>
      <input
        className="hidden"
        type="file"
        id={name}
        name={name}
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
