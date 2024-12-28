'use client';

import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import RecruitmentDetails from './RecruitmentDetails';
import RecruitmentRequirements from './RecruitmentRequirements';
import WorkingConditions from './WorkingConditions';
import { PostFormBody } from '@/types/form';

export interface FormProps {
  register: UseFormRegister<PostFormBody>;
  setValue: UseFormSetValue<PostFormBody>;
}

const StepContent = ({ currentStep }: { currentStep: number }) => {
  const { setValue, register, handleSubmit } = useForm<PostFormBody>();

  const onSubmit = (data: PostFormBody) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-8 lg:py-12">
      {currentStep === 1 && (
        <RecruitmentDetails register={register} setValue={setValue} />
      )}
      {currentStep === 2 && (
        <RecruitmentRequirements register={register} setValue={setValue} />
      )}
      {currentStep === 3 && (
        <WorkingConditions register={register} setValue={setValue} />
      )}
    </form>
  );
};

export default StepContent;
