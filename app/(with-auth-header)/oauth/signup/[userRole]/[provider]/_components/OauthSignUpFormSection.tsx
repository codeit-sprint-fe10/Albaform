'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/user';
import { postCookies } from '@/services/cookie';
import { postOauthSignUp } from '@/services/auth';
import { PostOauthSignUpBody } from '@/types/auth';
import { UserRole, UserRoleLowerCase } from '@/types/user';
import { OAUTH_REDIRECT_URI } from '@/constants/api';
import {
  NICKNAME,
  PHONE_NUMBER,
  STORE_NAME,
  LOCATION,
  NAME,
} from '@/constants/form';
import FormField from '@/app/(with-auth-header)/_components/FormField';
import Button from '@/components/Button';

interface OauthSignUpFormData {
  name: string;
  nickname: string;
  phoneNumber: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

interface OauthSignUpFormSectionProps {
  userRole: UserRoleLowerCase;
  provider: 'google' | 'kakao';
  token: string;
}

const OauthSignUpFormSection = ({
  userRole,
  provider,
  token,
}: OauthSignUpFormSectionProps) => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (body: PostOauthSignUpBody) => postOauthSignUp(provider, body),
  });
  const setUser = useUserStore((state) => state.setUser);
  const { replace } = useRouter();
  const methods = useForm<OauthSignUpFormData>({ mode: 'onTouched' });

  const isSubmitDisabled =
    !methods.formState.isValid ||
    isPending ||
    (userRole === 'owner' ? !methods.getValues('location') : false);

  const OauthSignUpFormSubmit: SubmitHandler<OauthSignUpFormData> = async (
    data,
    event,
  ) => {
    event?.preventDefault();
    try {
      const signUpdata = await mutateAsync({
        ...data,
        role: UserRole[userRole],
        redirectUri: OAUTH_REDIRECT_URI,
        token,
      });

      const postCookiesBody = {
        accessToken: signUpdata.accessToken,
        refreshToken: signUpdata.refreshToken,
        userRole: signUpdata.user.role,
      };
      await postCookies(postCookiesBody);
      setUser(signUpdata.user);

      toast.success('회원가입되었습니다!\n즐거운 알바폼 되세요.');
      replace(document.location.pathname);
    } catch {
      toast.error('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form
          method="post"
          onSubmit={methods.handleSubmit(OauthSignUpFormSubmit)}
          className="flex flex-col"
        >
          <FormField
            name="name"
            label="이름"
            placeholder={NAME.message.placeholder}
            register={methods.register('name', {
              required: { value: true, message: NAME.message.required },
              maxLength: {
                value: NAME.format.maxLength,
                message: NAME.message.maxLength,
              },
              pattern: {
                value: NAME.format.regExp,
                message: NAME.message.pattern,
              },
            })}
            error={methods.formState.errors.name}
            design="outlined"
          />
          <FormField
            name="nickname"
            label="닉네임"
            placeholder={NICKNAME.message.placeholder}
            register={methods.register('nickname', {
              required: { value: true, message: NICKNAME.message.required },
              maxLength: {
                value: NICKNAME.format.maxLength,
                message: NICKNAME.message.maxLength,
              },
              pattern: {
                value: NICKNAME.format.regExp,
                message: NICKNAME.message.pattern,
              },
            })}
            error={methods.formState.errors.nickname}
            design="outlined"
          />
          <FormField
            name="phoneNumber"
            label="전화번호"
            placeholder={PHONE_NUMBER.message.placeholder}
            register={methods.register('phoneNumber', {
              required: { value: true, message: PHONE_NUMBER.message.required },
              minLength: {
                value: PHONE_NUMBER.format.minLength,
                message: PHONE_NUMBER.message.minLength,
              },
              maxLength: {
                value: PHONE_NUMBER.format.maxLength,
                message: PHONE_NUMBER.message.maxLength,
              },
              pattern: {
                value: PHONE_NUMBER.format.regExp,
                message: PHONE_NUMBER.message.pattern,
              },
            })}
            error={methods.formState.errors.phoneNumber}
            design="outlined"
          />
          {userRole === 'owner' && (
            <>
              <FormField
                name="storeName"
                label="가게 이름"
                placeholder={STORE_NAME.message.placeholder}
                register={methods.register('storeName', {
                  required: {
                    value: true,
                    message: STORE_NAME.message.required,
                  },
                  maxLength: {
                    value: STORE_NAME.format.maxLength,
                    message: STORE_NAME.message.maxLength,
                  },
                })}
                error={methods.formState.errors.storeName}
                design="outlined"
              />
              <FormField
                name="storePhoneNumber"
                label="가게 전화번호"
                placeholder={PHONE_NUMBER.message.placeholder}
                register={methods.register('storePhoneNumber', {
                  required: {
                    value: true,
                    message: PHONE_NUMBER.message.required,
                  },
                  minLength: {
                    value: PHONE_NUMBER.format.minLength,
                    message: PHONE_NUMBER.message.minLength,
                  },
                  maxLength: {
                    value: PHONE_NUMBER.format.maxLength,
                    message: PHONE_NUMBER.message.maxLength,
                  },
                  pattern: {
                    value: PHONE_NUMBER.format.regExp,
                    message: PHONE_NUMBER.message.pattern,
                  },
                })}
                error={methods.formState.errors.storePhoneNumber}
                design="outlined"
              />
              <FormField
                name="location"
                label="가게 위치"
                placeholder={LOCATION.message.placeholder}
                error={methods.formState.errors.location}
                design="outlined"
              />
            </>
          )}
          <Button
            type="submit"
            content="시작하기"
            disabled={isSubmitDisabled}
            className="mt-8 lg:mt-12"
          ></Button>
          <span className="mt-4 lg:mt-6 text-center text-xs lg:text-lg text-black-100">
            {'가입 시 '}
            <Link
              href="https://sprint.codeit.kr"
              className="text-orange-300 hover:text-orange-200 font-semibold underline underline-offset-2 transition duration-200"
            >
              이용약관
            </Link>
            에 동의한 것으로 간주됩니다.
          </span>
        </form>
      </FormProvider>
    </section>
  );
};

export default OauthSignUpFormSection;
