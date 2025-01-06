'use client';

import Button from '@/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from './input/FormField';
import {
  EXPERIENCE_MONTHS,
  INTRODUCTION,
  NAME,
  PASSWORD,
  PHONE_NUMBER,
  RESUME,
} from '@/constants/form';
import { useParams, useRouter } from 'next/navigation';
import { useTemporarySave } from '@/hooks/useTemporarySave';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postApplication } from '@/services/application';
import { AxiosError } from 'axios';

type ApplyFormData = Record<
  | 'name'
  | 'phoneNumber'
  | 'experienceMonths'
  | 'resumeId'
  | 'resumeName'
  | 'introduction'
  | 'password',
  string
>;

const ApplyForm = () => {
  const { formId } = useParams();
  const { replace } = useRouter();
  const { getData, saveData, clearData } = useTemporarySave<ApplyFormData>();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { isValid, errors, isDirty },
  } = useForm<ApplyFormData>({ mode: 'onTouched' });

  const { mutate, isPending } = useMutation({
    mutationFn: postApplication,
    onSuccess: () => {
      clearData();
      window.alert('알바폼에 지원했습니다!');
      replace(`/myapply/${formId}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      window.alert('지원 중에 오류가 발생했습니다.');
      console.dir(error);
      window.location.reload();
    },
  });

  const formSubmit: SubmitHandler<ApplyFormData> = async (data, event) => {
    event?.preventDefault();
    const experienceMonths = Number(data.experienceMonths);
    const resumeId = Number(data.resumeId);

    mutate({
      formId: Number(formId),
      body: { ...data, experienceMonths, resumeId },
    });
  };

  const handleTempButtonClick = () => {
    saveData(getValues());
    window.alert('지원서를 임시 저장했습니다.');
    console.log(errors);
  };

  useEffect(() => {
    const data = getData();
    if (data) reset(data, { keepDefaultValues: true });
  }, [getData, reset]);

  return (
    <form
      method="post"
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col"
    >
      <FormField
        name="name"
        label="이름"
        placeholder={NAME.message.placeholder}
        register={register('name', {
          required: { value: true, message: NAME.message.required },
          maxLength: {
            value: NAME.format.maxLength,
            message: NAME.message.maxLength,
          },
          pattern: { value: NAME.format.regExp, message: NAME.message.pattern },
        })}
        error={errors.name}
      />
      <FormField
        name="phoneNumber"
        label="전화번호"
        placeholder={PHONE_NUMBER.message.placeholder}
        register={register('phoneNumber', {
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
        error={errors.phoneNumber}
      />
      <FormField
        name="experienceMonths"
        label="경력(개월 수)"
        placeholder={EXPERIENCE_MONTHS.message.placeholder}
        register={register('experienceMonths', {
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
        error={errors.experienceMonths}
      />
      <FormField
        name="password"
        label="비밀번호"
        comment="* 지원내역 확인에 사용됩니다."
        placeholder={PASSWORD.message.placeholder}
        register={register('password', {
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
        error={errors.password}
      />
      <div className="grid grid-rows-2 lg:grid-cols-2 gap-2 mt-4 lg:mt-8">
        <Button
          type="button"
          onClick={handleTempButtonClick}
          content="임시 저장"
          design="outlined"
          disabled={!isDirty}
        />
        <Button
          type="submit"
          content="작성 완료"
          design="solid"
          disabled={!isValid || isPending}
        />
      </div>
    </form>
  );
};

export default ApplyForm;
