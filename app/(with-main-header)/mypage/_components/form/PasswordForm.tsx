'use client';

import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { patchPassword } from '@/services/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  PASSWORD,
  PASSWORD_EDIT,
  PASSWORD_CONFIRMATION,
} from '@/constants/form';
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
    clearErrors,
    reset,
  } = useForm<PasswordFormData>({ mode: 'onTouched' });

  const signUpSubmit: SubmitHandler<PasswordFormData> = async (data, event) => {
    event?.preventDefault();

    try {
      await mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
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
        placeholder={PASSWORD_EDIT.message.currentPlaceholder}
        register={register('currentPassword', {
          required: { value: true, message: PASSWORD.message.required },
          minLength: {
            value: PASSWORD.format.minLength,
            message: PASSWORD.message.minLength,
          },
          validate: {
            checkNewPassword: (value, values) => {
              const newPassword = values.newPassword;
              if (newPassword) {
                if (newPassword === value)
                  setError('newPassword', {
                    message: PASSWORD_EDIT.message.equal,
                  });
                else clearErrors('newPassword');
              }
              return true;
            },
          },
        })}
        error={errors.currentPassword}
        design="outlined"
      />
      <FormField
        name="newPassword"
        label="새 비밀번호"
        placeholder={PASSWORD_EDIT.message.newPlaceholder}
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
            checkPasswordConfirm: (value, values) => {
              const passwordConfirmation = values.passwordConfirmation;
              if (passwordConfirmation) {
                if (passwordConfirmation !== value)
                  setError('passwordConfirmation', {
                    message: PASSWORD_CONFIRMATION.message.notEqual,
                  });
                else clearErrors('passwordConfirmation');
              }
              return true;
            },

            isNotEqual: (value, values) =>
              value !== values.currentPassword || PASSWORD_EDIT.message.equal,
          },
        })}
        error={errors.newPassword}
        design="outlined"
      />
      <FormField
        name="passwordConfirmation"
        label="새 비밀번호 확인"
        placeholder={PASSWORD_EDIT.message.confirmationPlaceholder}
        register={register('passwordConfirmation', {
          required: {
            value: true,
            message: PASSWORD_CONFIRMATION.message.required,
          },
          validate: {
            isEqual: (value, values) =>
              value === values.newPassword ||
              PASSWORD_CONFIRMATION.message.notEqual,
          },
        })}
        error={errors.passwordConfirmation}
        design="outlined"
      />
      <div className="flex gap-3 mt-6 lg:mt-8">
        <Button
          onClick={() => {
            reset();
            closeModal();
          }}
          content="취소"
          design="outlined"
        />
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
