import Label from '@/components/Label';
import DateRangePicker from '@/components/DateRangePicker';
import Input from './input/Input';
import Textarea from './input/Textarea';
import { FormProps } from './FormNavigator';
import FileInput from './input/FileInput';

const RecruitmentDetails = ({ register, setValue }: FormProps) => {
  return (
    <fieldset className="flex flex-col gap-8 lg:gap-[52px]">
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
      <div>
        <Label label="모집 기간" className="mb-4" required />
        <DateRangePicker />
      </div>
      <FileInput setValue={setValue} />
    </fieldset>
  );
};

export default RecruitmentDetails;
