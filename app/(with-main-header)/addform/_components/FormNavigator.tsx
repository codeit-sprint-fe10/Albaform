'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FormTabs from './FormTabs';
import FormDropdown from './FormDropdown';
import StepContent from './StepContent';
import Button from '@/components/Button';
import usePostAlba from '../_hooks/usePostAlba';
import useModal from '@/hooks/useModal';
import { useTemporarySave } from '@/hooks/useTemporarySave';
import { PostAlbaBody } from '@/types/alba';
import { STEP_1_FIELDS, STEP_2_FIELDS, STEP_3_FIELDS } from '@/constants/form';
import DraftLoadModal from './DraftLoadModal';
import Loader from '@/components/Loader';
import { toast } from 'react-toastify';

interface FormNavigatorProps {
  formId?: number;
  albaDetail?: PostAlbaBody;
}

const FormNavigator = ({ formId, albaDetail }: FormNavigatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formKey, setFormKey] = useState(1);
  const [tabStatuses, setTabStatuses] = useState<Record<string, boolean>>({
    tab1: false,
    tab2: false,
    tab3: false,
  });
  const [isContinueWriting, setIsContinueWriting] = useState(false);
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
  const router = useRouter();
  const { dialogRef, openModal, closeModal } = useModal();
  const { mutateAsync, isPending } = usePostAlba();
  const defaultValues = methods.getValues();
  const fieldGroups: Record<string, string[]> = useMemo(
    () => ({
      tab1: STEP_1_FIELDS,
      tab2: STEP_2_FIELDS,
      tab3: STEP_3_FIELDS,
    }),
    [],
  );

  const handleTemporarySave = () => {
    const currentValues = methods.getValues();
    saveData(currentValues);
  };

  const handleSubmit = async (data: PostAlbaBody) => {
    try {
      await mutateAsync({ formId, data });
      clearData();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleContinueWriting = () => {
    setIsContinueWriting(true);
    closeModal();
  };

  const buttonContent = () => {
    if (isPending) {
      return <Loader sizeClass="w-6 h-6 lg:w-9 lg:h-9" />;
    }
    return formId ? '수정하기' : '등록하기';
  };

  const initializeFormState = useCallback(
    (storedData: Partial<PostAlbaBody>) => {
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
    },
    [fieldGroups],
  );

  useEffect(() => {
    if (isContinueWriting) {
      const storedData = getData();
      if (storedData) {
        initializeFormState(storedData);
      }
    }
  }, [isContinueWriting, getData, initializeFormState]);

  useEffect(() => {
    const loadData = async () => {
      if (formId && albaDetail) {
        initializeFormState(albaDetail);
        return;
      }

      if (getData()) {
        openModal();
        return;
      }
    };

    loadData();
  }, [formId, albaDetail, getData, initializeFormState]);

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
        className="relative w-[375px] lg:w-auto lg:max-w-[640px] mx-auto lg:mx-0 px-6 lg:px-0 lg:ml-[640px]"
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
            {!formId && (
              <Button
                design="outlined"
                content="임시 저장"
                onClick={handleTemporarySave}
              />
            )}
            <Button
              type="submit"
              content={buttonContent()}
              onClick={() => formRef.current?.submit()}
              disabled={isPending || !methods.formState.isValid}
            />
          </div>
        </aside>
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl lg:text-3xl text-black-500 py-6 lg:py-10">
            알바폼 {formId ? '수정하기' : '만들기'}
          </h2>
          <button
            type="button"
            className="bg-gray-100 rounded-lg font-semibold text-md lg:text-xl text-gray-50 py-2 px-3.5 lg:py-3 lg:px-6 hover:bg-gray-200 transition duration-300"
            onClick={() => router.back()}
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
      <DraftLoadModal
        dialogRef={dialogRef}
        closeModal={closeModal}
        onClick={handleContinueWriting}
      />
    </FormProvider>
  );
};

export default FormNavigator;
