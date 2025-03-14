// 07PlungerSliderStep.tsx
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

interface PlungerSliderStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const PlungerSliderStep: React.FC<PlungerSliderStepProps> = ({
  nextButtonRef,
  enableNext,
}) => {
  const micropipetteRef = useRef<RedP2MicropipetteRef>(null);
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({
    show: false,
    message: "",
    position: new THREE.Vector3(0, 2, 0),
  });
  const [sliderValue, setSliderValue] = useState<number>(0); // initialize slider value to 0
  const prevSliderValueRef = useRef<number>(0); // track previous slider value

  const handleSliderChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const prevValue = prevSliderValueRef.current;

    let message = "";
    let show = true;

    if (value === 1) {
      message = "Correct!";
      enableNext();
    } else if (value === 0) {
      show = false;
    } else {
      message = "Incorrect!";
    }

    setSliderValue(value);
    setDialog({
      show,
      message,
      position: new THREE.Vector3(0, 2.5, 0), // adjust as needed
    });

    // Handle animations based on the slider value change.
    if (micropipetteRef.current) {
      if (value > prevValue) {
        // Slider value increased
        if (value === 1) {
          micropipetteRef.current.performAction("PlungerPush");
        } else if (value === 2) {
          micropipetteRef.current.performAction("PlungerExpel");
        }
      } else {
        // Slider value decreased
        micropipetteRef.current.performAction("PlungerExtract");
      }
    }

    prevSliderValueRef.current = value;
  };

  // Stop pointer events from propagating to the scene camera
  const stopPropagation = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <group>
      <group>
        <MicropipetteP2Model
          ref={micropipetteRef}
          startingPosition={[0, 8, 0]}
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
        {/* Additional elements for the custom step can be added here */}
      </group>
      {/* HTML overlay for the slider UI – fixed position and rotated to face the table */}
      <Html
        transform
        rotation={[0, Math.PI / 2, 0]}
        position={new THREE.Vector3(0, 9, -2)}
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
            max="2"
            step="1"
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
        {/* Notches with fixed absolute positioning; they also stop propagation */}
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

export default PlungerSliderStep;
