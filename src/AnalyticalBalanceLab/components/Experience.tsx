import React, { Suspense, useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { OrbitControls } from "@react-three/drei";
import Table from "./Table";
import state from "./state.json";
import InventorySystem from "./InventorySystem";
import { Canvas } from "@react-three/fiber";
import { CameraAdjuster } from "./CameraAdjuster";
import MobileMenu from "@components/MobileMenu";
import DesktopControls from "@components/DesktopControls";

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

type StateKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

export interface StepRef {
  resetAndReplay: () => void;
}

interface SelectedItems {
  [itemName: string]: boolean;
}

export interface StepComponentProps {
  setNextDisabled: Dispatch<SetStateAction<boolean>>;
  selectedItems?: SelectedItems;
  resetAndReplay?: () => void;
}

interface ExperienceProps {
  currentStep: number;
  onStepChange: (newStep: number) => void;
}

export default function Experience({ currentStep, onStepChange }: ExperienceProps) {
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];
  const stepRefs = useRef<Record<number, StepRef>>({});

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const requiredItems = new Set(["Analytical Balance", "Weighing Paper", "Beaker", "Spatula", "Powder Sample"]);

  const handleNextStep = () => {
    if (currentStep < 13) {
      onStepChange(currentStep + 1);
      setIsNextDisabled(true);
    }
  };

  const handleItemSelection = (itemName: string, isCorrect: boolean) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [itemName]: isCorrect };
      if (Array.from(requiredItems).every((item) => newSelectedItems[item])) {
        setIsNextDisabled(false);
      }
      return newSelectedItems;
    });
  };

  // Disable the "Next" button on mount
  useEffect(() => {
    setIsNextDisabled(true);
  }, []);

  // Effect to reset and replay animations when the step changes
  useEffect(() => {
    if (stepRefs.current[currentStep]?.resetAndReplay) {
      stepRefs.current[currentStep].resetAndReplay();
    }
  }, [currentStep]);

  // Reset selected items when the step changes
  useEffect(() => {
    const sessionKey = "lastLoadTimestamp";
    const currentTime = Date.now().toString();
    const lastLoadTime = sessionStorage.getItem(sessionKey);
  
    if (!lastLoadTime || lastLoadTime !== currentTime) {
      setSelectedItems({});
      if (currentStep === 3) {
        setIsNextDisabled(true);
      }
      sessionStorage.setItem(sessionKey, currentTime);
    }
  }, [currentStep]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative h-screen">
        <MobileMenu
          stepData={stepData}
          currentStep={currentStep}
          isNextDisabled={isNextDisabled}
          onNextStep={handleNextStep}
        />

        <Canvas shadows camera={{ fov: 45, position: [11.57, 10.1, -0.314] }}>
          <CameraAdjuster />
          <OrbitControls minDistance={9} maxDistance={70} />
          <ambientLight intensity={1.6} />
          <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
          <Table scale={13} position-y={-1} />
          <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={65}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
          </mesh>

          {currentStep === 1 && <FirstStepComponent setNextDisabled={setIsNextDisabled} />}
          {currentStep === 2 && <SecondStepComponent setNextDisabled={setIsNextDisabled} />}
          {currentStep === 3 && (
            <ThirdStepComponent selectedItems={selectedItems} setNextDisabled={setIsNextDisabled} />
          )}
          {currentStep === 4 && (
            <FourthStepComponent
              ref={(el) => el && (stepRefs.current[4] = el)}
              setNextDisabled={setIsNextDisabled}
            />
          )}
          {currentStep === 5 && (
            <FifthStepComponent
              ref={(el) => el && (stepRefs.current[5] = el)}
              setNextDisabled={setIsNextDisabled}
            />
          )}
          {currentStep === 6 && (
            <SixthStepComponent
              ref={(el) => el && (stepRefs.current[6] = el)}
              setNextDisabled={setIsNextDisabled}
            />
          )}
          {currentStep === 7 && (
            <SeventhStepComponent
              ref={(el) => el && (stepRefs.current[7] = el)}
              setNextDisabled={setIsNextDisabled}
            />
          )}
          {currentStep === 8 && (
            <EightStepComponent
              ref={(el) => el && (stepRefs.current[8] = el)}
              setNextDisabled={setIsNextDisabled}
            />
          )}
          {currentStep === 9 && <NinthStepComponent setNextDisabled={setIsNextDisabled} />}
          {currentStep === 10 && <TenthStepComponent ref={(el) => el && (stepRefs.current[10] = el)} setNextDisabled={setIsNextDisabled} />}
          {currentStep === 11 && <EleventhStepComponent setNextDisabled={setIsNextDisabled} />}
          {currentStep === 12 && <TwelvthStepComponent setNextDisabled={setIsNextDisabled} />}
          {currentStep === 13 && <FinishedStepComponent setNextDisabled={setIsNextDisabled} />}
        </Canvas>

        {currentStep === 3 && !isInventoryVisible && (
          <button
            onClick={() => setIsInventoryVisible(true)}
            className="absolute right-4 top-4 z-40 m-4 rounded-md bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600"
          >
            Open Inventory
          </button>
        )}

        {currentStep === 3 && (
          <InventorySystem
            onItemSelect={handleItemSelection}
            selectedItems={selectedItems}
            toggleInventory={() => setIsInventoryVisible(!isInventoryVisible)}
            isInventoryVisible={isInventoryVisible}
          />
        )}

        <DesktopControls
          stepData={stepData}
          currentStep={currentStep}
          isNextDisabled={isNextDisabled}
          onNextStep={handleNextStep}
        />
      </div>
    </Suspense>
  );
}