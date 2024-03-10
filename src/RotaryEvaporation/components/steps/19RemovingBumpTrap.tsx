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
import { RotavapRemoveBumpTrap } from "../rotavap/RotavapRemoveBumpTrap";
import { RBFlaskWithEvaporatedProduct } from "../round-bottom-flasks/RBFlaskWithEvapProduct";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step19RemoveBumpTrap = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    return (
      <group>
        <RotavapRemoveBumpTrap position={[0, 5, 0]} scale={0.8} onClick={() => {
          setTimeout(() => {
            if (nextButtonRef && nextButtonRef.current) {
              setNextEnabled(nextButtonRef);
            }
          }, 5000);
          // Right now, for all the onClicks, it activates after
          // the user clicks anywhere. So even if we click on the wrong
          // area, it will still activate the next button. 
          // One way to fix it is to create our own custom prop that we call
          // OnClickSpecificSpot that will only activate the next button if the
          // user clicks on the box collider. We can pass in the function through the 
          // props, and attach it as an onClick event to the box collider inside 
          // the Rotovap components.
        }} />
        <RBFlaskWithEvaporatedProduct position={[2.2, 5, 0]}/>
      </group>
    );
  },
);

export default Step19RemoveBumpTrap;
