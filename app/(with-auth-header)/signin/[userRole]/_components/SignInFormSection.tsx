'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { EMAIL, PASSWORD } from '@/constants/form';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';
import { AxiosError } from 'axios';

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

      window.alert('로그인되었습니다!\n즐거운 알바폼 되세요.');
      replace('/');
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;

      if (message?.includes('이메일')) setError('email', { message });
      else if (message?.includes('비밀번호')) setError('password', { message });
      else window.alert('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
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
          placeholder={EMAIL.message.placeholder}
          register={register('email', {
            required: { value: true, message: EMAIL.message.required },
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
