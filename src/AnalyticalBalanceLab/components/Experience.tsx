import React, { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Table from "./Table";
import state from "./state.json";
import InventorySystem from "./InventorySystem";
import { Canvas } from "@react-three/fiber";
import { CameraAdjuster } from "./CameraAdjuster";
import useContextFromFile from "~/components/useContextFromFile";
import Chatbot from "~/components/ChatBot";

// Step components
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

// Types
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

export const getClassNameForNext = (isDisabled: boolean): string => {
  let str =
    "flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ";
  if (isDisabled) str += "cursor-not-allowed bg-gray-400 opacity-50";
  return str;
};

export const setNextDisabled = (nextButtonRef: React.RefObject<HTMLButtonElement>) => {
  if (nextButtonRef.current) {
    nextButtonRef.current.disabled = true;
    nextButtonRef.current.className = getClassNameForNext(true);
  }
};

export const setNextEnabled = (nextButtonRef: React.RefObject<HTMLButtonElement>) => {
  if (nextButtonRef.current) {
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

export default function Experience({ currentStep, onStepChange, cameraConfig, canInteract = true }: ExperienceProps) {
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];

  const fileName = stepData.contextFileName || "";
  const fileContext = useContextFromFile(fileName);
  const chatbotContext = fileContext
    ? [fileContext]
    : [
        `Description: ${stepData.description}`,
        `Directions: ${stepData.directions}`,
        `Objects in Focus: ${stepData.objectsInFocus.join(", ")}`,
      ];

  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [isInventoryVisible, setIsInventoryVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [nextButtonTempDisabled, setNextButtonTempDisabled] = useState(false);

  const requiredItems = new Set([
    "Analytical Balance",
    "Weighing Paper",
    "Beaker",
    "Spatula",
    "Powder Sample",
  ]);

  const handleToggleInventory = () => setIsInventoryVisible(!isInventoryVisible);

  const handleNextStep = () => {
    if (currentStep < 13) {
      onStepChange(currentStep + 1);
      setNextDisabled(nextButtonRef);
    }
  };

  const handleItemSelection = (itemName: string, isCorrect: boolean) => {
    setSelectedItems((prev) => {
      const updated = { ...prev, [itemName]: isCorrect };
      const allSelected = Array.from(requiredItems).every((item) => updated[item]);
      if (allSelected) setNextEnabled(nextButtonRef);
      return updated;
    });
  };

  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
        <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
          <p className="text-lg font-thin text-white">Loading Resources</p>
          <img src="/loadingQ2L.svg" alt="Loading" className="m-auto h-20 w-20" />
        </div>
      </div>
    }>
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
        >
          <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
          <OrbitControls minDistance={9} maxDistance={70} />
          <ambientLight intensity={1.6} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
          <Table scale={13} position-y={-1} />
          <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={65}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>

          {currentStep === 1 && <FirstStepComponent />}
          {currentStep === 2 && <SecondStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 3 && <ThirdStepComponent selectedItems={selectedItems} nextButtonRef={nextButtonRef} />}
          {currentStep === 4 && <FourthStepComponent ref={(el) => stepRefs.current[4] = el as StepComponentRef} nextButtonRef={nextButtonRef} />}
          {currentStep === 5 && <FifthStepComponent ref={(el) => stepRefs.current[5] = el as StepComponentRef} nextButtonRef={nextButtonRef} />}
          {currentStep === 6 && <SixthStepComponent ref={(el) => stepRefs.current[6] = el as StepComponentRef} nextButtonRef={nextButtonRef} />}
          {currentStep === 7 && <SeventhStepComponent ref={(el) => stepRefs.current[7] = el as StepComponentRef} setIsAnimating={() => {}} nextButtonRef={nextButtonRef} />}
          {currentStep === 8 && <EightStepComponent ref={(el) => stepRefs.current[8] = el as StepComponentRef} setIsAnimating={() => {}} nextButtonRef={nextButtonRef} />}
          {currentStep === 9 && <NinthStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 10 && <TenthStepComponent ref={(el) => stepRefs.current[10] = el as StepComponentRef} nextButtonRef={nextButtonRef} />}
          {currentStep === 11 && <EleventhStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 12 && <TwelvthStepComponent nextButtonRef={nextButtonRef} />}
          {currentStep === 13 && <FinishedStepComponent nextButtonRef={nextButtonRef} />}
        </Canvas>

        {currentStep === 3 && canInteract && (
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

        <Chatbot context={chatbotContext} />
      </div>
    </Suspense>
  );
}
