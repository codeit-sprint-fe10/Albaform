'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';
import { NICKNAME, PHONE_NUMBER, STORE_NAME, LOCATION } from '@/constants/form';
import { UserRoleLowerCase } from '@/types/user';
import { patchMe } from '@/services/user';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';

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
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<InformationFormData>({ mode: 'onTouched' });

  const InformationSubmit: SubmitHandler<InformationFormData> = async (
    data,
    event,
  ) => {
    event?.preventDefault();

    try {
      await patchMe(data);
      window.alert('추가 정보를 등록했습니다!\n즐거운 알바폼 되세요.');
      replace('/');
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const message = error.response?.data.message;
      setError('nickname', { message });
    }
  };

  return (
    <section>
      <form
        method="post"
        onSubmit={handleSubmit(InformationSubmit)}
        className="flex flex-col"
      >
        <FormField
          name="nickname"
          label="닉네임"
          placeholder={NICKNAME.message.placeholder}
          register={register('nickname', {
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
          error={errors.nickname}
        />
        <FormField
          name="phoneNumber"
          label="전화번호"
          placeholder={PHONE_NUMBER.message.placeholder}
          register={register('phoneNumber', {
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
          error={errors.phoneNumber}
        />
        {userRole === 'owner' && (
          <>
            <FormField
              name="storeName"
              label="가게 이름"
              placeholder={STORE_NAME.message.placeholder}
              register={register('storeName', {
                required: { value: true, message: STORE_NAME.message.required },
                maxLength: {
                  value: STORE_NAME.format.maxLength,
                  message: STORE_NAME.message.maxLength,
                },
              })}
              error={errors.storeName}
            />
            <FormField
              name="storePhoneNumber"
              label="가게 전화번호"
              placeholder={PHONE_NUMBER.message.placeholder}
              register={register('storePhoneNumber', {
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
              error={errors.storePhoneNumber}
            />
            <FormField
              name="location"
              label="가게 위치"
              placeholder={LOCATION.message.placeholder}
              register={register('location', {
                required: { value: true, message: LOCATION.message.required },
              })}
              error={errors.location}
            />
          </>
        )}
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

export default InformationFormSection;
