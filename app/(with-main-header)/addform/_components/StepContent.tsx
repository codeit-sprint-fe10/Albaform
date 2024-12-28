'use client';

import { PostFormBody } from '@/types/form';
import RecruitmentDetails from './RecruitmentDetails';
import RecruitmentRequirements from './RecruitmentRequirements';
import WorkingConditions from './WorkingConditions';
import { FormProps } from './FormNavigator';
import { UseFormHandleSubmit } from 'react-hook-form';

interface StepContentProps extends FormProps {
  currentStep: number;
  handleSubmit: UseFormHandleSubmit<PostFormBody>;
}

const StepContent = ({
  currentStep,
  register,
  setValue,
  handleSubmit,
}: StepContentProps) => {
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
