'use client';

import { useForm } from 'react-hook-form';
import FileInput from './_components/FileInput';
import LocationInput from './_components/LocationInput';
import Input from './_components/Input';
import Label from '@/components/Label';

export interface FormValues {
  title: string;
  description: string;
  imageUrls: string[] | null;
  location: string;
}

const AddFormPage = () => {
  const { setValue, register } = useForm<FormValues>();

  return (
    <>
      <div>
        <Label id="title" label="알바폼 제목" className="mb-4" required />
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          className="p-3.5 lg:py-4"
          register={register('title')}
        />
      </div>
      <LocationInput setValue={setValue} />
      <FileInput setValue={setValue} />
    </>
  );
};

export default AddFormPage;
