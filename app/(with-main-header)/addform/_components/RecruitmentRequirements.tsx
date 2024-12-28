import Label from '@/components/Label';
import DropdownInput from './input/DropdownInput';
import { FormProps } from './FormNavigator';
import {
  AGE_OPTIONS,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  NUMBER_OF_POSITION_OPTIONS,
  PREFERRED_OPTIONS,
} from '@/constants/dropdown';

const RecruitmentRequirements = ({ register, setValue }: FormProps) => {
  return (
    <fieldset className="flex flex-col gap-8 lg:gap-10">
      <div>
        <Label label="모집인원" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="numberOfPositions"
          options={NUMBER_OF_POSITION_OPTIONS}
          register={register('numberOfPositions')}
        />
      </div>
      <div>
        <Label label="성별" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="gender"
          options={GENDER_OPTIONS}
          register={register('gender')}
        />
      </div>
      <div>
        <Label label="학력" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="education"
          options={EDUCATION_OPTIONS}
          register={register('education')}
        />
      </div>
      <div>
        <Label label="연령" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="age"
          options={AGE_OPTIONS}
          register={register('age')}
        />
      </div>
      <div>
        <Label label="우대사항" className="mb-3 lg:mb-4" required />
        <DropdownInput
          name="preferred"
          options={PREFERRED_OPTIONS}
          register={register('preferred')}
        />
      </div>
    </fieldset>
  );
};

export default RecruitmentRequirements;
