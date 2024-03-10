import React, { useEffect, forwardRef } from "react";
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
import { RotavapOpenStopcock } from "../rotavap/RotavapOpenStopcock";
import { RotavapRemoveFlask } from "../rotavap/RotavapRemoveFlask";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step18RemoveItems = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    return (
      <group>
        <RotavapRemoveFlask
          position={[0, 5, 0]}
          scale={0.8}
          onClick={() => {
            setTimeout(() => {
              if (nextButtonRef && nextButtonRef.current) {
                setNextEnabled(nextButtonRef);
              }
            }, 5000);
          }}
        />
      </group>
    );
  },
);

export default Step18RemoveItems;
