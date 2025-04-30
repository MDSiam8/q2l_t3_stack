// Experience.tsx
import React, { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraAdjuster } from "./utils/CameraAdjuster"; // optional utility
import Table from "./models/Table"; // your table or lab bench model
import micropipetteState from "./state.json";
import Chatbot from "~/components/ChatBot";
import useContextFromFile from "~/components/useContextFromFile";

// Import each step's component:
import WelcomeStep from "./steps/01IntroductionToLab";
import MicropipetteRangeStep from "./steps/02MicropipetteRangesStep";
import MicropipetteSelectionStep from "./steps/03MicropipetteSelection";
import SettingVolumeStep from "./steps/04SettingVolumeStep";
import TipSelectionStep from "./steps/05TipSelectionStep";
import TipAttachmentStep from "./steps/06TipAttachmentStep";
import PlungerPressStep from "./steps/07PlungerPressStep";
import DrawingLiquidStep from "./steps/08DrawingLiquidStep";
import DispensingReagentStep from "./steps/09DispensingReagentStep";
import TipDisposalStep from "./steps/10TipDisposalStep";
import ConclusionStep from "./steps/11ConclusionStep";

// Utility to manage "Next" button styles:
export const getClassNameForNext = (isDisabled: boolean): string => {
  let base =
    "flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105";
  if (isDisabled) base += " cursor-not-allowed bg-gray-400 opacity-50";
  return base;
};

interface Step {
  stepTitle: string;
  description: string;
  directions: string;
  objectsInFocus: string[];
  user_instructions?: string;
}

interface MicropipetteState {
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
}
type StateKey = keyof MicropipetteState;

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
  const stepKey = currentStep.toString() as StateKey;
  const stepData = micropipetteState[stepKey];
  const fileName = stepData.contextFileName || "";
  const fileContext = useContextFromFile(fileName);

  // Prepare context for chatbot - use file context if available, otherwise use step data
  const chatbotContext = fileContext
    ? [
        `Current Step: ${currentStep} of 11 - ${stepData.stepTitle}`,
        fileContext,
      ]
    : [
        `Current Step: ${currentStep} of 11 - ${stepData.stepTitle}`,
        `Description: ${stepData.description}`,
        `Directions: ${stepData.directions}`,
        `Objects in Focus: ${stepData.objectsInFocus.join(", ")}`,
        `User Instructions: ${stepData.user_instructions || "None provided"}`,
      ];

  // Reference to disable/enable next button programmatically:
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleNextStep = () => {
    if (currentStep < 11) {
      onStepChange(currentStep + 1);
      // Optionally disable next right away (re-enable in step logic)
      if (nextButtonRef.current) {
        nextButtonRef.current.disabled = true;
        nextButtonRef.current.className = getClassNameForNext(true);
      }
    }
  };

  // Helper to enable the "Next Step" button
  const enableNextButton = () => {
    if (nextButtonRef.current) {
      nextButtonRef.current.disabled = false;
      nextButtonRef.current.className = getClassNameForNext(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Add a container with a lower z-index for the canvas */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Suspense fallback={<div>Loading 3D Scene...</div>}>
          <Canvas
            camera={{
              fov: 45,
              position: cameraConfig?.position || [11.57, 10.1, -0.314],
              zoom: cameraConfig?.zoom || 1,
            }}
          >
            <CameraAdjuster viewLocation={cameraConfig?.viewLocation ?? null} />
            <OrbitControls minDistance={5} maxDistance={40} />

            {/* Lights */}
            <ambientLight intensity={1} />
            <directionalLight position={[2, 5, 2]} intensity={1.5} castShadow />

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
            {/* Common Lab Elements */}
            <Table scale={10} position-y={-1.2} />

            {/* Step-based rendering */}
            {currentStep === 1 && (
              <WelcomeStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 2 && (
              <MicropipetteRangeStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 3 && (
              <MicropipetteSelectionStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 4 && (
              <SettingVolumeStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 5 && (
              <TipSelectionStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 6 && (
              <TipAttachmentStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 7 && (
              <PlungerPressStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 8 && (
              <DrawingLiquidStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 9 && (
              <DispensingReagentStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 10 && (
              <TipDisposalStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
            {currentStep === 11 && (
              <ConclusionStep
                nextButtonRef={nextButtonRef}
                enableNext={enableNextButton}
              />
            )}
          </Canvas>
        </Suspense>
      </div>

      {/* UI Overlay with instructions and Next button - higher z-index than canvas but lower than chatbot */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.2)",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">{stepData.stepTitle}</h1>
            <p className="text-white">{stepData.directions}</p>
            <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
              {stepData.user_instructions}
            </p>
          </div>
          <div
            style={{
              marginLeft: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <button
              ref={nextButtonRef}
              onClick={handleNextStep}
              className={getClassNameForNext(false)}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot with the highest z-index */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <Chatbot context={chatbotContext} />
      </div>
    </div>
  );
}
