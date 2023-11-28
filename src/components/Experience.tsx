import React, { useRef, useState } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import FirstStepComponent from "./steps/FirstStepComponent";
import SecondStepComponent from "./steps/SecondStepComponent";
import FourthStepComponent from "./steps/FourthStepComponent";
import Table from "./Table";
// ...other necessary imports...

import state from "./state.json";
import InventorySystem from "./InventorySystem";
import ThirdStepComponent from "./steps/ThirdStepComponent";
import FifthStepComponent from "./steps/FifthStepComponent";
import SixthStepComponent from "./steps/SixthStepComponent";
import SeventhStepComponent from "./steps/SeventhStepComponent";
import EightStepComponent from "./steps/EightStepComponent";
import NinthStepComponent from "./steps/NinthStepComponent";
import TenthStepComponent from "./steps/TenthStepComponent";
import EleventhStepComponent from "./steps/EleventhStepComponent";
import TwelvthStepComponent from "./steps/TwelvthStepComponent";

// Interface for the structure of each step in state.json
interface Step {
  stepTitle: string;
  description: string;
  directions: string;
  objectsInFocus: string[];
  mistakes?: {
    mistakeDescription: string;
    context: string;
    correctAnswer: string[];
    category: string;
    count: number;
    userAnswers: string[]; // Adjust as needed for dynamic content
  }[];
}

interface State {
  "1": Step;
  "2": Step;
  "3": Step;
  "4": Step;
  "5": Step;
  "6": Step;
  "7": Step;
  "8": Step;
  "9": Step;
  "10": Step;
  "11": Step;
  "12": Step;
}

type StateKey = keyof State;

// Correctly type your step component refs if they have specific methods or properties
interface StepComponentRef {
  replayAnimation?: () => void;
  // other methods or properties
}

export default function Experience() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const key = currentStep.toString() as StateKey;
  const stepData = state[key]; // Safe indexing
  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleNextStep = () => {
    if (currentStep < Object.keys(state).length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReplayAnimation = () => {
    const currentStepRef = stepRefs.current[currentStep];
    if (currentStepRef && currentStepRef.replayAnimation) {
      currentStepRef.replayAnimation();
    }
  };

  const stepsWithRefs = new Set([4, 5, 6, 7, 8, 10]); // Add other steps as needed

  // Check if the current step has a replay animation
  const hasReplayAnimation : boolean = stepsWithRefs.has(currentStep);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1.6} />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />

      {/* Common elements like Table */}
      <Table scale={13} position-y={-1} />
      {/* Green-yellow plane */}
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={15}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* Conditional Rendering of Step Components */}
      {currentStep === 1 && <FirstStepComponent />}
      {currentStep === 2 && <SecondStepComponent />}
      {currentStep === 3 && <ThirdStepComponent />}
      {currentStep === 4 && (
        <FourthStepComponent
          ref={(el) => (stepRefs.current[4] = el as StepComponentRef)}
        />
      )}
      {currentStep === 5 && (
        <FifthStepComponent ref={(el) => (stepRefs.current[5] = el as StepComponentRef)} />
      )}
      {currentStep === 6 && (
        <SixthStepComponent ref={(el) => (stepRefs.current[6] = el as StepComponentRef)} />
      )}
      {currentStep === 7 && (
        <SeventhStepComponent
          ref={(el) => (stepRefs.current[7] = el as StepComponentRef)}
          setIsAnimating={setIsAnimating}
        />
      )}
      {currentStep === 8 && (
        <EightStepComponent
          ref={(el) => (stepRefs.current[8] = el as StepComponentRef)}
          setIsAnimating={setIsAnimating}
        />
      )}
      {currentStep === 9 && (
        <NinthStepComponent
          nextButtonRef={nextButtonRef}
        />
      )}
      {currentStep === 10 && (
        <TenthStepComponent
          ref={(el) => (stepRefs.current[10] = el as StepComponentRef)}
          nextButtonRef={nextButtonRef}
        />
      )}
      {currentStep === 11 && (
        <EleventhStepComponent
          nextButtonRef={nextButtonRef}
        />
      )}
      {currentStep === 12 && (
        <TwelvthStepComponent
          nextButtonRef={nextButtonRef}
        />
      )}
      {/* ...add more steps as needed... */}

      <Html
        scale={0.5}
        className=""
        wrapperClass="w-10/12 p-4"
        center
        transform
        position={[0, 10, 0]}
        rotation-y={(3.14 / 180) * 90}
        zIndexRange={[101, 0]}
      >
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
            <p className="text-white">{stepData.directions}</p>
          </div>
          <div className="ml-4 flex flex-col justify-between self-stretch">
            <button
              onClick={handleNextStep}
              disabled={isAnimating}
              className={`mb-2 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                isAnimating ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
              }`}
              ref={nextButtonRef}
            >
              Next Step
            </button>
            <button
              onClick={handleReplayAnimation}
              disabled={isAnimating || !hasReplayAnimation}
              className={`flex-grow transform rounded-lg px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                isAnimating || !hasReplayAnimation
                  ? "cursor-not-allowed bg-gray-400 opacity-50"
                  : "bg-gradient-to-r from-green-400 to-blue-500"
              }`}
            >
              Replay Animation
            </button>
          </div>
        </div>
      </Html>
    </>
  );
}
