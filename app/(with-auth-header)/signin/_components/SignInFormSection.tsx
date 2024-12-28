'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { em, pw } from '@/constants/form';
import FormField from '../../_components/FormField';
import Button from '@/components/Button';

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
    <section>
      <form
        method="post"
        onSubmit={handleSubmit(signInSubmit)}
        className="flex flex-col"
      >
        <FormField
          name="email"
          label="이메일"
          placeholder={em.msg.placeholder}
          register={register('email', {
            required: { value: true, message: em.msg.required },
            pattern: {
              value: em.fmt.regExp,
              message: em.msg.pattern,
            },
          })}
          error={errors.email}
        />
        <FormField
          name="password"
          label="비밀번호"
          placeholder={pw.msg.placeholder}
          register={register('password', {
            required: { value: true, message: pw.msg.required },
            minLength: { value: pw.fmt.minLength, message: pw.msg.minLength },
          })}
          error={errors.password}
        />
        <Button
          type="submit"
          content="로그인 하기"
          disabled={!isValid}
          className="mt-8 lg:mt-12"
        ></Button>
      </form>
    </section>
  );
};

export default SignInFormSection;
