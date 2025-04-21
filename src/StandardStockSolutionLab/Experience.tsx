"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  CameraControls,
  CameraControlsProps,
  Html,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";
import Step1Introduction from "./steps/01IntroduceLabObjectives";
import Step2ExplainTask from "./steps/02ExplainTask";
import Step4OpenSideWindow from "./steps/04OpenSideWindow";
import Table from "./models/Table";
import state from "./state.json";
import InventorySystem from "./ui_overlay/InventorySystem";
import Step3SelectApparatus from "./steps/03ApparatusSelection";
import Step5FoldWeighingPaper from "./steps/05FoldWeighingPaper";
import Step6PlaceWeighingPaper from "./steps/06PlaceWeighingPaper";
import Step7AddPowder from "./steps/07AddPowderSample";
import EightStepComponent from "./steps/08CloseSideWindow";
import Step9ReadWeight from "./steps/09ReadWeightOfSample";
import Step10TransferSample from "./steps/10TransferSampleToBeaker";
import Step11ReadPaperWeight from "./steps/11ReadWeighingPaperWeight";
import Step12CalculateSamplePowderWeight from "./steps/12CalculateSamplePowderWeight";
import FinishedStepComponent from "./steps/20FinishedStepComponent";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraAdjuster } from "./utils/CameraAdjuster";
import { Camera, Vector3 } from "three";
import Step15CheckBeakerResidue from "./steps/15CheckBeakerResidue";
import Step16DiluteSolutionInFlask from "./steps/16DiluteSolutionInFlask";
import Step17EyeDropper from "./steps/17EyeDropper";
import { LabEnvironment } from "./models/LabEnvironment";
import Step13DissolveSample from "./steps/13DissolveSample";
import Step14TransferSolution from "./steps/14TransferSolutionToFlask";
import Step19MixSolution from "./steps/19MixSolution";
import Step18AttachStopper from "./steps/18AddStopperAndMix";

// Interfaces for steps and state
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
  "13": Step;
  "14": Step;
  "15": Step;
  "16": Step;
  "17": Step;
  "18": Step;
  "19": Step;
  "20": Step;
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

interface CameraConfig {
  position?: [number, number, number];
  zoom?: number;
  viewLocation?: [number, number, number] | null;
}


interface ExperienceProps {
  currentStep: number;
  onStepChange: (newStep: number) => void;
  cameraConfig?: CameraConfig;
  canInteract?: boolean;
}

export default function Experience({
  currentStep,
  onStepChange,
  cameraConfig,
  canInteract = true,
}: ExperienceProps) {
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];
  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

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
      onStepChange(currentStep + 1);
      setNextDisabled(nextButtonRef);
    }
  };

  const handleItemSelection = (itemName: string, isCorrect: boolean) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [itemName]: isCorrect };

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

  const stepsWithRefs = new Set([4, 5, 6, 7, 8, 10]);
  const hasReplayAnimation: boolean = stepsWithRefs.has(currentStep);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
          <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-lg font-thin text-white">Loading Resources</p>
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
        {currentStep === 3 && !isInventoryVisible && canInteract && (
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
          style={{ background: "#37474f"}}
        >
          <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
          <OrbitControls minDistance={9} maxDistance={700} />

          <ambientLight intensity={1.6} />
          <directionalLight
            castShadow
            position={[1, 2, 3]}
            intensity={1.5}
            shadow-normalBias={0.04}
          />

          <Table scale={13} position-y={-1} />
          <mesh
            receiveShadow
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={605}
          >
            <planeGeometry />
            <meshStandardMaterial color="#37474f" />
          </mesh>

          {currentStep === 1 && <Step1Introduction />}
          {currentStep === 2 && (
            <Step2ExplainTask nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 3 && (
            <Step3SelectApparatus
              selectedItems={selectedItems}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 4 && (
            <Step4OpenSideWindow
              ref={(el) => {
                stepRefs.current[4] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 5 && (
            <Step5FoldWeighingPaper
              ref={(el) => {
                stepRefs.current[5] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 6 && (
            <Step6PlaceWeighingPaper
              ref={(el) => {
                stepRefs.current[6] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 7 && (
            <Step7AddPowder
              ref={(el) => {
                stepRefs.current[7] = el as StepComponentRef;
              }}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 8 && (
            <EightStepComponent
              ref={(el) => {
                stepRefs.current[8] = el as StepComponentRef;
              }}
              setIsAnimating={setIsAnimating}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 9 && (
            <Step9ReadWeight nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 10 && (
            <Step10TransferSample
              ref={(el) => {
                stepRefs.current[10] = el as StepComponentRef;
              }}
              nextButtonRef={nextButtonRef}
            />
          )}
          {currentStep === 11 && (
            <Step11ReadPaperWeight nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 12 && (
            <Step12CalculateSamplePowderWeight nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 13 && (
            <Step13DissolveSample nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 14 && (
            <Step14TransferSolution nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 15 && (
            <Step15CheckBeakerResidue nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 16 && (
            <Step16DiluteSolutionInFlask nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 17 && (
            <Step17EyeDropper nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 18 && (
            <Step18AttachStopper nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 19 && (
            <Step19MixSolution nextButtonRef={nextButtonRef} />
          )}
          {currentStep === 20 && (
            <FinishedStepComponent nextButtonRef={nextButtonRef} />
          )}
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
              <h1 className="mb-2 text-lg text-white">
                {stepData.stepTitle}
              </h1>
              <p className="text-white">{stepData.directions}</p>
              <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
                {"user_instructions" in stepData
                  ? stepData.user_instructions
                  : null}
              </p>
            </div>
            <div className="ml-4 flex flex-col justify-between self-stretch">
              <button
                onClick={handleNextStep}
                disabled={nextButtonTempDisabled}
                className={`flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                  nextButtonTempDisabled
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
