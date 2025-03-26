import React, { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Table from "./Table";
// ... other necessary imports ...
import state from "./state.json";
import InventorySystem from "./InventorySystem";
import { Canvas } from "@react-three/fiber";
import { CameraAdjuster } from "./CameraAdjuster";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import FirstStepComponent from "./steps/FirstStepComponent";
import SecondStepComponent from "./steps/SecondStepComponent";
import ThirdStepComponent from "./steps/ThirdStepComponent";
import FourthStepComponent from "./steps/FourthStepComponent";
import FifthStepComponent from "./steps/FifthStepComponent";
import SixthStepComponent from "./steps/SixthStepComponent";
import SeventhStepComponent from "./steps/SeventhStepComponent";
import EightStepComponent from "./steps/EightStepComponent";
import NinthStepComponent from "./steps/NinthStepComponent";
import TenthStepComponent from "./steps/TenthStepComponent";
import EleventhStepComponent from "./steps/EleventhStepComponent";
import TwelvthStepComponent from "./steps/TwelvthStepComponent";
import FinishedStepComponent from "./steps/FinishedStepComponent";

// Type definitions
interface Step {
  stepTitle: string;
  description: string;
  directions: string;
  objectsInFocus: string[];
  user_instructions?: string;
  mistakes?: {
    mistakeDescription: string;
    context: string;
    correctAnswer: string[];
    category: string;
    count: number;
    userAnswers: string[];
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
  // If you actually go to 13 in `state.json`, add "13": Step; as well
}

type StateKey = keyof State;

interface StepComponentRef {
  replayAnimation?: () => void;
}

interface SelectedItems {
  [itemName: string]: boolean;
}

export const getClassNameForNext = (isDisabled: boolean): string => {
  let str =
    "flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ";
  if (isDisabled) str += "cursor-not-allowed bg-gray-400 opacity-50";
  return str;
};

export const setNextDisabled = (
  nextButtonRef: React.RefObject<HTMLButtonElement>,
) => {
  if (nextButtonRef.current) {
    nextButtonRef.current.disabled = true;
    nextButtonRef.current.className = getClassNameForNext(true);
  }
};

export const setNextEnabled = (
  nextButtonRef: React.RefObject<HTMLButtonElement>,
) => {
  if (nextButtonRef.current) {
    nextButtonRef.current.disabled = false;
    nextButtonRef.current.className = getClassNameForNext(false);
  }
};


interface CameraConfig {
  position?: [number, number, number];
  zoom?: number;
  viewLocation?: [number, number, number] | null;
  // originalViewPoint?: {
  //   position: [number, number, number];
  //   zoom: number;
  // };
}
interface ExperienceProps {
  currentStep: number;
  onStepChange: (newStep: number) => void;
  cameraConfig?: CameraConfig;
}

export default function Experience({ currentStep, onStepChange, cameraConfig }: ExperienceProps) {
  // `currentStep` comes from parent; no local state needed
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];

  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  // If certain items are required for a step, define them here:
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const requiredItems = new Set([
    "Analytical Balance",
    "Weighing Paper",
    "Beaker",
    "Spatula",
    "Powder Sample",
  ]);

  const [nextButtonTempDisabled, setNextButtonTempDisabled] = useState(false);

  // For steps that have a "replayAnimation" method
  const stepsWithRefs = new Set([4, 5, 6, 7, 8, 10]);
  const hasReplayAnimation: boolean = stepsWithRefs.has(currentStep);

  function handleToggleInventory() {
    setIsInventoryVisible(!isInventoryVisible);
  }

  function handleNextStep() {
    if (currentStep < 13) {
      onStepChange(currentStep + 1); // let parent handle the logic
      setNextDisabled(nextButtonRef);
    }
  }

  function handleItemSelection(itemName: string, isCorrect: boolean) {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [itemName]: isCorrect };

      // Check if all required items are selected
      const allSelected = Array.from(requiredItems).every(
        (item) => newSelectedItems[item],
      );
      if (allSelected && nextButtonRef.current) {
        setNextEnabled(nextButtonRef);
      }
      return newSelectedItems;
    });
  }

  function handleReplayAnimation() {
    const currentStepRef = stepRefs.current[currentStep];
    if (currentStepRef && currentStepRef.replayAnimation) {
      currentStepRef.replayAnimation();
    }
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
          <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-lg font-thin text-white">Loading Resources</p>
            <img
              src="/loadingQ2L.svg"
              alt="Loading"
              className="m-auto h-20 w-20"
            />
          </div>
        </div>
      }
    >
      <div style={{ position: "relative", height: "100vh" }}>
        {/* Inventory toggle button (example for step 3) */}
        {currentStep === 3 && !isInventoryVisible && (
          <button
            onClick={handleToggleInventory}
            className="absolute left-4 top-4 z-50 m-4 rounded-md bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Open Inventory
          </button>
        )}

        <Canvas
          shadows
          camera={{
            fov: 45,
            position: cameraConfig?.position || [11.57, 10.1, -0.314],
            zoom: cameraConfig?.zoom || 1,
          }}
        >
          <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
          <OrbitControls minDistance={9} maxDistance={70} />

          <ambientLight intensity={1.6} />
          <directionalLight
            castShadow
            position={[1, 2, 3]}
            intensity={1.5}
            shadow-normalBias={0.04}
          />

          {/* Common elements like Table */}
          <Table scale={13} position-y={-1} />

          {/* Example ground plane */}
          <mesh
            receiveShadow
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={65}
          >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>

          {/* Step components conditionally rendered */}
          {currentStep === 1 && <FirstStepComponent />}
          {currentStep === 2 && <SecondStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 3 && (
            <ThirdStepComponent
              selectedItems={selectedItems}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 4 && (
            <FourthStepComponent
              ref={(el) => {
                stepRefs.current[4] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 5 && (
            <FifthStepComponent
              ref={(el) => {
                stepRefs.current[5] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 6 && (
            <SixthStepComponent
              ref={(el) => {
                stepRefs.current[6] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 7 && (
            <SeventhStepComponent
              ref={(el) => {(stepRefs.current[7] = el as StepComponentRef)}}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 8 && (
            <EightStepComponent
              ref={(el) => {(stepRefs.current[8] = el as StepComponentRef)}}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 9 && <NinthStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 10 && (
            <TenthStepComponent
              ref={(el) => {
                stepRefs.current[10] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 11 && <EleventhStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 12 && <TwelvthStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 13 && <FinishedStepComponent nextButtonRef={nextButtonRef} />}
        </Canvas>

        {/* Inventory, if step = 3 */}
        {currentStep === 3 && (
          <InventorySystem
            onItemSelect={handleItemSelection}
            selectedItems={selectedItems}
            toggleInventory={handleToggleInventory}
            isInventoryVisible={isInventoryVisible}
          />
        )}

        {/* Step Instructions + Next Button Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.2)",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div className="flex items-stretch justify-center">
            <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
              <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
              <p className="text-white">{stepData.directions}</p>
              <p className=" pt-2 font-mono text-xs font-extralight text-fuchsia-300">
                {"user_instructions" in stepData
                  ? stepData.user_instructions
                  : null}
              </p>
            </div>
            <div className="ml-4 flex flex-col justify-between self-stretch">
              <button
                onClick={handleNextStep}
                disabled={currentStep === 13 || nextButtonTempDisabled}
                className={`flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                  currentStep === 13 || nextButtonTempDisabled
                    ? "cursor-not-allowed bg-gray-400 opacity-50"
                    : ""
                }`}
                ref={nextButtonRef}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
