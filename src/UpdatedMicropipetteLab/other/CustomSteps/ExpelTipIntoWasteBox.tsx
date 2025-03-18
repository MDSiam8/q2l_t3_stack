import React, { useRef, useState, ChangeEvent } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { WasteDisposalBoxModel } from "~/MicropipetteLab/components/WasteDisposalBox";
import { RedP2MicropipetteModel } from "~/MicropipetteLab/components/RedP2Micropipette";
import { RedP2MicropipetteRef } from "~/utils/types/ref-types";
import { ActionName } from "~/utils/types/types"; // Import ActionName type
import * as THREE from 'three';
import styles from './tipEjector.module.css'; // Import the CSS module

extend({ RedP2MicropipetteModel, WasteDisposalBoxModel });

const ExpelTipIntoWasteBox = () => {
  const micropipetteRef = useRef<RedP2MicropipetteRef>(null);
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({
    show: false,
    message: '',
    position: new THREE.Vector3(0, 2, 0),
  });
  const [sliderValue, setSliderValue] = useState<number>(0); // Initialize slider value to 1
  const prevSliderValueRef = useRef<number>(1); // Keep track of the previous slider value

  const handleSliderChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    const prevValue = prevSliderValueRef.current;

    let message = '';
    let show = true;

    if (value === 0) {
      show = false
    } else if (value === 1) {
      message = "Incorrect!"
    } else {
      message = 'Correct!';
    }

    setSliderValue(value); // Update slider value state
    setDialog({
      show,
      message,
      position: new THREE.Vector3(0, 2.5, 0), // Adjust the position as needed
    });

    // Handle animations based on the slider value change
    if (micropipetteRef.current) {
      let actionName: ActionName | undefined;
      if ((value === 0 && prevValue === 1) || (value === 0 && prevValue === 2)) {
        actionName = "LiquidExtract";
      } else if (value === 1 && prevValue === 0) {
        actionName = "LiquidExpel";
      } else if (value === 2) {
        actionName = "LiquidExpel";
      }

      if (actionName) {
        await micropipetteRef.current.performAction(actionName);
      }
    }

    // Update previous slider value
    prevSliderValueRef.current = value;
  };

  return (
    <group>
      <group>
      <RedP2MicropipetteModel
          ref={micropipetteRef}
          startingPosition={[0, 2, 0.55]}
          opacity={1}
          rotation={[0, Math.PI, 0]}
          scale={0.5}
        />
        <WasteDisposalBoxModel
          opacity={1}
          startingPosition={[0, 1, 0.4]}
          scale={1.5}
          rotation={[0, -4.7, 0]}
        />
        {/* Additional elements specific to the custom step can be added here */}
      </group>
      <Html position={new THREE.Vector3(0, 1, 0)}>
        <div className={styles.customSliderContainer}> {/* Use CSS module class */}
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={sliderValue} // Set initial value to 1
            onChange={handleSliderChange}
            className={styles.customSlider} // Use the CSS module class
          />
          {dialog.show && (
            <div className={styles.messageBox}>
              {dialog.message}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default ExpelTipIntoWasteBox;
