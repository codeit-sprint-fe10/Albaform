'use client';

import Modal from '@/components/Modal';
import type { UseModalProps } from '@/types/useModal';
import useGuestStore from '@/store/guest';
import Button from '@/components/Button';
import { GetGuestApplicationsBody } from '@/types/application';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
            />
            {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
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
