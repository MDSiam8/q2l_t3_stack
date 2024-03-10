import React, { useEffect, forwardRef, useRef } from "react";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { OrganicProductBeaker } from "../BeakerWithSolution";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";
import { TwentyFiveMLFlask } from "../round-bottom-flasks/25mlRBFlask";
import { FiftyMLFlask } from "../round-bottom-flasks/50mlRBFlask";
import { RotavapCloseStopcock } from "../rotavap/RotavapCloseStopcock";
import Arrow from "../Arrow";
import { RotavapWithRaiseArmAnim } from "../rotavap/RotavapRaiseArmAnimation";
import { RotavapWithSetupAnimations } from "../rotavap/RotavapWithSetupAnimations";
import { RotavapTurnOnRotation } from "../rotavap/RotavapTurnOnRotation";
import { RotavapSubmerge } from "../rotavap/RotavapSubmerged";
import { RotavapRaiseArmAfterEvap } from "../rotavap/RotavapRaiseArmAfterEvap";
import { RotavapTurnOff } from "../rotavap/RotavapTurnOff";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step15TurnOff = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const countClick = useRef(0);
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, [nextButtonRef]);

    return (
      <group>
        <RotavapTurnOff
          position={[0, 5, 0]}
          scale={0.8}
          onClick={() => {
            countClick.current += 1;
            if (countClick.current > 1) {
              setTimeout(() => {
                if (nextButtonRef && nextButtonRef.current) {
                  setNextEnabled(nextButtonRef);
                }
              }, 3000);
            }
          }}
        />
        {/* <HundredMLFlask position={[2.2, 5, -2.2]} /> */}
      </group>
    );
  },
);

export default Step15TurnOff;
