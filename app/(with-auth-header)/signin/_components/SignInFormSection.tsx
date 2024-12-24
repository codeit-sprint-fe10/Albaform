'use client';

import axios from 'axios';
import { postSignIn } from '@/services/auth';
import { useUserStore } from '@/store/user';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInFormSection = () => {
  const setUser = useUserStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<SignInFormData>({ mode: 'onTouched' });

  const signInSubmit: SubmitHandler<SignInFormData> = async (data, event) => {
    event?.preventDefault();
    if (!isValid) return;

    try {
      const { user, accessToken, refreshToken } = await postSignIn(data);
      await axios.post('/api/auth', {
        accessToken,
        refreshToken,
        userRole: user.role,
      });
      setUser(user);
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
      <button type="submit">로그인</button>
    </form>
  );
};

export default SignInFormSection;
