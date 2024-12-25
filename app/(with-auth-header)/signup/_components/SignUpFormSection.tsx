'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserRole } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import VisibilityInput from '../../_components/VisibilityInput';
import Button from '@/components/Button';
import { em, pw, pwCf } from '@/constants/form';

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
        placeholder={em.msg.placeholder}
        {...register('email', {
          required: { value: true, message: em.msg.required },
          maxLength: { value: em.fmt.maxLength, message: em.msg.maxLength },
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
          maxLength: { value: pw.fmt.maxLength, message: pw.msg.maxLength },
          pattern: {
            value: pw.fmt.regExp,
            message: pw.msg.pattern,
          },
        })}
      />
      <span>{errors.password?.message}</span>
      <label htmlFor="passwordConfirmation">비밀번호 확인</label>
      <VisibilityInput
        id="passwordConfirmation"
        placeholder={pwCf.msg.placeholder}
        {...register('passwordConfirmation', {
          required: {
            value: true,
            message: pwCf.msg.required,
          },
          validate: {
            value: (value) => value === watch('password') || pwCf.msg.notEqual,
          },
        })}
      />
      <span>{errors.passwordConfirmation?.message}</span>
      <Button type="submit" content="다음" disabled={!isValid}></Button>
    </form>
  );
};

export default SignUpFormSection;
