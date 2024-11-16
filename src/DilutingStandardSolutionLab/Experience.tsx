import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  CameraControls,
  CameraControlsProps,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Step1Introduction from "./steps/01IntroduceLabObjectives";
import Table from "./models/Table";
import state from "./state.json";
import InventorySystem from "./ui_overlay/InventorySystem";
import Step2SelectApparatus from "./steps/02ApparatusAndChemicalSelection";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraAdjuster } from "./utils/CameraAdjuster";
import { Camera, Vector3 } from "three";
import Step5SelectTheCorrectGlassPipette from './steps/05SelectTheCorrectGlassPipette';
import Step6AttachPipetteFiller from './steps/06AttachPipetteFiller';

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

export default function Experience() {
  const [currentStep, setCurrentStep] = useState<number>(6);
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];
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

  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);

  const handleToggleInventory = () => {
    setIsInventoryVisible(!isInventoryVisible);
  };

  const handleNextStep = () => {
    if (currentStep < Object.keys(state).length) {
      setCurrentStep(currentStep + 1);
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
        {currentStep === 2 && !isInventoryVisible && (
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
          style={{ background: "#37474f" }} // Subtle light gray background

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
            scale={605}
          >
            <planeGeometry />
            <meshStandardMaterial color="#37474f" /> {/* Soft minty green */}
            </mesh>

          {/* Conditional Rendering of Step Components */}
          {currentStep === 1 && <Step1Introduction />}
          {currentStep === 2 && (
            <Step2SelectApparatus
              selectedItems={selectedItems}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 5 && (
            <Step5SelectTheCorrectGlassPipette nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 6 && (
            <Step6AttachPipetteFiller nextButtonRef={nextButtonRef} />
          )}
          {/* ...add more steps as needed... */}
        </Canvas>
         
        {currentStep === 2 && (
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
