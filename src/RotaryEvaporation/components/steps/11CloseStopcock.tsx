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
import { BumpTrap } from "../BumpTrap";
import { KeckClip } from "../KeckClip";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step11CloseStopcock = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    return (
      <group>
        <Arrow pointingDirection="right" position={[0,9.9,4.9]} />
        <RotavapCloseStopcock position={[0, 5, 0]} scale={0.8} onClick={() => {
          setTimeout(() => {
            if (nextButtonRef && nextButtonRef.current) {
              setNextEnabled(nextButtonRef);
            }
          }, 2000);
        }}/>
        {/* <HundredMLFlask position={[2.2, 5, .4]} /> */}
        {/* <group position={[0.4, 5, -3.8]}>
          <KeckClip position={[0, 0, 0.6]} />
          <KeckClip />
        </group> */}
        {/* <BumpTrap position={[-0.5, 5.25, -4.2]} rotation-x={3.14 / 2} /> */}

      </group>
    );
  },
);

export default Step11CloseStopcock;
