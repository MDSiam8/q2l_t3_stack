// 09DispensingReagentStep.tsx
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { Html } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { BeakerModel } from "../models/BeakerModel";
import { MicropipetteP2Model } from "../models/MicropipetteP2";
import { RedP2MicropipetteRef } from "~/utils/types/ref-types";
import styles from "../other/CustomSteps/slider.module.css";

// Extend with our models if needed
extend({ MicropipetteP2Model, EmptyBeakerModel: BeakerModel });

interface DispensingReagentStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const DispensingReagentStep: React.FC<DispensingReagentStepProps> = ({
  nextButtonRef,
  enableNext,
}) => {
  // For dispensing, slider value ranges from 0 (plunger not pressed) to 1 (fully pressed).
  // We start at 0.
  const [sliderValue, setSliderValue] = useState<number>(0);
  // Show the instruction immediately.
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({
    show: true,
    message: "Press the plunger fully to dispense the liquid.",
    position: new THREE.Vector3(0, 2, 0),
  });
  const prevSliderValueRef = useRef<number>(0);
  const micropipetteRef = useRef<RedP2MicropipetteRef>(null);
  // Create a ref for the cylinder (the liquid inside the beaker)
  const cylinderRef = useRef<THREE.Mesh>(null);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    const prevValue = prevSliderValueRef.current;
    let message = "Press the plunger fully to dispense the liquid.";
    let show = true;

    if (value >= 1) {
      message = "Correct! Liquid dispensed successfully!";
      enableNext();
      // Trigger the liquid dispense animation.
      if (micropipetteRef.current) {
        // micropipetteRef.current.performAction("LiquidDispense");
      }
      // Animate the cylinder inside the beaker to grow (simulate liquid filling)
      if (cylinderRef.current) {
        gsap.to(cylinderRef.current.scale, {
          y: 1, // Target Y scale for the liquid
          duration: 1,
          ease: "power2.out",
        });
      }
    }

    setSliderValue(value);
    setDialog({
      show,
      message,
      position: new THREE.Vector3(0, 2.5, 0), // fixed position
    });

    // Adjust pipette actions based on slider movement.
    if (micropipetteRef.current) {
      if (value > prevValue) {
        // micropipetteRef.current.performAction("PlungerPress");
      } else {
        // micropipetteRef.current.performAction("PlungerRetract");
      }
    }
    prevSliderValueRef.current = value;
  };

  // Prevent pointer events from affecting the scene camera.
  const stopPropagation = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <group>
      <group>
        {/* Render the pipette loaded with liquid */}
        <MicropipetteP2Model
          ref={micropipetteRef}
          startingPosition={[0, 6.5, 0]}
          opacity={1}
          rotation={[0, Math.PI, 0]}
          scale={3.7}
        />
        {/* Render the beaker for dispensing */}
        <BeakerModel
          startingPosition={[0.3, 3.25, -0.95]}
          opacity={1}
          rotation={[0, 0, 0]}
          scale={4}
        />
        {/* Cylinder inside the beaker representing the liquid.
            Positioned to align with the beaker; adjust Y as needed.
            Initial Y scale is very small (0.01) so it's nearly flat. */}
        <mesh
          ref={cylinderRef}
          position={[0, 3.25, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 0.01, 1]}
        >
          <cylinderGeometry args={[0.5, 0.5, .5, 32]} />
          <meshStandardMaterial color="orange" transparent opacity={0.8} />
        </mesh>
      </group>
      {/* HTML overlay for the slider UI – fixed position and rotated to face the table */}
      <Html
        transform
        rotation={[0, Math.PI / 2, 0]}
        position={new THREE.Vector3(0, 9, -2)} // fixed Z position
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

export default DispensingReagentStep;
