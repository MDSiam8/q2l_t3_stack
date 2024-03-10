import React, { useState, forwardRef, useEffect } from "react";
import { Html } from "@react-three/drei";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";
import { TwentyFiveMLFlask } from "../round-bottom-flasks/25mlRBFlask";
import { FiftyMLFlask } from "../round-bottom-flasks/50mlRBFlask";
import * as THREE from "three";
import { BumpTrap } from "../BumpTrap";
import { KeckClip } from "../KeckClip";
import { OrganicProductBeaker } from "../BeakerWithSolution";
import { RotavapWithFlaskAnim } from "../rotavap/RotavapWithFlaskAnim";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step4SelectFlask = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    const [dialog, setDialog] = useState({
      show: false,
      message: "",
      position: new THREE.Vector3(),
    });

    const handleFlaskClick = (
      flaskSize: number,
      position: [number, number, number],
    ) => {
      let message = "";
      if (flaskSize === 100) {
        setNextEnabled(nextButtonRef);
        message = "Correct! The 100 mL flask is the right choice.";
      } else if (flaskSize === 50) {
        message =
          "Incorrect. 50mL is not suitable because the solution should be less than half-filled to prevent overflowing during evaporation.";
      } else {
        message = "Incorrect. The 25 mL flask is too small.";
      }

      setDialog({
        show: true,
        message,
        position: new THREE.Vector3(...position),
      });
    };

    return (
      <group>
        <RotavapWithFlaskAnim position={[0, 5, 0]} scale={0.8} />{" "}
        <HundredMLFlask
          scale={0.8}
          isEmpty={true}
          onClick={() => handleFlaskClick(100, [2.2, 6, -2.2])}
          position={[2.2, 4.9, -2.2]}
          rotation-y={(3.14 * 1) / 2}
        />
        <FiftyMLFlask
          onClick={() => handleFlaskClick(50, [2.2, 6, 0])}
          position={[2.2, 5, 0]}
          rotation-y={(3.14 * 1) / 2}
        />
        <TwentyFiveMLFlask
          onClick={() => handleFlaskClick(25, [2.2, 6, 2.2])}
          position={[2.2, 5, 2.2]}
          rotation-y={(3.14 * 1) / 2}
        />
        <OrganicProductBeaker
          position={[0, 5, -2.2]}
          rotation-y={(3.14 / 180) * 180}
        />
        <group position={[0.4, 5, -3.8]}>
          <KeckClip position={[0, 0, 0.6]} />
          <KeckClip />
        </group>
        <group>
          <HundredMLFlask
            scale={0.8}
            isEmpty={true}
            position={[2.2, 4.9, -2.2]}
            rotation-y={(3.14 * 1) / 2}
          />
          <FiftyMLFlask position={[2.2, 5, 0]} rotation-y={(3.14 * 1) / 2} />
          <TwentyFiveMLFlask
            position={[2.2, 5, 2.2]}
            rotation-y={(3.14 * 1) / 2}
          />
        </group>
        <BumpTrap position={[-0.5, 5.25, -4.2]} rotation-x={3.14 / 2} />
        {dialog.show && (
          <Html position={dialog.position} transform scale={0.3} rotation-y={90 * 3.14/180}>
            <div
              className={`rounded-lg p-6 text-sm shadow-lg ${
                dialog.message.startsWith("Correct")
                  ? "border-green-500 bg-green-100 text-green-900"
                  : "border-red-500 bg-red-100 text-red-900"
              } max-w-[350px] min-w-[120px] border select-none`}
            >
              {dialog.message}
            </div>
          </Html>
        )}
      </group>
    );
  },
);

export default Step4SelectFlask;
