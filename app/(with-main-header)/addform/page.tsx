'use client';

import { useForm } from 'react-hook-form';
import FileInput from './_components/FileInput';
import LocationInput from './_components/LocationInput';

export interface FormValues {
  imageUrls: string[] | null;
  location: string;
}

const AddFormPage = () => {
  const { setValue } = useForm<FormValues>();

  return (
    <>
      <LocationInput setValue={setValue} />
      <FileInput setValue={setValue} />
    </>
  );
};

export default AddFormPage;
