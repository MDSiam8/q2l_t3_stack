// 10TipDisposalStep.tsx
import React, { useRef, useState, ChangeEvent } from "react";
import { Html } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { WasteDisposalBoxModel } from "../models/WasteDisposalBox";
import { MicropipetteP2Model } from "../models/MicropipetteP2";
import { RedP2MicropipetteRef } from "~/utils/types/ref-types";
import { ActionName } from "~/utils/types/types";
import styles from "../other/CustomSteps/tipEjector.module.css";

extend({ MicropipetteP2Model, WasteDisposalBoxModel });

const TipDisposalStep: React.FC<{
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}> = ({ nextButtonRef, enableNext }) => {
  const micropipetteRef = useRef<RedP2MicropipetteRef>(null);
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({ show: false, message: "", position: new THREE.Vector3(0, 2, 0) });
  const [sliderValue, setSliderValue] = useState<number>(0);
  const prevSliderValueRef = useRef<number>(1);

  const handleSliderChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const prevValue = prevSliderValueRef.current;
    let message = "";
    let show = true;

    if (value === 0) {
      show = false;
    } else if (value === 1) {
      message = "Incorrect!";
    } else if (value === 2) {
      message = "Correct!";
    }

    setSliderValue(value);
    setDialog({
      show,
      message,
      position: new THREE.Vector3(0, 2.5, 0), // adjust as needed
    });

    if (micropipetteRef.current) {
      let actionName: ActionName | undefined;
      if (value === 2) {
        // actionName = "EjectTip";
      }
      if (actionName) {
        await micropipetteRef.current.performAction(actionName);
      }
    }
    prevSliderValueRef.current = value;
    if (value === 2) {
      enableNext();
    }
  };

  // Prevent pointer events from propagating to the camera controls.
  const stopPropagation = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <group>
      <group>
        {/* Render the pipette (with tip still attached) */}
        <MicropipetteP2Model
          ref={micropipetteRef}
          startingPosition={[0, 7, 0]}
          opacity={1}
          rotation={[0, Math.PI, 0]}
          scale={3.7}
        />
        {/* Render the waste disposal box */}
        <WasteDisposalBoxModel
          startingPosition={[0, 4, 0]}
          opacity={1}
          rotation={[0, Math.PI / 2, 0]}
          scale={1.8}
        />
      </group>
      {/* HTML overlay for the slider UI – rotated so that it faces the table */}
      <Html
        transform
        rotation-y={Math.PI / 2}
        position={new THREE.Vector3(0, 6, -1.0)}
        distanceFactor={10}
        // onPointerDown={stopPropagation}
        // onPointerUp={stopPropagation}
        // onPointerMove={stopPropagation}
        scale={0.8}
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
        </div>
      </Html>
      <Html
        transform
        rotation-y={Math.PI / 2}
        position={new THREE.Vector3(0, 6, -2.9)}
        distanceFactor={10}
        // onPointerDown={stopPropagation}
        // onPointerUp={stopPropagation}
        // onPointerMove={stopPropagation}
      >
        {dialog.show && (
          <div
            className={styles.messageBox}
            onPointerDown={stopPropagation}
            onPointerUp={stopPropagation}
            onPointerMove={stopPropagation}
          >
            {dialog.message}
          </div>
        )}
      </Html>
    </group>
  );
};

export default TipDisposalStep;
