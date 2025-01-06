'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import FormTabs from './FormTabs';
import FormDropdown from './FormDropdown';
import StepContent from './StepContent';
import Button from '@/components/Button';
import { useTemporarySave } from '@/hooks/useTemporarySave';
import { PostAlbaBody } from '@/types/alba';
import { postAlba } from '@/services/alba';
import { STEP_1_FIELDS, STEP_2_FIELDS, STEP_3_FIELDS } from '@/constants/form';

const FormNavigator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formKey, setFormKey] = useState(1);
  const [tabStatuses, setTabStatuses] = useState<Record<string, boolean>>({
    tab1: false,
    tab2: false,
    tab3: false,
  });
  const methods = useForm<PostAlbaBody>({
    defaultValues: {
      imageUrls: [],
      workDays: [],
      isNegotiableWorkDays: false,
      isPublic: false,
    },
  });
  const { getData, saveData, clearData } = useTemporarySave<PostAlbaBody>();
  const formRef = useRef<{ submit: () => void | null }>(null);
  const fieldGroups: Record<string, string[]> = useMemo(
    () => ({
      tab1: STEP_1_FIELDS,
      tab2: STEP_2_FIELDS,
      tab3: STEP_3_FIELDS,
    }),
    [],
  );

  const mutation = useMutation({
    mutationFn: postAlba,
    onSuccess: () => {
      //TODO
    },
    onError: (error: Error) => {
      //TODO
    },
  });

  const handleTemporarySave = () => {
    const currentValues = methods.getValues();
    saveData(currentValues);
  };

  const handleSubmit = (data: PostAlbaBody) => {
    clearData();
    mutation.mutate(data);
  };

  useEffect(() => {
    const storedData = getData();
    const defaultValues = methods.getValues();

    if (storedData) {
      methods.reset(storedData);

      const newTabStatuses: Record<string, boolean> = {};
      Object.entries(fieldGroups).forEach(([tab, fields]) => {
        newTabStatuses[tab] = fields.some((field) => {
          const storedValue = storedData[field as keyof typeof storedData];
          const defaultValue =
            defaultValues[field as keyof typeof defaultValues];

          if (Array.isArray(storedValue)) {
            return storedValue.length !== 0 && storedValue !== defaultValue;
          }

          return (
            storedValue !== null &&
            storedValue !== '' &&
            storedValue !== defaultValue
          );
        });
      });

      setFormKey((prev) => prev + 1);
      setTabStatuses(newTabStatuses);
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((values) => {
      const statuses: Record<string, boolean> = {};
      const groupName = `tab${currentStep}`;
      statuses[groupName] = fieldGroups[groupName].some((field) => {
        const value = values[field as keyof typeof values];
        return value != null && value !== '';
      });
      setTabStatuses((prevStatuses) => ({ ...prevStatuses, ...statuses }));
    });

    return () => subscription.unsubscribe();
  }, [currentStep, fieldGroups]);

  return (
    <FormProvider {...methods}>
      <div
        key={formKey}
        className="relative w-[375px] lg:w-auto lg:max-w-[640px] mx-auto lg:mx-0 px-6 lg:px-0 lg:ml-[600px]"
      >
        <aside className="flex flex-col justify-between bg-background-200 rounded-3xl lg:fixed lg:top-32 lg:left-36 lg:w-[452px] lg:h-[80vh] lg:p-10">
          <div className="hidden lg:block">
            <FormTabs
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              tabStatuses={tabStatuses}
            />
          </div>
          <div className="absolute top-[calc(100%)] left-1/2 -translate-x-1/2 lg:translate-x-0 flex flex-col gap-2.5 w-full px-6 lg:px-0 py-2.5 lg:py-0 lg:static">
            <Button
              design="outlined"
              content="임시 저장"
              onClick={handleTemporarySave}
            />
            <Button
              type="submit"
              content="등록 하기"
              onClick={() => formRef.current?.submit()}
              disabled={!methods.formState.isValid}
            />
          </div>
        </aside>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl lg:text-3xl text-black-500 py-6 lg:py-10">
            알바폼 만들기
          </h2>
          <button
            type="button"
            className="bg-gray-100 rounded-lg font-semibold text-md lg:text-xl text-gray-50 py-2 px-3.5 lg:py-3 lg:px-6"
            onClick={clearData}
          >
            작성취소
          </button>
        </div>
        <div className="block lg:hidden py-2.5">
          <FormDropdown
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            tabStatuses={tabStatuses}
          />
        </div>
        <StepContent
          currentStep={currentStep}
          onSubmit={handleSubmit}
          ref={formRef}
        />
      </div>
    </FormProvider>
  );
};

export default FormNavigator;
