'use client';

import { Ref, useImperativeHandle } from 'react';
import { useFormContext } from 'react-hook-form';
import RecruitmentDetails from './RecruitmentDetails';
import RecruitmentRequirements from './RecruitmentRequirements';
import WorkingConditions from './WorkingConditions';
import { PostAlbaBody } from '@/types/alba';

interface StepContentProps {
  currentStep: number;
  onSubmit: (data: PostAlbaBody) => void;
  ref: Ref<unknown> | undefined;
}

const StepContent = ({ currentStep, onSubmit, ref }: StepContentProps) => {
  const { handleSubmit } = useFormContext<PostAlbaBody>();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-8 lg:py-12">
      <RecruitmentDetails isVisible={currentStep === 1} />
      <RecruitmentRequirements isVisible={currentStep === 2} />
      <WorkingConditions isVisible={currentStep === 3} />
    </form>
  );
};

export default StepContent;
