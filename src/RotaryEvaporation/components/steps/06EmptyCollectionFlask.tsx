import React, { useEffect, forwardRef, useState } from "react";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { OrganicProductBeaker } from "../BeakerWithSolution";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";
import { TwentyFiveMLFlask } from "../round-bottom-flasks/25mlRBFlask";
import { FiftyMLFlask } from "../round-bottom-flasks/50mlRBFlask";
import { RotavapWithFlaskAnim } from "../rotavap/RotavapWithFlaskAnim";
import { Beaker } from "~/AnalyticalBalanceLab/components/Beaker";
import { BeakerWithWasteFillAnimation } from "../BeakerWithLiquidCollectionAnimation";
import { KeckClip } from "../KeckClip";
import { BumpTrap } from "../BumpTrap";
import { ArrowRight } from "lucide-react";
import Arrow from "../Arrow";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step6EmptyCollectionFlask = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
  const [startAnimationDelay, setStartAnimationDelay] = useState<number>(9999);
  
  useEffect(() => {
    // Disable the next button
    setNextDisabled(nextButtonRef);
  }, []);

  return (
    <group>
      <RotavapWithFlaskAnim
        position={[0, 5, 0]}
        scale={0.8}
        animationTime={0}
        onClick={() => {
          setStartAnimationDelay(0);
          setTimeout(() => {
            if (nextButtonRef && nextButtonRef.current) {
              setNextEnabled(nextButtonRef);
            }
          }, 5000);
      
        }}
      />
      <Arrow pointingDirection="right" position={[0,7,4.3]}/>
      <HundredMLFlask position={[2.2, 5, 0.4]} />
      <BeakerWithWasteFillAnimation
        position={[1, 5, 3]}
        scale={1.2}
        startAnimationDelay={startAnimationDelay}
      />
      <group position={[0.4, 5, -3.8]}>
        <KeckClip position={[0, 0, 0.6]} />
        <KeckClip />
      </group>
      <BumpTrap position={[-0.5, 5.25, -4.2]} rotation-x={3.14 / 2} />
    </group>
  );
});

export default Step6EmptyCollectionFlask;
