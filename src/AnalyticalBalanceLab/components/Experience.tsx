import React, { Dispatch, SetStateAction, Suspense, useEffect, useRef, useState } from "react";
import {
  CameraControls,
  CameraControlsProps,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
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
import FinishedStepComponent from "./steps/FinishedStepComponent";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraAdjuster } from "./CameraAdjuster";
import { Camera, Vector3 } from "three";
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';

// Interface for the structure of each step in state.json
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
  if (nextButtonRef && nextButtonRef.current) {
    nextButtonRef.current.disabled = true;
    nextButtonRef.current.className = getClassNameForNext(true);
  }
};

export const setNextEnabled = (
  nextButtonRef: React.RefObject<HTMLButtonElement>,
) => {
  if (nextButtonRef && nextButtonRef.current) {
    nextButtonRef.current.disabled = false;
    nextButtonRef.current.className = getClassNameForNext(false);
  }
};

function usePersistedState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [analyticalBalanceValue, setAnalyticalBalanceValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(analyticalBalanceValue));
  }, [key, analyticalBalanceValue])
  return [analyticalBalanceValue, setAnalyticalBalanceValue]
}

export default function Experience() {
  const navigate = useNavigate()
  const {step} = useParams()
  const [currentStep, setCurrentStep] = usePersistedState<number>('AnalyticalBalanceCurrentStep', 1);
  const key = currentStep.toString() as StateKey;
  const stepData = state[key]; // Safe indexing
  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  // const replayButtonRef = useRef<HTMLButtonElement>(null);

  const cameraControlsRef = useRef<Camera>(null);
  const [nextButtonTempDisabled, setNextButtonTempDisabled] = useState(false);
  const requiredItems = new Set([
    "Analytical Balance",
    "Weighing Paper",
    "Beaker",
    "Spatula",
    "Powder Sample",
  ]);

  useEffect(() => {
    const urlStep = parseInt(step || '');
    if (
      !isNaN(urlStep) &&
      urlStep >= 1 &&
      urlStep <= Object.keys(state).length
    ) {
      localStorage.setItem("currentStep", JSON.stringify(urlStep))
    } else {
      const savedStep = localStorage.getItem("AnalyticalBalanceCurrentStep");
      navigate(`/analytical_balance_lab/step/${savedStep}`, {replace: true});
    }
  }, [step, currentStep, navigate])
  useEffect(() => {
    if ((step !== currentStep.toString())) {
      navigate(`/analytical_balance_lab/step/${currentStep}`, {replace: true});
    }
  })

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);

  const handleToggleInventory = () => {
    setIsInventoryVisible(!isInventoryVisible);
  };

  const handleNextStep = () => {
    if (currentStep < Object.keys(state).length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      navigate(`/analytical_balance_lab/step/${currentStep}`)
      setNextDisabled(nextButtonRef);
      // setNextButtonTempDisabled(true);
      // setTimeout(() => {
      //   setNextButtonTempDisabled(false);
      // }, 2000);
    }
  };

  const handleItemSelection = (itemName: string, isCorrect: boolean) => {
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
  };

  const handleReplayAnimation = () => {
    const currentStepRef = stepRefs.current[currentStep];
    if (currentStepRef && currentStepRef.replayAnimation) {
      currentStepRef.replayAnimation();
    }
  };

  const stepsWithRefs = new Set([4, 5, 6, 7, 8, 10]); // Add other steps as needed

  // Check if the current step has a replay animation
  const hasReplayAnimation: boolean = stepsWithRefs.has(currentStep);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
          <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-lg font-thin text-white">
              {"Loading Resources"}
            </p>
            <img
              src="loadingQ2L.svg"
              alt="Loading"
              className="m-auto h-20 w-20"
            />
          </div>
        </div>
      }
    >
      <div style={{ position: "relative", height: "100vh" }}>
        {/* Inventory toggle button */}
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
            // near: 0.1,
            // far: 200,
            position: [11.57, 10.1, -0.314],
          }}
        >
          <CameraAdjuster />
          {/* <CameraControls makeDefault ref={cameraControlsRef} onStart={() => {
          cameraControlsRef.current?.setFocalOffset(0,-2.5,0, true);
        }}/> */}
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
          {/* Green-yellow plane */}
          <mesh
            receiveShadow
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={65}
          >
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>

          {/* Conditional Rendering of Step Components */}
          {currentStep === 1 && <FirstStepComponent />}
          {currentStep === 2 && (
            <SecondStepComponent nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 3 && (
            <ThirdStepComponent
              selectedItems={selectedItems}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 4 && (
            <FourthStepComponent
              ref={(el) => (stepRefs.current[4] = el as StepComponentRef)}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 5 && (
            <FifthStepComponent
              ref={(el) => (stepRefs.current[5] = el as StepComponentRef)}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 6 && (
            <SixthStepComponent
              ref={(el) => (stepRefs.current[6] = el as StepComponentRef)}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 7 && (
            <SeventhStepComponent
              ref={(el) => (stepRefs.current[7] = el as StepComponentRef)}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 8 && (
            <EightStepComponent
              ref={(el) => (stepRefs.current[8] = el as StepComponentRef)}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 9 && (
            <NinthStepComponent nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 10 && (
            <TenthStepComponent
              ref={(el) => (stepRefs.current[10] = el as StepComponentRef)}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 11 && (
            <EleventhStepComponent nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 12 && (
            <TwelvthStepComponent nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 13 && (
            <FinishedStepComponent nextButtonRef={nextButtonRef} />
          )}
          {/* ...add more steps as needed... */}
        </Canvas>
        
        {currentStep === 3 && (
          <InventorySystem
            onItemSelect={handleItemSelection}
            selectedItems={selectedItems}
            toggleInventory={handleToggleInventory}
            isInventoryVisible={isInventoryVisible}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.2)", // Semi-transparent background
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
