import React, { Suspense, useRef, useState } from "react";
import {
  OrbitControls,
} from "@react-three/drei";
import {
  Canvas
} from "@react-three/fiber";
import Table from "./models/Table";
import state from "./state.json";
import InventorySystem from "./ui_overlay/InventorySystem";
import { CameraAdjuster } from "./utils/CameraAdjuster";
import { Camera } from "three";

// Step components
import Step1Introduction from "./steps/01IntroduceLabObjectives";
import Step2SelectApparatus from "./steps/02ApparatusAndChemicalSelection";
import Step3TransferStandardSolution from "./steps/03TransferStandardSolution";
import Step04ChoosePipette from "./steps/04ChoosePipette";
import Step5SelectTheCorrectGlassPipette from "./steps/05SelectTheCorrectGlassPipette";
import Step6AttachPipetteFiller from "./steps/06AttachPipetteFiller";
import Step7FillThePipette from "./steps/07FillThePipette";
import Step8TransferToFlask from "./steps/08TransferSolutionToVolumetricFlask";
import Step11AddStopperAndMixSolution from "./steps/11AddStopperAndMixSolution";
import Step12PrepareAdditionalDilutions from "./steps/12PrepareAdditionalDilutions";
import PrepareBlankSolution from "./steps/13PrepareBlankSolution";

// Chatbot support
import Chatbot from "~/components/ChatBot";
import useContextFromFile from "~/components/useContextFromFile";

// Interfaces
interface Step {
  stepTitle: string;
  description: string;
  directions: string;
  objectsInFocus: string[];
  contextFileName?: string;
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
  [key: string]: Step;
}

type StateKey = keyof State;

interface StepComponentRef {
  replayAnimation?: () => void;
}

interface SelectedItems {
  [itemName: string]: boolean;
}

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

// Utility functions
export const getClassNameForNext = (isDisabled: boolean): string => {
  let str =
    "flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ";
  if (isDisabled) str += "cursor-not-allowed bg-gray-400 opacity-50";
  return str;
};

export const setNextDisabled = (nextButtonRef: React.RefObject<HTMLButtonElement>) => {
  if (nextButtonRef?.current) {
    nextButtonRef.current.disabled = true;
    nextButtonRef.current.className = getClassNameForNext(true);
  }
};

export const setNextEnabled = (nextButtonRef: React.RefObject<HTMLButtonElement>) => {
  if (nextButtonRef?.current) {
    nextButtonRef.current.disabled = false;
    nextButtonRef.current.className = getClassNameForNext(false);
  }
};

// Main component
export default function Experience({
  currentStep,
  onStepChange,
  cameraConfig,
  canInteract = true,
}: ExperienceProps) {
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];

  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [nextButtonTempDisabled, setNextButtonTempDisabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [isInventoryVisible, setIsInventoryVisible] = useState(false);

  const fileContext = useContextFromFile(stepData.contextFileName || "");
  const chatbotContext = fileContext
    ? [fileContext]
    : [
        `Description: ${stepData.description}`,
        `Directions: ${stepData.directions}`,
        `Objects in Focus: ${stepData.objectsInFocus.join(", ")}`,
      ];

  const requiredItems = new Set([
    "Beaker",
    "Glass Pipette",
    "Glass Dropper",
    "Stopper",
    "Distilled Water",
  ]);

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
      const allSelected = Array.from(requiredItems).every((item) => newSelectedItems[item]);
      if (allSelected && nextButtonRef.current) {
        setNextEnabled(nextButtonRef);
      }
      return newSelectedItems;
    });
  };

  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
        <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
          <p className="text-lg font-thin text-white">Loading Resources</p>
          <img src="loadingQ2L.svg" alt="Loading" className="m-auto h-20 w-20" />
        </div>
      </div>
    }>
      <div style={{ position: "relative", height: "100vh" }}>
        {/* Inventory Toggle */}
        {currentStep === 2 && !isInventoryVisible && canInteract && (
          <button
            onClick={handleToggleInventory}
            className="absolute left-4 top-4 z-50 m-4 rounded-md bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          >
            Open Inventory
          </button>
        )}

        {/* Canvas */}
        <Canvas
          shadows
          camera={{
            fov: 45,
            position: cameraConfig?.position || [11.57, 10.1, -0.314],
            zoom: cameraConfig?.zoom || 1,
          }}
          style={{ background: "#37474f" }}
        >
          <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
          <OrbitControls minDistance={9} maxDistance={70} />
          <ambientLight intensity={1.6} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />

          <Table scale={13} position-y={-1} />
          <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={605}>
            <planeGeometry />
            <meshStandardMaterial color="#37474f" />
          </mesh>

          {/* Steps */}
          {currentStep === 1 && <Step1Introduction />}
          {currentStep === 2 && <Step2SelectApparatus selectedItems={selectedItems} nextButtonRef={nextButtonRef} />}
          {currentStep === 3 && <Step3TransferStandardSolution nextButtonRef={nextButtonRef} />}
          {currentStep === 4 && <Step04ChoosePipette nextButtonRef={nextButtonRef} />}
          {currentStep === 5 && <Step5SelectTheCorrectGlassPipette nextButtonRef={nextButtonRef} />}
          {currentStep === 6 && <Step6AttachPipetteFiller nextButtonRef={nextButtonRef} />}
          {currentStep === 7 && <Step7FillThePipette nextButtonRef={nextButtonRef} />}
          {currentStep === 8 && <Step8TransferToFlask selectedItems={selectedItems} nextButtonRef={nextButtonRef} />}
          {currentStep === 11 && <Step11AddStopperAndMixSolution nextButtonRef={nextButtonRef} />}
          {currentStep === 12 && <Step12PrepareAdditionalDilutions nextButtonRef={nextButtonRef} />}
        </Canvas>

        {/* Inventory Panel */}
        {currentStep === 2 && canInteract && (
          <InventorySystem
            onItemSelect={handleItemSelection}
            selectedItems={selectedItems}
            toggleInventory={handleToggleInventory}
            isInventoryVisible={isInventoryVisible}
          />
        )}

        {/* Step Instructions + Next Button */}
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
              <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
                {"user_instructions" in stepData ? stepData.user_instructions : null}
              </p>
            </div>
            <div className="ml-4 flex flex-col justify-between self-stretch">
              <button
                onClick={handleNextStep}
                disabled={currentStep === 13 || nextButtonTempDisabled}
                className={`flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                  currentStep === 13 || nextButtonTempDisabled ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
                }`}
                ref={nextButtonRef}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>

        {/* Chatbot Component */}
        <Chatbot context={chatbotContext} />
      </div>
    </Suspense>
  );
}
