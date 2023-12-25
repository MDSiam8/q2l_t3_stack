import React, { useState, forwardRef } from "react";
import { Html } from "@react-three/drei";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { setNextEnabled } from "../Experience";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";
import { TwentyFiveMLFlask } from "../round-bottom-flasks/25mlRBFlask";
import { FiftyMLFlask } from "../round-bottom-flasks/50mlRBFlask";
import * as THREE from "three";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step4SelectFlask = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const [dialog, setDialog] = useState({ show: false, message: "", position: new THREE.Vector3() });

    const handleFlaskClick = (flaskSize: number, position: [number, number, number]) => {
      let message = "";
      if (flaskSize === 100) {
        setNextEnabled(nextButtonRef);
        message = "Correct! The 100 mL flask is the right choice.";
      } else if (flaskSize === 50) {
        message = "Incorrect. The 50 mL flask is not big enough.";
      } else {
        message = "Incorrect. The 25 mL flask is too small.";
      }
      
      setDialog({
        show: true,
        message,
        position: new THREE.Vector3(...position)
      });
    };

    return (
      <group>
        <RotavapWithHeatBathAnim position={[0, 5, 0]} scale={0.8}/>
        <HundredMLFlask onClick={() => handleFlaskClick(100, [2.2, 6, -2.2])} position={[2.2, 5, -2.2]} rotation-y={3.14*1/2}/>
        <FiftyMLFlask onClick={() => handleFlaskClick(50, [2.2, 6, 0])} position={[2.2, 5, 0]} rotation-y={3.14*1/2} />
        <TwentyFiveMLFlask onClick={() => handleFlaskClick(25, [2.2, 6, 2.2])} position={[2.2, 5, 2.2]} rotation-y={3.14*1/2} />

        {dialog.show && (
          <Html position={dialog.position}>
            <div className="bg-pink-100 border border-pink-300 text-pink-700 p-3 rounded-lg shadow-md">
              {dialog.message}
            </div>
          </Html>
        )}
      </group>
    );
  }
);

export default Step4SelectFlask;
