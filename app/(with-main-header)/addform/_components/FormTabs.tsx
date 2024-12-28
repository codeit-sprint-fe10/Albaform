'use client';

interface FormTabsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const tabs = ['모집 내용', '모집 조건', '근무 조건'];

const FormTabs = ({ currentStep, setCurrentStep }: FormTabsProps) => {
  return (
    <div className="flex flex-col">
      {tabs.map((tab, index) => {
        const isSelected = tabs[currentStep - 1] === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setCurrentStep(index + 1)}
            className={`flex justify-between items-center w-full font-bold text-xl text-black-100 py-5 px-8 ${isSelected ? 'bg-orange-300 rounded-2xl text-gray-50' : ''} `}
          >
            <div className="flex items-center gap-6">
              <div
                className={`flex justify-center items-center w-7 h-7 bg-background-300 rounded-full text-gray-200 ${isSelected ? 'bg-orange-50 text-orange-300' : ''}`}
              >
                {index + 1}
              </div>
              {tab}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FormTabs;
