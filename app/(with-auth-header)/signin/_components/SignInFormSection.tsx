'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import VisibilityInput from '../../_components/VisibilityInput';
import Button from '@/components/Button';
import { em, pw } from '@/constants/form';

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
        placeholder={em.msg.placeholder}
        {...register('email', {
          required: { value: true, message: em.msg.required },
          pattern: {
            value: em.fmt.regExp,
            message: em.msg.pattern,
          },
        })}
      />
      <span>{errors.email?.message}</span>
      <label htmlFor="password">비밀번호</label>
      <VisibilityInput
        id="password"
        placeholder={pw.msg.placeholder}
        {...register('password', {
          required: { value: true, message: pw.msg.required },
          minLength: { value: pw.fmt.minLength, message: pw.msg.minLength },
        })}
      />
      <span>{errors.password?.message}</span>
      <Button type="submit" content="로그인 하기" disabled={!isValid}></Button>
    </form>
  );
};

export default SignInFormSection;
