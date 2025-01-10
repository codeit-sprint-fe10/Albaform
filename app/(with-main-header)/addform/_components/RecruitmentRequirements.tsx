'use client';

import { useFormContext, Controller } from 'react-hook-form';
import Label from '@/components/Label';
import DropdownInput from './input/DropdownInput';
import {
  AGE_OPTIONS,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  NUMBER_OF_POSITION_OPTIONS,
  PREFERRED_OPTIONS,
} from '@/constants/dropdown';
import { PostAlbaBody } from '@/types/alba';

const RecruitmentRequirements = ({ isVisible }: { isVisible: boolean }) => {
  const { getValues, control } = useFormContext<PostAlbaBody>();

  return (
    <fieldset
      className={`flex flex-col gap-8 lg:gap-10 ${!isVisible && 'hidden'}`}
    >
      <div>
        <Label label="모집인원" className="mb-3 lg:mb-4" required />
        <Controller
          name="numberOfPositions"
          control={control}
          rules={{ required: 'This field is required' }}
          defaultValue={getValues('numberOfPositions')}
          render={({ field }) => (
            <DropdownInput
              options={NUMBER_OF_POSITION_OPTIONS}
              type="number"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label label="성별" className="mb-3 lg:mb-4" required />
        <Controller
          name="gender"
          control={control}
          rules={{ required: 'This field is required' }}
          defaultValue={getValues('gender')}
          render={({ field }) => (
            <DropdownInput
              options={GENDER_OPTIONS}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label label="학력" className="mb-3 lg:mb-4" required />
        <Controller
          name="education"
          control={control}
          rules={{ required: 'This field is required' }}
          defaultValue={getValues('education')}
          render={({ field }) => (
            <DropdownInput
              options={EDUCATION_OPTIONS}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label label="연령" className="mb-3 lg:mb-4" required />
        <Controller
          name="age"
          control={control}
          rules={{ required: 'This field is required' }}
          defaultValue={getValues('age')}
          render={({ field }) => (
            <DropdownInput
              options={AGE_OPTIONS}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label label="우대사항" className="mb-3 lg:mb-4" required />
        <Controller
          name="preferred"
          control={control}
          rules={{ required: 'This field is required' }}
          defaultValue={getValues('preferred')}
          render={({ field }) => (
            <DropdownInput
              options={PREFERRED_OPTIONS}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </fieldset>
  );
};

export default RecruitmentRequirements;
