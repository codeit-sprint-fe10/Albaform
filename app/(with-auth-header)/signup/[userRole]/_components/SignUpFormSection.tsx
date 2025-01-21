'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { UserRole, UserRoleLowerCase } from '@/types/user';
import { EMAIL, PASSWORD, PASSWORD_CONFIRMATION, NAME } from '@/constants/form';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

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
  const [isFetching, setIsFetching] = useState(false);
  const { signUp, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    clearErrors,
  } = useForm<SignUpFormData>({ mode: 'onTouched' });

  const signUpSubmit: SubmitHandler<SignUpFormData> = async (data, event) => {
    setIsFetching(true);
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

      toast.success('회원가입되었습니다!\n추가 정보를 등록합니다.');
      onSubmit();
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;

      if (message?.includes('이메일')) setError('email', { message });
      else toast.error('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
    }
    setIsFetching(false);
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
          design="outlined"
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
            validate: {
              checkPasswordConfirm: (value, values) => {
                const confirm = values.passwordConfirmation;
                if (confirm) {
                  if (confirm !== value)
                    setError('passwordConfirmation', {
                      message: PASSWORD_CONFIRMATION.message.notEqual,
                    });
                  else clearErrors('passwordConfirmation');
                }
                return true;
              },
            },
          })}
          error={errors.password}
          design="outlined"
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
              isEqual: (value, values) =>
                value === values.password ||
                PASSWORD_CONFIRMATION.message.notEqual,
            },
          })}
          error={errors.passwordConfirmation}
          design="outlined"
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
          design="outlined"
        />
        <Button
          type="submit"
          content="다음"
          disabled={!isValid || isFetching}
          className="mt-8 lg:mt-12"
        ></Button>
        <span className="mt-4 lg:mt-6 text-center text-xs lg:text-lg text-black-100">
          {'가입 시 '}
          <Link
            href="https://sprint.codeit.kr"
            className="text-orange-300 hover:text-orange-200 font-semibold underline underline-offset-2 transition duration-200"
          >
            이용약관
          </Link>
          에 동의한 것으로 간주됩니다.
        </span>
      </form>
    </section>
  );
};

export default SignUpFormSection;
