'use client';

import { Ref, useImperativeHandle } from 'react';
import { useFormContext } from 'react-hook-form';
import RecruitmentDetails from './RecruitmentDetails';
import RecruitmentRequirements from './RecruitmentRequirements';
import WorkingConditions from './WorkingConditions';
import { PostFormBody } from '@/types/form';

interface StepContentProps {
  currentStep: number;
  onSubmit: (data: PostFormBody) => void;
  ref: Ref<unknown> | undefined;
}

const StepContent = ({ currentStep, onSubmit, ref }: StepContentProps) => {
  const { handleSubmit } = useFormContext<PostFormBody>();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-8 lg:py-12">
      {currentStep === 1 && <RecruitmentDetails />}
      {currentStep === 2 && <RecruitmentRequirements />}
      {currentStep === 3 && <WorkingConditions />}
    </form>
  );
};

export default StepContent;
