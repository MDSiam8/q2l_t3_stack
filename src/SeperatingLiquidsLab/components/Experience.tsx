"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cookies from "js-cookie";
import { Camera } from "three";

import Table from "./Table";
import state from "../state.json";
import { CameraAdjuster } from "./CameraAdjuster";

import Step1LabObjectives from "./steps/01LabObjectives";
import Step2InventorySelection from "./steps/02SelectFromInventory";
import Step3PourToSeperatingFunnel from "./steps/03PourMixtureToSepFunnel";
import Step4PourWaterToSeperatingFunnel from "./steps/04PourWaterIntoSFunnel";
import Step5StopperTheSFunnel from "./steps/05PutStopper";
import Step6VentAir from "./steps/06VentAirBeforeMixing";
import Step7Mix from "./steps/07Mixing";
import Step8VentAirAfterMixing from "./steps/08VentAirAfterMixing";
import Step9SeperateLiquid from "./steps/09SeperateLiquid";
import Step10DrainSFunnel from "./steps/10DrainAqueousLayer";
import Step11PourOrganicLayer from "./steps/11PourOrganicLayer";
import Step12AddPowder from "./steps/12AddPowder";
import Step13Filter from "./steps/13FilterLiquid";
import Step14Finish from "./steps/14ObtainedOrganicProduct";

import Chatbot from "~/components/ChatBot";
import useContextFromFile from "~/components/useContextFromFile";

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

interface StateType {
  [key: string]: Step;
}

type StateKey = keyof StateType;

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
  const fileContext = useContextFromFile(stepData.contextFileName || "");

  const chatbotContext = fileContext
    ? [fileContext]
    : [
        `Description: ${stepData.description}`,
        `Directions: ${stepData.directions}`,
        `Objects in Focus: ${stepData.objectsInFocus.join(", ")}`,
      ];

  const stepRefs = useRef<Record<number, StepComponentRef>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const cameraControlsRef = useRef<Camera>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [isInventoryVisible, setIsInventoryVisible] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading Resources");
  const [nextButtonTempDisabled, setNextButtonTempDisabled] = useState(false);

  const MAX_STEP = Object.keys(state).length;

  const handleToggleInventory = () => setIsInventoryVisible(!isInventoryVisible);

  const handleNextStep = () => {
    if (currentStep < MAX_STEP) {
      onStepChange(currentStep + 1);
      setNextDisabled(nextButtonRef);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 via-cyan-500 to-green-400">
          <div className="rounded-lg border border-transparent bg-black bg-opacity-30 p-6 shadow-lg backdrop-blur-lg backdrop-filter">
            <p className="text-lg font-thin text-white">{loadingMessage}</p>
            <img src="/loadingQ2L.svg" alt="Loading" className="w-20 h-20 m-auto" />
          </div>
        </div>
      }
    >
      <div style={{ position: "relative", height: "100vh" }}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            position: cameraConfig?.position || [11.57, 10.1, -0.314],
            zoom: cameraConfig?.zoom || 1,
          }}
        >
          <color attach="background" args={["#404040"]} />
          <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
          <OrbitControls minDistance={9} maxDistance={70} />
          <ambientLight intensity={1.6} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />

          <Table scale={13} position-y={-1} />
          <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={65}>
            <planeGeometry />
            <meshStandardMaterial color="gray" />
          </mesh>

          {currentStep === 1 && <Step1LabObjectives />}
          {currentStep === 2 && <Step2InventorySelection nextButtonRef={nextButtonRef} />}
          {currentStep === 3 && <Step3PourToSeperatingFunnel nextButtonRef={nextButtonRef} />}
          {currentStep === 4 && <Step4PourWaterToSeperatingFunnel nextButtonRef={nextButtonRef} />}
          {currentStep === 5 && <Step5StopperTheSFunnel nextButtonRef={nextButtonRef} />}
          {currentStep === 6 && <Step6VentAir nextButtonRef={nextButtonRef} />}
          {currentStep === 7 && <Step7Mix nextButtonRef={nextButtonRef} />}
          {currentStep === 8 && <Step8VentAirAfterMixing nextButtonRef={nextButtonRef} />}
          {currentStep === 9 && <Step9SeperateLiquid nextButtonRef={nextButtonRef} />}
          {currentStep === 10 && <Step10DrainSFunnel nextButtonRef={nextButtonRef} />}
          {currentStep === 11 && <Step11PourOrganicLayer nextButtonRef={nextButtonRef} />}
          {currentStep === 12 && <Step12AddPowder nextButtonRef={nextButtonRef} />}
          {currentStep === 13 && <Step13Filter nextButtonRef={nextButtonRef} />}
          {currentStep === 14 && <Step14Finish nextButtonRef={nextButtonRef} />}
        </Canvas>

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
                disabled={currentStep === MAX_STEP || nextButtonTempDisabled}
                className={`mb-0 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105 ${
                  currentStep === MAX_STEP || nextButtonTempDisabled ? "cursor-not-allowed bg-gray-400 opacity-50" : ""
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
