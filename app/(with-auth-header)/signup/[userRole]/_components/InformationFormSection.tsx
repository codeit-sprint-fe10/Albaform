'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { patchMe } from '@/services/user';
import { UserRoleLowerCase } from '@/types/user';
import { NICKNAME, PHONE_NUMBER, STORE_NAME, LOCATION } from '@/constants/form';
import Button from '@/components/Button';
import FormField from '../../../_components/FormField';
import ProfileImageInput from '../../../_components/ProfileImageInput';
import { useUserStore } from '@/store/user';

interface InformationFormData {
  nickname: string;
  phoneNumber: string;
  imageUrl?: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

interface InformationFormSectionProps {
  userRole: UserRoleLowerCase;
}

const InformationFormSection = ({ userRole }: InformationFormSectionProps) => {
  const { isPending, mutateAsync } = useMutation({ mutationFn: patchMe });
  const setUser = useUserStore((state) => state.setUser);
  const { replace } = useRouter();
  const methods = useForm<InformationFormData>({ mode: 'onTouched' });

  const InformationSubmit: SubmitHandler<InformationFormData> = async (
    data,
    event,
  ) => {
    event?.preventDefault();

    try {
      const updatedData = await mutateAsync(data);
      setUser(updatedData);
      window.alert('추가 정보를 등록했습니다!\n즐거운 알바폼 되세요.');
      replace('/');
    } catch {
      window.alert('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form
          method="post"
          onSubmit={methods.handleSubmit(InformationSubmit)}
          className="flex flex-col"
        >
          <ProfileImageInput />
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
            disabled={!methods.formState.isValid || isPending}
            className="mt-8 lg:mt-12"
          ></Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default InformationFormSection;
