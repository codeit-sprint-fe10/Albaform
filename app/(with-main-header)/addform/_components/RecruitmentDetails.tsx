'use client';

import { useFormContext } from 'react-hook-form';
import Label from '@/components/Label';
import DateRangePicker from '@/components/DateRangePicker';
import Input from './input/Input';
import Textarea from './input/Textarea';
import FileInput from './input/FileInput';
import { PostFormBody } from '@/types/form';

const RecruitmentDetails = ({ isVisible }: { isVisible: boolean }) => {
  const { register, setValue, getValues } = useFormContext<PostFormBody>();

  return (
    <fieldset
      className={`flex flex-col gap-8 lg:gap-[52px] ${!isVisible && 'hidden'}`}
    >
      <div>
        <Label id="title" label="알바폼 제목" className="mb-4" required />
        <Input
          name="title"
          placeholder="제목을 입력해주세요."
          className="p-3.5 lg:py-4"
          register={register('title', { required: 'Title is required' })}
        />
      </div>
      <div>
        <Label id="description" label="소개글" className="mb-4" required />
        <Textarea
          name="description"
          placeholder="최대 200자까지 입력가능합니다."
          className="h-40"
          register={register('description', {
            required: 'Description is required',
          })}
        />
      </div>
      <div>
        <Label label="모집 기간" className="mb-4" required />
        <DateRangePicker
          setValue={setValue}
          startDateName="recruitmentStartDate"
          endDateName="recruitmentEndDate"
          defaultStartDate={getValues('recruitmentStartDate')}
          defaultEndDate={getValues('recruitmentEndDate')}
        />
      </div>
      <FileInput setValue={setValue} imageUrls={getValues('imageUrls')} />
    </fieldset>
  );
};

export default RecruitmentDetails;
