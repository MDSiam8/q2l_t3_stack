import React, { Suspense, useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Table from "./models/Table";
import state from "./state.json";
import InventorySystem from "./ui_overlay/InventorySystem";
import { CameraAdjuster } from "./utils/CameraAdjuster";
import MobileMenu from "@components/MobileMenu";
import DesktopControls from "@components/DesktopControls";
import StepComponents from "./steps";

type StateKey = keyof typeof state;

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
  onLabComplete: () => void;
}

export default function Experience({ currentStep, onStepChange, onLabComplete }: ExperienceProps) {
  const key = currentStep.toString() as StateKey;
  const stepData = state[key];
  const stepRefs = useRef<Record<number, StepRef>>({});

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const requiredItems = new Set(["Beaker", "Glass Pipette", "Glass Dropper", "Stopper", "Distilled Water"]);

  const handleNextStep = () => {
    if (currentStep < 13) {
      onStepChange(currentStep + 1);
      setIsNextDisabled(true);
    } else if (currentStep === 13) {
      onLabComplete();
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

  useEffect(() => {
    setIsNextDisabled(true);
  }, []);

  useEffect(() => {
    if (stepRefs.current[currentStep]?.resetAndReplay) {
      stepRefs.current[currentStep].resetAndReplay();
    }
  }, [currentStep]);

  useEffect(() => {
    const sessionKey = "lastLoadTimestamp";
    const currentTime = Date.now().toString();
    const lastLoadTime = sessionStorage.getItem(sessionKey);

    if (!lastLoadTime || lastLoadTime !== currentTime) {
      setSelectedItems({});
      if (currentStep === 2) {
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

          {Object.entries(StepComponents).map(([step, Component]) =>
            currentStep === parseInt(step) ? (
              <Component
                ref={(el) => el && (stepRefs.current[parseInt(step)] = el)}
                setNextDisabled={setIsNextDisabled}
                selectedItems={selectedItems}
              />
            ) : null,
          )}
        </Canvas>

        {currentStep === 2 && !isInventoryVisible && (
          <button
            onClick={() => setIsInventoryVisible(true)}
            className="absolute right-4 top-4 z-40 m-4 rounded-md bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600"
          >
            Open Inventory
          </button>
        )}

        {currentStep === 2 && (
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
