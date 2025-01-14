'use client';

import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { patchPassword } from '@/services/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PASSWORD, PASSWORD_CONFIRMATION } from '@/constants/form';
import FormField from '@/app/(with-auth-header)/_components/FormField';
import Button from '@/components/Button';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

interface PasswordFormProps {
  closeModal: () => void;
}

const PasswordForm = ({ closeModal }: PasswordFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: patchPassword,
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    watch,
  } = useForm<PasswordFormData>({ mode: 'onTouched' });

  const signUpSubmit: SubmitHandler<PasswordFormData> = async (data, event) => {
    event?.preventDefault();

    try {
      await mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      window.alert('비밀번호가 변경되었습니다!');
      closeModal();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;

      if (message?.includes('현재')) setError('currentPassword', { message });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(signUpSubmit)}
      className="flex flex-col md:w-[312px] lg:w-[640px] mt-8 lg:mt-12"
    >
      <FormField
        name="currentPassword"
        label="현재 비밀번호"
        placeholder="현재 비밀번호를 입력해 주세요."
        register={register('currentPassword', {
          required: { value: true, message: PASSWORD.message.required },
          minLength: {
            value: PASSWORD.format.minLength,
            message: PASSWORD.message.minLength,
          },
        })}
        error={errors.currentPassword}
        design="outlined"
      />
      <FormField
        name="newPassword"
        label="새 비밀번호"
        placeholder="새로운 비밀번호를 입력해 주세요."
        register={register('newPassword', {
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
          validate: {
            value: (value) =>
              value !== watch('currentPassword') ||
              '기존 비밀번호와 다른 값을 입력해 주세요.',
          },
        })}
        error={errors.newPassword}
        design="outlined"
      />
      <FormField
        name="passwordConfirmation"
        label="새 비밀번호 확인"
        placeholder="새로운 비밀번호를 한 번 더 입력해 주세요."
        register={register('passwordConfirmation', {
          required: {
            value: true,
            message: PASSWORD_CONFIRMATION.message.required,
          },
          validate: {
            value: (value) =>
              value === watch('newPassword') ||
              PASSWORD_CONFIRMATION.message.notEqual,
          },
        })}
        error={errors.passwordConfirmation}
        design="outlined"
      />
      <div className="flex gap-3 mt-6 lg:mt-8">
        <Button onClick={() => closeModal()} content="취소" design="outlined" />
        <Button
          type="submit"
          content="변경하기"
          disabled={!isValid || isPending}
        />
      </div>
    </form>
  );
};

export default PasswordForm;
