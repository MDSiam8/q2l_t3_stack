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
  `px-4 py-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 font-bold text-white transition duration-300 hover:scale-105 ${
    isDisabled ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
  }`;

export default function DesktopControls({ stepData, currentStep, isNextDisabled, onNextStep }: DesktopControlsProps) {
  const isLastStep = currentStep === 13;
  const nextButtonClass = getClassNameForNext(isLastStep || isNextDisabled);

  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex justify-center">
      <div className="flex items-center p-4 max-w-3xl gap-4 w-4/5">
        <div className="rounded-lg bg-gray-700 bg-opacity-80 p-4 text-center pointer-events-auto flex-grow hidden md:block">
          <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
          <p className="text-white text-sm">{stepData.directions}</p>
          {stepData.user_instructions && (
            <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">{stepData.user_instructions}</p>
          )}
        </div>
        <button
          onClick={onNextStep}
          disabled={isLastStep || isNextDisabled}
          className={`${nextButtonClass} pointer-events-auto hidden md:block`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}