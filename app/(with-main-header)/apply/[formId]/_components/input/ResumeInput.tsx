'use client';

import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useState, ChangeEvent, InputHTMLAttributes, useEffect } from 'react';
import { postResume } from '@/services/file';
import { RESUME } from '@/constants/form';
import {
  CustomSetValue,
  CustomSetError,
  CustomClearErrors,
} from '@/types/form';
import UploadIcon from '@/public/icons/upload.svg';
import RemoveIcon from '@/public/icons/x-circle.svg';
import { useFormContext } from 'react-hook-form';

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
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postResume,
  });

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
          className="absolute top-[calc(50%-12px)] right-[14px]"
        >
          <RemoveIcon
            aria-label="이력서 제거하기"
            className="w-6 lg:w-9 h-6 lg:h-9"
          />
        </button>
      ) : (
        <label
          htmlFor="resumeId"
          className="absolute top-[calc(50%-12px)] right-[14px] cursor-pointer"
        >
          <UploadIcon
            aria-label="이력서 제출하기"
            className="w-6 lg:w-9 h-6 lg:h-9"
          />
        </label>
      )}
    </div>
  );
};

export default ResumeInput;
