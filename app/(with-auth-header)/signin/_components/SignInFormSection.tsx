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
    <section>
      <form
        method="post"
        onSubmit={handleSubmit(signInSubmit)}
        className="flex flex-col"
      >
        <label htmlFor="email" className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl">
          이메일
        </label>
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
          className={`p-[14px] mb-1 rounded-lg border ${errors.email ? 'border-error' : 'border-gray-200 focus:border-orange-300'} outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200`}
        />
        <span className="h-[22px] lg:h-[26px] mr-2 lg:mr-3 text-right text-sm lg:text-lg text-error font-medium">
          {errors.email?.message}
        </span>
        <label
          htmlFor="password"
          className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl"
        >
          비밀번호
        </label>
        <VisibilityInput
          id="password"
          placeholder={pw.msg.placeholder}
          {...register('password', {
            required: { value: true, message: pw.msg.required },
            minLength: { value: pw.fmt.minLength, message: pw.msg.minLength },
          })}
          className={`w-full p-[14px] mb-1 rounded-lg border ${errors.password ? 'border-error' : 'border-gray-200 focus:border-orange-300'} outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200`}
        />
        <span className="h-[22px] lg:h-[26px] mr-2 lg:mr-3 text-right text-sm lg:text-lg text-error font-medium">
          {errors.password?.message}
        </span>
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
