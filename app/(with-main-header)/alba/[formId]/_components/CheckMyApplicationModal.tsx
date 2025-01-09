'use client';

import Modal from '@/components/Modal';
import type { UseModalProps } from '@/types/useModal';
import useGuestStore from '@/store/guest';
import Button from '@/components/Button';
import { GetGuestApplicationsBody } from '@/types/application';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { NAME, PASSWORD, PHONE_NUMBER } from '@/constants/form';

interface CheckMyApplicationModalProps extends UseModalProps {
  formId: number;
}

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
  } = useForm<GetGuestApplicationsBody>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = (data: GetGuestApplicationsBody) => {
    setGuest(data);
    push(`/myapply/${formId}`);
  };

  return (
    <Modal
      dialogRef={dialogRef}
      onClose={closeModal}
      title="내 지원 내역 확인하기"
      hasCloseButton={true}
    >
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder={NAME.message.placeholder}
              {...register('name', {
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
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder={PHONE_NUMBER.message.placeholder}
              {...register('phoneNumber', {
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
            />
            {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder={PASSWORD.message.placeholder}
              {...register('password', {
                required: { value: true, message: PASSWORD.message.required },
                minLength: {
                  value: PASSWORD.format.minLength,
                  message: PASSWORD.message.minLength,
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Button content="지원 내역 상세보기" type="submit" />
        </form>
      </section>
    </Modal>
  );
};

export default CheckMyApplicationModal;
