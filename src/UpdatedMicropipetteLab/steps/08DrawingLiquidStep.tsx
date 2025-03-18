// 08DrawingLiquidStep.tsx
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { Html } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { BeakerWithOrangeReagnentModel } from "../models/BeakerWithOrangeReagnent";
import { MicropipetteP2Model } from "../models/MicropipetteP2";
import { RedP2MicropipetteRef } from "~/utils/types/ref-types";
import styles from "../other/CustomSteps/slider.module.css";

// Extend with our models if needed
extend({ MicropipetteP2Model, BeakerWithOrangeReagnentModel });

interface DrawingLiquidStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const DrawingLiquidStep: React.FC<DrawingLiquidStepProps> = ({
  nextButtonRef,
  enableNext,
}) => {
  // For drawing liquid, slider value ranges from 0 (fully released) to 1 (fully pressed)
  // We start with 1, and the user must drag it down.
  const [sliderValue, setSliderValue] = useState<number>(1);
  // Set initial dialog state to show immediately
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({
    show: true,
    message: "Release the plunger slowly to draw the liquid.",
    position: new THREE.Vector3(0, 2, 0),
  });
  const prevSliderValueRef = useRef<number>(1);
  const micropipetteRef = useRef<RedP2MicropipetteRef>(null);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const prevValue = prevSliderValueRef.current;
    let message = "";
    let show = true;

    if (value <= 0.1) {
      message = "Correct! Liquid drawn successfully!";
      enableNext();
      // Trigger the liquid draw animation.
      if (micropipetteRef.current) {
        // micropipetteRef.current.performAction("LiquidDraw");
      }
    } else {
      message = "Release the plunger slowly to draw the liquid.";
    }

    setSliderValue(value);
    setDialog({
      show,
      message,
      position: new THREE.Vector3(0, 2.5, 0), // fixed position
    });

    // Call appropriate pipette actions based on slider movement.
    if (micropipetteRef.current) {
      if (value < prevValue) {
        // micropipetteRef.current.performAction("PlungerRelease");
      } else {
        // micropipetteRef.current.performAction("PlungerHold");
      }
    }
    prevSliderValueRef.current = value;
  };

  // Prevent pointer events from affecting the scene camera.
  const stopPropagation = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <group>
      <group>
        {/* Render the pipette and the reagent beaker */}
        <MicropipetteP2Model
          ref={micropipetteRef}
          startingPosition={[0, 6, 0]}
          opacity={1}
          rotation={[0, Math.PI, 0]}
          scale={3.7}
        />
        <BeakerWithOrangeReagnentModel
          opacity={1}
          startingPosition={[0, 3.25, 0]}
          scale={4}
          rotation={[0, 9.5, 0]}
        />
      </group>
      {/* HTML overlay for the slider UI – fixed position and rotated to face the table */}
      <Html
        transform
        rotation={[0, Math.PI / 2, 0]}
        position={new THREE.Vector3(0, 9, -2)} // fixed position in Z axis
        distanceFactor={10}
      >
        <div
          className={styles.customSliderContainer}
          onPointerDown={stopPropagation}
          onPointerUp={stopPropagation}
          onPointerMove={stopPropagation}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={sliderValue}
            onChange={handleSliderChange}
            className={styles.customSlider}
            onPointerDown={stopPropagation}
            onPointerUp={stopPropagation}
            onPointerMove={stopPropagation}
          />
          {dialog.show && (
            <div className={styles.messageBox} onPointerDown={stopPropagation}>
              {dialog.message}
            </div>
          )}
        </div>
        {/* Fixed-position notches to decorate the slider */}
        <div
          className="absolute top-[96px] left-[38px] w-6 h-1 bg-blue-700"
          onPointerDown={stopPropagation}
          onPointerUp={stopPropagation}
          onPointerMove={stopPropagation}
        ></div>
        <div
          className="absolute top-[60px] left-[38px] w-6 h-1 bg-blue-700"
          onPointerDown={stopPropagation}
          onPointerUp={stopPropagation}
          onPointerMove={stopPropagation}
        ></div>
      </Html>
    </group>
  );
};

export default DrawingLiquidStep;
