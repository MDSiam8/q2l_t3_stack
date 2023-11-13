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

export default function Experience() {
  const [currentStep, setCurrentStep] = useState(1);
  const stepData = state[currentStep.toString()];
  const stepRefs = useRef({}); // Store refs for each step

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

  // Check if the current step has a replay animation
  let hasReplayAnimation : boolean = true; // This will later be refined for better UX

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
      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={15}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      
      {/* Conditional Rendering of Step Components */}
      {currentStep === 1 && (
        <FirstStepComponent />
      )}
      {currentStep === 2 && (
        <SecondStepComponent ref={(el) => (stepRefs.current[2] = el)} />
      )}
      {currentStep === 3 && (
      <ThirdStepComponent />
      )}
      {currentStep === 4 && (
        <FourthStepComponent ref={(el) => (stepRefs.current[4] = el)} />
      )}
      {currentStep === 5 && (
        <FifthStepComponent ref={(el) => (stepRefs.current[5] = el)} />
      )}
      {currentStep === 6 && (
        <SixthStepComponent ref={(el) => (stepRefs.current[6] = el)} />
      )}
      {/* ...add more steps as needed... */}

      <Html className="" wrapperClass="w-10/12 p-4" center transform position={[0, 10, 0]} rotation-y={(3.14 / 180) * 90} zIndexRange={[101, 0]}>
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
            <p className="text-white">{stepData.directions}</p>
          </div>
          <div className="ml-4 flex flex-col justify-between self-stretch">
            <button
              onClick={handleNextStep}
              className="mb-2 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
            >
              Next Step
            </button>
            <button
              onClick={handleReplayAnimation}
              disabled={!hasReplayAnimation}
              className={`flex-grow transform rounded-lg px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${!hasReplayAnimation ? "bg-gray-400" : "bg-gradient-to-r from-green-400 to-blue-500"}`}
            >
              Replay Animation
            </button>
          </div>
        </div>
      </Html>
    </>
  );
}
