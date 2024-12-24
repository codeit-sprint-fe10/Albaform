'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import VisibilityInput from '../../_components/VisibilityInput';

type SignInFormData = Pick<User, 'email' | 'password'>;

const SignInFormSection = () => {
  const { replace } = useRouter();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<SignInFormData>({ mode: 'onTouched' });

  const signInSubmit: SubmitHandler<SignInFormData> = async (data, event) => {
    event?.preventDefault();

    try {
      await signIn(data);

      window.alert('로그인되었습니다!\n랜딩 페이지로 이동합니다.');
      replace('/');
    } catch {
      setError('email', {
        message: '이메일 혹은 비밀번호를 확인해 주세요.',
      });
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit(signInSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        id="email"
        placeholder="이메일을 입력해 주세요."
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
      <VisibilityInput
        id="password"
        placeholder="비밀번호를 입력해 주세요."
        {...register('password', {
          required: { value: true, message: '비밀번호는 필수 입력입니다.' },
        })}
      />
      <span>{errors.password?.message}</span>
      <button type="submit" disabled={!isValid}>
        로그인
      </button>
    </form>
  );
};

export default SignInFormSection;
