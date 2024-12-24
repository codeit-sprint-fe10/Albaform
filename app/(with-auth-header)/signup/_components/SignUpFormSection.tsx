'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { postSignUp } from '@/services/auth';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/types/user';

interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpFormSection = () => {
  const userRole = usePathname().includes('applicant')
    ? UserRole.APPLICANT
    : UserRole.OWNER;

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    watch,
  } = useForm<SignUpFormData>({ mode: 'onTouched' });

  const signUpSubmit: SubmitHandler<SignUpFormData> = async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;

    try {
      const postSignUpBody = {
        email: data.email,
        password: data.password,
        role: userRole,
      };
      await postSignUp(postSignUpBody);
    } catch {
      setError('email', {
        message: '이메일 혹은 비밀번호를 확인해 주세요.',
      });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(signUpSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        id="email"
        placeholder="이메일 입력"
        {...register('email', {
          required: { value: true, message: '이메일은 필수 입력입니다.' },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '이메일 형식으로 작성해 주세요.',
          },
        })}
      />
      <span>{errors.email?.message}</span>
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호 입력"
        {...register('password', {
          required: { value: true, message: '비밀번호는 필수 입력입니다.' },
        })}
      />
      <span>{errors.password?.message}</span>
      <label htmlFor="passwordConfirmation">비밀번호</label>
      <input
        type="password"
        id="passwordConfirmation"
        placeholder="비밀번호 확인"
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
      <button type="submit">다음</button>
    </form>
  );
};

export default SignUpFormSection;
