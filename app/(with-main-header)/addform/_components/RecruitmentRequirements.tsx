'use client';

import { useFormContext } from 'react-hook-form';
import Label from '@/components/Label';
import DropdownInput from './input/DropdownInput';
import {
  AGE_OPTIONS,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  NUMBER_OF_POSITION_OPTIONS,
  PREFERRED_OPTIONS,
} from '@/constants/dropdown';
import { PostFormBody } from '@/types/form';

const RecruitmentRequirements = () => {
  const { register, setValue, getValues } = useFormContext<PostFormBody>();

  return (
    <fieldset className="flex flex-col gap-8 lg:gap-10">
      <div>
        <Label label="모집인원" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="numberOfPositions"
          options={NUMBER_OF_POSITION_OPTIONS}
          register={register}
          setValue={setValue}
          defaultValue={getValues('numberOfPositions')}
        />
      </div>
      <div>
        <Label label="성별" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="gender"
          options={GENDER_OPTIONS}
          setValue={setValue}
          defaultValue={getValues('gender')}
        />
      </div>
      <div>
        <Label label="학력" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="education"
          options={EDUCATION_OPTIONS}
          setValue={setValue}
          defaultValue={getValues('education')}
        />
      </div>
      <div>
        <Label label="연령" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="age"
          options={AGE_OPTIONS}
          setValue={setValue}
          defaultValue={getValues('age')}
        />
      </div>
      <div>
        <Label label="우대사항" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="preferred"
          options={PREFERRED_OPTIONS}
          register={register}
          setValue={setValue}
          defaultValue={getValues('preferred')}
        />
      </div>
    </fieldset>
  );
};

export default RecruitmentRequirements;
