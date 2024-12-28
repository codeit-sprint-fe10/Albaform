'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosError } from 'axios';
import { nn, pN, sN, loc } from '@/constants/form';
import FormField from '../../../_components/FormField';
import Button from '@/components/Button';
import { patchMe } from '@/services/user';
import { UserRoleLow } from '@/types/user';

interface InformationFormData {
  nickname: string;
  phoneNumber: string;
  imageUrl?: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

interface InformationFormSectionProps {
  userRole: UserRoleLow;
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
          placeholder={nn.msg.placeholder}
          register={register('nickname', {
            required: { value: true, message: nn.msg.required },
            maxLength: { value: nn.fmt.maxLength, message: nn.msg.maxLength },
            pattern: {
              value: nn.fmt.regExp,
              message: nn.msg.pattern,
            },
          })}
          error={errors.nickname}
        />
        <FormField
          name="phoneNumber"
          label="전화번호"
          placeholder={pN.msg.placeholder}
          register={register('phoneNumber', {
            required: { value: true, message: pN.msg.required },
            minLength: { value: pN.fmt.minLength, message: pN.msg.minLength },
            maxLength: { value: pN.fmt.maxLength, message: pN.msg.maxLength },
            pattern: {
              value: pN.fmt.regExp,
              message: pN.msg.pattern,
            },
          })}
          error={errors.phoneNumber}
        />
        {userRole === 'owner' && (
          <>
            <FormField
              name="storeName"
              label="가게 이름"
              placeholder={sN.msg.placeholder}
              register={register('storeName', {
                required: { value: true, message: sN.msg.required },
                maxLength: {
                  value: sN.fmt.maxLength,
                  message: sN.msg.maxLength,
                },
              })}
              error={errors.storeName}
            />
            <FormField
              name="storePhoneNumber"
              label="가게 전화번호"
              placeholder={pN.msg.placeholder}
              register={register('storePhoneNumber', {
                required: { value: true, message: pN.msg.required },
                minLength: {
                  value: pN.fmt.minLength,
                  message: pN.msg.minLength,
                },
                maxLength: {
                  value: pN.fmt.maxLength,
                  message: pN.msg.maxLength,
                },
                pattern: {
                  value: pN.fmt.regExp,
                  message: pN.msg.pattern,
                },
              })}
              error={errors.storePhoneNumber}
            />
            <FormField
              name="location"
              label="가게 위치"
              placeholder={loc.msg.placeholder}
              register={register('location', {
                required: { value: true, message: loc.msg.required },
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
