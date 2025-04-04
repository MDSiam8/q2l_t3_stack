import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step {
  stepTitle: string;
  directions: string;
  user_instructions?: string;
}

interface MobileMenuProps {
  stepData: Step;
  currentStep: number;
  isNextDisabled: boolean;
  onNextStep: () => void;
}

const getClassNameForNext = (isDisabled: boolean): string =>
  `flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
    isDisabled ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
  }`;

export default function MobileMenu({ stepData, currentStep, isNextDisabled, onNextStep }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLastStep = currentStep === 13;
  const nextButtonClass = getClassNameForNext(isLastStep || isNextDisabled);

  return (
    <>
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Current Step</h2>
          <div className="p-3 rounded-lg bg-gray-700 flex-grow">
            <h3 className="font-semibold">{stepData.stepTitle}</h3>
            <p className="text-sm text-gray-300">{stepData.directions}</p>
            {stepData.user_instructions && (
              <p className="text-xs text-blue-300 mt-1">{stepData.user_instructions}</p>
            )}
          </div>
          <button onClick={onNextStep} disabled={isLastStep || isNextDisabled} className={`${nextButtonClass} mt-4 w-full`}>
            Next Step
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        {isMenuOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </>
  );
}