'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';
import { UserRole, UserRoleLowerCase } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { EMAIL, PASSWORD, PASSWORD_CONFIRMATION, NAME } from '@/constants/form';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpFormSectionProps {
  userRole: UserRoleLowerCase;
  onSubmit: () => void;
}

const SignUpFormSection = ({ userRole, onSubmit }: SignUpFormSectionProps) => {
  const { signUp, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    watch,
  } = useForm<SignUpFormData>({ mode: 'onTouched' });

  const signUpSubmit: SubmitHandler<SignUpFormData> = async (data, event) => {
    event?.preventDefault();

    try {
      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
        role: UserRole[userRole],
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      window.alert('회원가입되었습니다!\n추가 정보를 등록합니다.');
      onSubmit();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;

      if (message?.includes('이메일')) setError('email', { message });
      else window.alert('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
    }
  };

  return (
    <section>
      <form
        method="post"
        onSubmit={handleSubmit(signUpSubmit)}
        className="flex flex-col"
      >
        <FormField
          name="email"
          label="이메일"
          placeholder={EMAIL.message.placeholder}
          register={register('email', {
            required: { value: true, message: EMAIL.message.required },
            maxLength: {
              value: EMAIL.format.maxLength,
              message: EMAIL.message.maxLength,
            },
            pattern: {
              value: EMAIL.format.regExp,
              message: EMAIL.message.pattern,
            },
          })}
          error={errors.email}
        />
        <FormField
          name="password"
          label="비밀번호"
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
        <FormField
          name="passwordConfirmation"
          label="비밀번호 확인"
          placeholder={PASSWORD_CONFIRMATION.message.placeholder}
          register={register('passwordConfirmation', {
            required: {
              value: true,
              message: PASSWORD_CONFIRMATION.message.required,
            },
            validate: {
              value: (value) =>
                value === watch('password') ||
                PASSWORD_CONFIRMATION.message.notEqual,
            },
          })}
          error={errors.passwordConfirmation}
        />
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
            pattern: {
              value: NAME.format.regExp,
              message: NAME.message.pattern,
            },
          })}
          error={errors.name}
        />
        <Button
          type="submit"
          content="다음"
          disabled={!isValid}
          className="mt-8 lg:mt-12"
        ></Button>
      </form>
    </section>
  );
};

export default SignUpFormSection;
