'use client';

import { useEffect } from 'react';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { postImage } from '@/services/image';

interface FileInputProps {
  setValue: (name: 'imageUrls', value: string[]) => void;
  imageUrls: string[];
}

const FileInput = ({ setValue, imageUrls }: FileInputProps) => {
  const [previews, setPreviews] = useState<string[]>(imageUrls);
  const allowedTypes = ['image/png', 'image/jpeg'];
  const name = 'imageUrls';

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) return;
      const newImage = await postImage(file);
      const newImages = [...previews, newImage];
      setPreviews(newImages);
      setValue(name, newImages);
    }

    event.target.value = '';
  };

  const handleRemoveClick = (targetPreview: string) => {
    const newImages = previews.filter((preview) => preview !== targetPreview);
    setPreviews(newImages);
    setValue(name, newImages);
  };

  useEffect(() => {
    if (imageUrls) {
      setPreviews(imageUrls);
    }
  }, [imageUrls]);

  return (
    <div>
      <h3 className="font-medium text-md lg:text-xl text-black-400 mb-4">
        이미지 첨부
      </h3>
      <div className="flex gap-4 flex-wrap">
        <label htmlFor={name}>
          <div className="inline-flex justify-center items-center bg-background-200 rounded-lg cursor-pointer p-7 lg:p-10">
            <Image
              src="/icons/upload.svg"
              alt="이미지 업로드"
              width={24}
              height={24}
              className="lg:w-9 lg:h-9"
            />
          </div>
        </label>
        {previews.map((preview) => {
          return (
            <div key={preview} className="relative">
              <Image
                src={preview}
                alt="미리보기"
                width={80}
                height={80}
                className="rounded-lg aspect-square lg:w-[116px] lg:h-[116px]"
              />
              <button
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                onClick={() => handleRemoveClick(preview)}
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
          );
        })}
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
