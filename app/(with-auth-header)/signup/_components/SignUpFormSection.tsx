'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserRole } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import VisibilityInput from '../../_components/VisibilityInput';
import Button from '@/components/Button';
import { em, name, pw, pwCf } from '@/constants/form';

interface SignUpFormData {
  name: string;
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
        name: data.name,
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
    <section>
      <form
        method="post"
        onSubmit={handleSubmit(signUpSubmit)}
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
            maxLength: { value: em.fmt.maxLength, message: em.msg.maxLength },
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
            maxLength: { value: pw.fmt.maxLength, message: pw.msg.maxLength },
            pattern: {
              value: pw.fmt.regExp,
              message: pw.msg.pattern,
            },
          })}
          className={`w-full p-[14px] mb-1 rounded-lg border ${errors.password ? 'border-error' : 'border-gray-200 focus:border-orange-300'} outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200`}
        />
        <span className="h-[22px] lg:h-[26px] mr-2 lg:mr-3 text-right text-sm lg:text-lg text-error font-medium">
          {errors.password?.message}
        </span>
        <label
          htmlFor="passwordConfirmation"
          className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl"
        >
          비밀번호 확인
        </label>
        <VisibilityInput
          id="passwordConfirmation"
          placeholder={pwCf.msg.placeholder}
          {...register('passwordConfirmation', {
            required: {
              value: true,
              message: pwCf.msg.required,
            },
            validate: {
              value: (value) =>
                value === watch('password') || pwCf.msg.notEqual,
            },
          })}
          className={`w-full p-[14px] mb-1 rounded-lg border ${errors.password ? 'border-error' : 'border-gray-200 focus:border-orange-300'} outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200`}
        />
        <span className="h-[22px] lg:h-[26px] mr-2 lg:mr-3 text-right text-sm lg:text-lg text-error font-medium">
          {errors.passwordConfirmation?.message}
        </span>
        <label htmlFor="name" className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl">
          이름
        </label>
        <input
          type="text"
          id="name"
          placeholder={name.msg.placeholder}
          {...register('name', {
            required: { value: true, message: name.msg.required },
            maxLength: {
              value: name.fmt.maxLength,
              message: name.msg.maxLength,
            },
            pattern: {
              value: name.fmt.regExp,
              message: name.msg.pattern,
            },
          })}
          className={`p-[14px] mb-1 rounded-lg border ${errors.name ? 'border-error' : 'border-gray-200 focus:border-orange-300'} outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200`}
        />
        <span className="h-[22px] lg:h-[26px] mr-2 lg:mr-3 text-right text-sm lg:text-lg text-error font-medium">
          {errors.name?.message}
        </span>
        <Button
          type="submit"
          content="다음"
          disabled={!isValid}
          className="mt-8 lg:mt-12"
        ></Button>
      </form>
    </section>
  );
};

export default SignUpFormSection;
