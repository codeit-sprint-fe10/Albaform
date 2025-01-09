'use client';

import Modal from '@/components/Modal';
import type { UseModalProps } from '@/types/useModal';
import useGuestStore from '@/store/guest';
import Button from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import { GetGuestApplicationsBody } from '@/types/application';
import { useRouter } from 'next/navigation';

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

  const [values, setValues] = useState<GetGuestApplicationsBody>({
    name: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => {
      const { name, value } = e.target;
      return {
        ...prevValues,
        [name]: value.trim(),
      };
    });
  };

  const handleOnClick = () => {
    setGuest(values);
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
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <Button content="지원 내역 상세보기" onClick={handleOnClick} />
      </section>
    </Modal>
  );
};

export default CheckMyApplicationModal;
