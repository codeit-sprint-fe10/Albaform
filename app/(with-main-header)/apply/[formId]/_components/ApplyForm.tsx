'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { usePostApplication } from '../_hooks/useTanstackQuery';
import { useTemporarySave } from '@/hooks/useTemporarySave';
import useModal from '@/hooks/useModal';
import {
  NAME,
  PHONE_NUMBER,
  EXPERIENCE_MONTHS,
  RESUME,
  INTRODUCTION,
  PASSWORD,
} from '@/constants/form';
import Button from '@/components/Button';
import FormField from '@/app/(with-auth-header)/_components/FormField';
import ApplyLoadModal from './ApplyLoadModal';

const defaultValues = {
  name: '',
  phoneNumber: '',
  experienceMonths: '',
  resumeId: '',
  resumeName: '',
  introduction: '',
  password: '',
} as const;

type ApplyFormFields = typeof defaultValues;

const ApplyForm = () => {
  const { dialogRef, openModal, closeModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const formId = Number(useParams()['formId']);
  const { replace } = useRouter();
  const { getData, saveData, clearData } = useTemporarySave<ApplyFormFields>();

  const methods = useForm<ApplyFormFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const { mutate, isPending } = usePostApplication();

  const formSubmit: SubmitHandler<ApplyFormFields> = async (data, event) => {
    event?.preventDefault();
    mutate(
      {
        formId: formId,
        body: {
          ...data,
          experienceMonths: Number(data.experienceMonths),
          resumeId: Number(data.resumeId),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['forms'] });
          clearData();
          window.alert('알바폼에 지원했습니다!');
          replace(`/myapply/${formId}`);
        },
        onError: () => {
          window.alert('지원 중에 오류가 발생했습니다.');
          saveData(methods.getValues());
          window.location.reload();
        },
      },
    );
  };

  const handleTempButtonClick = () => {
    saveData(methods.getValues());
    window.alert('지원서를 임시 저장했습니다.');
  };

  const handleModalClick = () => {
    const data = getData();
    if (data) methods.reset(data, { keepDefaultValues: true });
    closeModal();
  };

  useEffect(() => {
    if (!isModalOpen && !methods.formState.isDirty && getData()) {
      setIsModalOpen(true);
      openModal();
    }
  }, [isModalOpen, methods, getData, openModal]);

  return (
    <FormProvider {...methods}>
      <form
        method="post"
        onSubmit={methods.handleSubmit(formSubmit)}
        className="flex flex-col mb-8 lg:mb-12"
      >
        <FormField
          name="name"
          label="이름"
          placeholder={NAME.message.placeholder}
          register={methods.register('name', {
            required: { value: true, message: NAME.message.required },
            maxLength: {
              value: NAME.format.maxLength,
              message: NAME.message.maxLength,
            },
            pattern: {
              value: NAME.format.regExp,
              message: NAME.message.pattern,
            },
          })}
          error={methods.formState.errors.name}
          required
          design="solid"
        />
        <FormField
          name="phoneNumber"
          label="전화번호"
          placeholder={PHONE_NUMBER.message.placeholder}
          register={methods.register('phoneNumber', {
            required: { value: true, message: PHONE_NUMBER.message.required },
            minLength: {
              value: PHONE_NUMBER.format.minLength,
              message: PHONE_NUMBER.message.minLength,
            },
            maxLength: {
              value: PHONE_NUMBER.format.maxLength,
              message: PHONE_NUMBER.message.maxLength,
            },
            pattern: {
              value: PHONE_NUMBER.format.regExp,
              message: PHONE_NUMBER.message.pattern,
            },
          })}
          error={methods.formState.errors.phoneNumber}
          required
          design="solid"
        />
        <FormField
          name="experienceMonths"
          label="경력(개월 수)"
          placeholder={EXPERIENCE_MONTHS.message.placeholder}
          register={methods.register('experienceMonths', {
            required: {
              value: true,
              message: EXPERIENCE_MONTHS.message.required,
            },
            maxLength: {
              value: EXPERIENCE_MONTHS.format.maxLength,
              message: EXPERIENCE_MONTHS.message.maxLength,
            },
            pattern: {
              value: EXPERIENCE_MONTHS.format.regExp,
              message: EXPERIENCE_MONTHS.message.pattern,
            },
          })}
          error={methods.formState.errors.experienceMonths}
          required
          design="solid"
        />
        <FormField
          name="resumeId"
          label="이력서"
          placeholder={RESUME.message.placeholder}
          error={methods.formState.errors.resumeId}
          required
          design="solid"
        />
        <FormField
          name="introduction"
          label="자기소개"
          placeholder={INTRODUCTION.message.placeholder}
          register={methods.register('introduction', {
            required: {
              value: true,
              message: INTRODUCTION.message.required,
            },
            maxLength: {
              value: INTRODUCTION.format.maxLength,
              message: INTRODUCTION.message.maxLength,
            },
          })}
          error={methods.formState.errors.introduction}
          required
          design="solid"
        />
        <FormField
          name="password"
          label="비밀번호"
          comment="* 지원내역 확인에 사용됩니다."
          placeholder={PASSWORD.message.placeholder}
          register={methods.register('password', {
            required: { value: true, message: PASSWORD.message.required },
            minLength: {
              value: PASSWORD.format.minLength,
              message: PASSWORD.message.minLength,
            },
            maxLength: {
              value: PASSWORD.format.maxLength,
              message: PASSWORD.message.maxLength,
            },
            pattern: {
              value: PASSWORD.format.regExp,
              message: PASSWORD.message.pattern,
            },
          })}
          error={methods.formState.errors.password}
          required
          design="solid"
        />
        <div className="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-2 mt-4 lg:mt-8">
          <Button
            type="button"
            onClick={handleTempButtonClick}
            content="임시 저장"
            design="outlined"
            disabled={!methods.formState.isDirty || isPending}
          />
          <Button
            type="submit"
            content="작성 완료"
            design="solid"
            disabled={!methods.formState.isValid || isPending}
          />
        </div>
      </form>
      <ApplyLoadModal
        dialogRef={dialogRef}
        closeModal={closeModal}
        onClick={handleModalClick}
      />
    </FormProvider>
  );
};

export default ApplyForm;
