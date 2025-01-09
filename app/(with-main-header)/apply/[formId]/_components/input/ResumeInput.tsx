'use client';

import { useState, useEffect, InputHTMLAttributes, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import { usePostResume } from '../../_hook/useTanstackQuery';
import { RESUME } from '@/constants/form';
import {
  CustomSetValue,
  CustomSetError,
  CustomClearErrors,
} from '@/types/form';
import UploadIcon from '@/public/icons/upload.svg';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';

const availableType = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

interface ResumeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue: CustomSetValue<'resumeId' | 'resumeName'>;
  setError: CustomSetError<'resumeId' | 'resumeName'>;
  clearErrors: CustomClearErrors<'resumeId' | 'resumeName'>;
}

const ResumeInput = ({
  setValue,
  setError,
  clearErrors,
  ...props
}: ResumeInputProps) => {
  const {
    formState: { isDirty },
    getValues,
  } = useFormContext();
  const [name, setName] = useState('');
  const { mutateAsync, isPending } = usePostResume();

  const resetResume = () => {
    setValue('resumeId', '', { shouldDirty: true });
    setValue('resumeName', '', { shouldDirty: true });
    setName('');
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      resetResume();
      setError('resumeId', {
        type: 'custom',
        message: RESUME.message.required,
      });
      return;
    }

    if (!availableType.includes(file.type)) {
      resetResume();
      setError('resumeId', {
        type: 'custom',
        message: RESUME.message.extension,
      });
      return;
    }

    try {
      const { resumeId } = await mutateAsync({ file });

      setName(file.name);
      setValue('resumeId', resumeId.toString(), { shouldDirty: true });
      setValue('resumeName', file.name, { shouldDirty: true });
      clearErrors('resumeId');
    } catch (error) {
      const e = error as AxiosError<{ message: string }>;
      const message = e.response ? e.response.data.message : e.message;

      resetResume();
      setError('resumeId', {
        type: 'custom',
        message: message.includes('형식')
          ? RESUME.message.extension
          : RESUME.message.error,
      });
      return;
    }
  };

  const handleRemoveClick = () => {
    resetResume();
    setError('resumeId', {
      type: 'custom',
      message: RESUME.message.required,
    });
  };

  useEffect(() => {
    if (isDirty) setName(getValues('resumeName'));
  }, [isDirty, setName, getValues]);

  return (
    <div className="relative">
      <input
        name="resumeName"
        type="text"
        value={name}
        placeholder={props.placeholder}
        readOnly
        disabled
        className={props.className}
      />
      <label htmlFor="resumeId" className="absolute inset-0 cursor-pointer" />
      <input
        id="resumeId"
        name="resumeId"
        type="file"
        accept=".pdf, .doc, .docx"
        onChange={handleInputChange}
        disabled={isPending}
        className="sr-only"
      />
      {name ? (
        <button
          type="button"
          onClick={handleRemoveClick}
          className="absolute top-[calc(50%-12px)] lg:top-[calc(50%-18px)] right-[14px]"
        >
          <Image
            src="/icons/x-circle.svg"
            width={24}
            height={24}
            alt="이력서 제거하기"
            className="lg:w-9 lg:h-9"
          />
        </button>
      ) : (
        <label
          htmlFor="resumeId"
          className="absolute top-[calc(50%-12px)] lg:top-[calc(50%-18px)] right-[14px] cursor-pointer"
        >
          <UploadIcon
            aria-label="이력서 제출하기"
            color="#999999"
            className="w-6 lg:w-9 h-6 lg:h-9"
          />
        </label>
      )}
    </div>
  );
};

export default ResumeInput;
