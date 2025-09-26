import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isCompleted = currentStep > stepIndex;
        const isActive = currentStep === stepIndex;

        return (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-primary text-white' : isCompleted ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-bold">{stepIndex}</span>
                )}
              </div>
              <p className={`ml-3 font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-text-muted'}`}>
                {step}
              </p>
            </div>
            {stepIndex < steps.length && (
              <div className={`flex-auto border-t-2 transition-colors duration-300 mx-4 ${isCompleted ? 'border-secondary' : 'border-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
