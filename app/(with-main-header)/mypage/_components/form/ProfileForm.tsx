'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { patchMe } from '@/services/user';
import {
  NICKNAME,
  PHONE_NUMBER,
  STORE_NAME,
  LOCATION,
  NAME,
} from '@/constants/form';
import { User, UserRole } from '@/types/user';
import FormField from '@/app/(with-auth-header)/_components/FormField';
import Button from '@/components/Button';
import ProfileImageInput from '@/app/(with-auth-header)/_components/ProfileImageInput';
import { useUserStore } from '@/store/user';

const profileFormField = [
  'name',
  'nickname',
  'phoneNumber',
  'imageUrl',
  'storeName',
  'storePhoneNumber',
  'location',
] as const;

interface ProfileFormData {
  name: string;
  nickname: string;
  phoneNumber: string;
  imageUrl: string;
  storeName?: string;
  storePhoneNumber?: string;
  location?: string;
}

interface ProfileFormProps {
  closeModal: () => void;
  user: Omit<User, 'password'>;
}

const ProfileForm = ({ closeModal, user }: ProfileFormProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const { mutateAsync, isPending } = useMutation({ mutationFn: patchMe });

  const defaultValues = profileFormField.reduce((acc, name) => {
    const value = user[name as keyof ProfileFormData];
    return { ...acc, ...(value && { [name]: value }) };
  }, {} as ProfileFormData);

  const methods = useForm<ProfileFormData>({
    mode: 'onTouched',
    defaultValues,
  });

  const InformationSubmit: SubmitHandler<ProfileFormData> = async (
    data,
    event,
  ) => {
    event?.preventDefault();

    try {
      const updatedData = await mutateAsync(data);
      setUser(updatedData);
      methods.reset();
      window.alert('프로필이 수정되었습니다!');
      closeModal();
      document.location.reload();
    } catch {
      window.alert('오류가 발생했습니다.\n확인 후 다시 시도해 주세요.');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        method="post"
        onSubmit={methods.handleSubmit(InformationSubmit)}
        className="flex flex-col md:w-[312px] lg:w-[640px] mt-10 lg:mt-14"
      >
        <ProfileImageInput />
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
          required
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
          required
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
          required
        />
        {user?.role === UserRole.owner && (
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
              required
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
              required
            />
            <FormField
              name="location"
              label="가게 위치"
              placeholder={LOCATION.message.placeholder}
              error={methods.formState.errors.location}
              design="outlined"
              required
            />
          </>
        )}
        <div className="flex gap-3 mt-6 lg:mt-8">
          <Button
            onClick={() => {
              methods.reset();
              closeModal();
            }}
            content="취소"
            design="outlined"
          />
          <Button
            type="submit"
            content="변경하기"
            disabled={!methods.formState.isValid || isPending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
