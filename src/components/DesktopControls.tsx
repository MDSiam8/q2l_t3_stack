import React from "react";

interface Step {
  stepTitle: string;
  directions: string;
  user_instructions?: string;
}

interface DesktopControlsProps {
  stepData: Step;
  currentStep: number;
  isNextDisabled: boolean;
  onNextStep: () => void;
}

const getClassNameForNext = (isDisabled: boolean): string =>
  `flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
    isDisabled ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
  }`;

export default function DesktopControls({ stepData, currentStep, isNextDisabled, onNextStep }: DesktopControlsProps) {
  const isLastStep = currentStep === 13;
  const nextButtonClass = getClassNameForNext(isLastStep || isNextDisabled);

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
      <div className="flex justify-center items-center p-4">
        <div className="w-1/2 rounded-lg bg-gray-700 bg-opacity-80 p-4 text-center backdrop-blur-sm pointer-events-auto hidden md:block">
          <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
          <p className="text-white text-sm">{stepData.directions}</p>
          {stepData.user_instructions && (
            <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">{stepData.user_instructions}</p>
          )}
        </div>
        <button
          onClick={onNextStep}
          disabled={isLastStep || isNextDisabled}
          className={`${nextButtonClass} ml-4 pointer-events-auto md:block hidden`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}