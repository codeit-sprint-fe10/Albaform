'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserRole } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import VisibilityInput from '../../_components/VisibilityInput';
import Button from '@/components/Button';

interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpFormSection = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { signUp } = useAuth();
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
        role: pathname.includes('applicant')
          ? UserRole.APPLICANT
          : UserRole.OWNER,
      });

      window.alert('회원가입되었습니다!\n로그인 페이지로 이동합니다.');
      replace(pathname.replace('signup', 'signin'));
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;
      if (message?.includes('이메일')) setError('email', { message });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(signUpSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        id="email"
        placeholder="이메일을 입력해 주세요."
        {...register('email', {
          required: { value: true, message: '이메일은 필수 입력입니다.' },
          maxLength: { value: 20, message: '이메일은 최대 20자 이하입니다.' },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '이메일 형식으로 작성해 주세요.',
          },
        })}
      />
      <span>{errors.email?.message}</span>
      <label htmlFor="password">비밀번호</label>
      <VisibilityInput
        id="password"
        placeholder="비밀번호를 입력해 주세요."
        {...register('password', {
          required: { value: true, message: '비밀번호는 필수 입력입니다.' },
          minLength: { value: 8, message: '비밀번호는 최소 8자 이상입니다.' },
          maxLength: { value: 20, message: '비밀번호는 최대 20자 이하입니다.' },
          pattern: {
            value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
            message: '비밀번호는 영문, 숫자, 허용된 특수문자만 가능합니다.',
          },
        })}
      />
      <span>{errors.password?.message}</span>
      <label htmlFor="passwordConfirmation">비밀번호 확인</label>
      <VisibilityInput
        id="passwordConfirmation"
        placeholder="비밀번호를 한 번 더 입력해 주세요."
        {...register('passwordConfirmation', {
          required: {
            value: true,
            message: '비밀번호 확인은 필수 입력입니다.',
          },
          validate: {
            value: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          },
        })}
      />
      <span>{errors.passwordConfirmation?.message}</span>
      <Button type="submit" content="다음" disabled={!isValid}></Button>
    </form>
  );
};

export default SignUpFormSection;
