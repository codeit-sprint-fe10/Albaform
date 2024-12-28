'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';
import { UserRole, UserRoleLow } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';
import { em, pw, pwCf, name } from '@/constants/form';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpFormSectionProps {
  userRole: UserRoleLow;
  onSubmit: () => void;
}

const SignUpFormSection = ({ userRole, onSubmit }: SignUpFormSectionProps) => {
  const { signUp, signIn } = useAuth();
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
        role: UserRole[userRole],
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      window.alert('회원가입되었습니다!\n추가 정보를 등록합니다.');
      onSubmit();
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
        <FormField
          name="email"
          label="이메일"
          placeholder={em.msg.placeholder}
          register={register('email', {
            required: { value: true, message: em.msg.required },
            maxLength: { value: em.fmt.maxLength, message: em.msg.maxLength },
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
            maxLength: { value: pw.fmt.maxLength, message: pw.msg.maxLength },
            pattern: {
              value: pw.fmt.regExp,
              message: pw.msg.pattern,
            },
          })}
          error={errors.password}
        />
        <FormField
          name="passwordConfirmation"
          label="비밀번호 확인"
          placeholder={pwCf.msg.placeholder}
          register={register('passwordConfirmation', {
            required: {
              value: true,
              message: pwCf.msg.required,
            },
            validate: {
              value: (value) =>
                value === watch('password') || pwCf.msg.notEqual,
            },
          })}
          error={errors.passwordConfirmation}
        />
        <FormField
          name="name"
          label="이름"
          placeholder={name.msg.placeholder}
          register={register('name', {
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
          error={errors.name}
        />
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
