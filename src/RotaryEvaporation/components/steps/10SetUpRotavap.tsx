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

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step10SetupRotovap = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
      setTimeout(() => {
        if (nextButtonRef && nextButtonRef.current) {
          setNextEnabled(nextButtonRef);
        }
      }, 11000);
    }, []);

   
    return (
      <group>
        <RotavapWithSetupAnimations position={[0, 5, 0]} scale={0.8} />
        {/* <HundredMLFlask position={[2.2, 5, -2.2]} /> */}
      </group>
    );
  },
);

export default Step10SetupRotovap;
