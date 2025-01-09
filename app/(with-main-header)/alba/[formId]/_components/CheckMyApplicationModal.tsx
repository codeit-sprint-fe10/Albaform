'use client';

import Modal from '@/components/Modal';
import type { UseModalProps } from '@/types/useModal';
import useGuestStore from '@/store/guest';
import Button from '@/components/Button';
import { GetGuestApplicationsBody } from '@/types/application';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { NAME, PASSWORD, PHONE_NUMBER } from '@/constants/form';
import InputField from '@/app/(with-main-header)/alba/[formId]/_components/input/InputField';
import PrivateInputField from '@/app/(with-main-header)/alba/[formId]/_components/input/PrivateInputField';

interface CheckMyApplicationModalProps extends UseModalProps {
  formId: number;
}

const INITIAL_STATE = {
  name: '',
  phoneNumber: '',
  password: '',
};

const CheckMyApplicationModal = ({
  dialogRef,
  closeModal,
  formId,
}: CheckMyApplicationModalProps) => {
  const setGuest = useGuestStore((state) => state.setGuest);
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GetGuestApplicationsBody>({
    defaultValues: INITIAL_STATE,
  });

  const onSubmit = (data: GetGuestApplicationsBody) => {
    setGuest(data);
    push(`/myapply/${formId}`);
  };

  const onClose = () => {
    reset();
    closeModal();
  };

  return (
    <Modal
      dialogRef={dialogRef}
      onClose={onClose}
      title="내 지원 내역 확인하기"
      hasCloseButton={true}
    >
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex flex-col gap-4 py-4 mt-4">
            <InputField
              id="name"
              label="이름"
              placeholder={NAME.message.placeholder}
              register={register('name', {
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
              error={errors.name}
            />
            <InputField
              id="phoneNumber"
              label="전화번호"
              placeholder={PHONE_NUMBER.message.placeholder}
              register={register('phoneNumber', {
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
              error={errors.phoneNumber}
            />
            <PrivateInputField
              id="password"
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
          </fieldset>
          <div className="mt-6 lg:mt-7">
            <Button content="지원 내역 상세보기" type="submit" />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default CheckMyApplicationModal;
