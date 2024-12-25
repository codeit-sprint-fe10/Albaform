'use client';

import { useForm } from 'react-hook-form';
import FileInput from './_components/FileInput';
import LocationInput from './_components/LocationInput';
import Input from './_components/Input';
import Label from '@/components/Label';
import Textarea from './_components/Textarea';
import CheckboxInput from './_components/CheckboxInput';
import DaysInput from './_components/DaysInput';

export interface FormValues {
  title: string;
  description: string;
  imageUrls: string[] | null;
  workDays: string[];
  location: string;
  isPublic: boolean;
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
      <div>
        <Label id="description" label="소개글" className="mb-4" required />
        <Textarea
          name="description"
          placeholder="최대 200자까지 입력가능합니다."
          className="h-40"
          register={register('description')}
        />
      </div>
      <LocationInput setValue={setValue} />
      <FileInput setValue={setValue} />
      <div>
        <Label label="근무 요일" className="mb-3 lg:mb-4" required />
        <DaysInput register={register('workDays')} />
      </div>
      <div>
        <Label label="공개 설정" className="mb-3 lg:mb-4" required />
        <CheckboxInput label="공개" register={register('isPublic')} />
      </div>
    </>
  );
};

export default AddFormPage;
