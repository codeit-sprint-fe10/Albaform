'use client';

import WritingChip from './WritingChip';

interface FormTabsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  tabStatuses: Record<string, boolean>;
}

const FORM_OPTIONS = [
  { key: 1, label: '모집 내용' },
  { key: 2, label: '모집 조건' },
  { key: 3, label: '근무 조건' },
] as const;

const FormTabs = ({
  currentStep,
  setCurrentStep,
  tabStatuses,
}: FormTabsProps) => {
  return (
    <div className="flex flex-col">
      {FORM_OPTIONS.map((option) => {
        const isSelected = FORM_OPTIONS[currentStep - 1] === option;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => setCurrentStep(option.key)}
            className={`flex justify-between items-center w-full font-bold text-xl text-black-100 py-5 px-8 ${isSelected ? 'bg-orange-300 rounded-2xl text-gray-50' : 'hover:bg-background-300 hover:rounded-2xl'} `}
          >
            <div className="flex items-center gap-6 py-[3px]">
              <div
                className={`flex justify-center items-center w-7 h-7 bg-background-300 rounded-full text-gray-200 ${isSelected ? 'bg-orange-50 text-orange-300' : ''}`}
              >
                {option.key}
              </div>
              {option.label}
            </div>
            {tabStatuses[`tab${option.key}`] && (
              <WritingChip isSelected={isSelected} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FormTabs;
