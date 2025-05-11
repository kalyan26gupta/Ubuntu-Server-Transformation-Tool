import React, { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}
export function StepIndicator({
  steps,
  currentStep
}: StepIndicatorProps) {
  return <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => <Fragment key={index}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${index < currentStep ? 'bg-indigo-600 border-indigo-600 text-white' : index === currentStep ? 'border-indigo-600 text-indigo-600' : 'border-gray-300 text-gray-300'}`}>
                {index < currentStep ? <CheckIcon size={18} /> : <span>{index + 1}</span>}
              </div>
              <span className={`mt-2 text-sm ${index <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 
                  ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`} />}
          </Fragment>)}
      </div>
    </div>;
}