'use client';

import { useForm } from 'react-hook-form';
import FileInput from './_components/FileInput';

export interface FormValues {
  imageUrls: string[] | null;
}

const AddFormPage = () => {
  const { setValue } = useForm<FormValues>();

  return (
    <>
      <FileInput id="imageUrls" name="imageUrls" setValue={setValue} />
    </>
  );
};

export default AddFormPage;
