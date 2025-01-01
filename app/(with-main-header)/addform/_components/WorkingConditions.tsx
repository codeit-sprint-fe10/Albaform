import { useFormContext, Controller } from 'react-hook-form';
import Label from '@/components/Label';
import DateRangePicker from '@/components/DateRangePicker';
import CheckboxInput from './input/CheckboxInput';
import DaysInput from './input/DaysInput';
import LocationInput from './input/LocationInput';
import Input from './input/Input';
import DropdownInput from './input/DropdownInput';
import { TIME_OPTIONS } from '@/constants/dropdown';
import { PostFormBody } from '@/types/form';
import ClockIcon from '@/public/icons/clock.svg';

const WorkingConditions = ({ isVisible }: { isVisible: boolean }) => {
  const { register, setValue, getValues, control } =
    useFormContext<PostFormBody>();

  return (
    <fieldset
      className={`flex flex-col gap-8 lg:gap-[52px] ${!isVisible && 'hidden'}`}
    >
      <div>
        <Label
          id="location"
          label="근무 위치"
          className="mb-3 lg:mb-4"
          required
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <LocationInput
              name={field.name}
              value={getValues('location')}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <Label label="근무 기간" className="mb-3 lg:mb-4" required />
        <DateRangePicker
          setValue={setValue}
          startDateName="workStartDate"
          endDateName="workEndDate"
          defaultStartDate={getValues('workStartDate')}
          defaultEndDate={getValues('workEndDate')}
        />
      </div>
      <div>
        <Label label="근무 시간" className="mb-3 lg:mb-4" required />
        <div className="flex justify-between lg:justify-normal lg:gap-9">
          <Controller
            name="workStartTime"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <DropdownInput
                options={TIME_OPTIONS}
                name={field.name}
                value={getValues('workStartTime')}
                onChange={field.onChange}
                widthStyle="w-[150px] lg:w-[210px]"
                paddingStyle="p-3.5"
                icon={
                  <ClockIcon className="w-[13px] h-[13px] lg:w-5 lg:h-5 text-gray-200 " />
                }
                type="time"
              />
            )}
          />
          <Controller
            name="workEndTime"
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field }) => (
              <DropdownInput
                options={TIME_OPTIONS}
                name={field.name}
                value={getValues('workEndTime')}
                onChange={field.onChange}
                widthStyle="w-[150px] lg:w-[210px]"
                paddingStyle="p-3.5"
                icon={
                  <ClockIcon className="w-[13px] h-[13px] lg:w-5 lg:h-5 text-gray-200 " />
                }
                type="time"
              />
            )}
          />
        </div>
      </div>
      <div>
        <Label label="근무 요일" className="mb-3 lg:mb-4" required />
        <DaysInput register={register('workDays')} />
        <CheckboxInput
          label="요일 협의 가능"
          register={register('isNegotiableWorkDays')}
          className="mt-4"
        />
      </div>
      <div>
        <Label id="hourlyWage" label="시급" className="mb-3 lg:mb-4" required />
        <Input
          name="hourlyWage"
          type="number"
          className="p-3.5 lg:py-4"
          register={register('hourlyWage', {
            required: 'hourlyWage is required',
          })}
        />
      </div>
      <div>
        <Label label="공개 설정" className="mb-3 lg:mb-4" required />
        <CheckboxInput label="공개" register={register('isPublic')} />
      </div>
    </fieldset>
  );
};

export default WorkingConditions;
