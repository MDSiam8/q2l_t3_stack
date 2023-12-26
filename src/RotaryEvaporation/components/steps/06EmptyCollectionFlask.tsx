import React, { useEffect, forwardRef, useState } from "react";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { OrganicProductBeaker } from "../BeakerWithSolution";
import { setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";
import { TwentyFiveMLFlask } from "../round-bottom-flasks/25mlRBFlask";
import { FiftyMLFlask } from "../round-bottom-flasks/50mlRBFlask";
import { RotavapWithFlaskAnim } from "../rotavap/RotavapWithFlaskAnim";
import { Beaker } from "~/AnalyticalBalanceLab/components/Beaker";
import { BeakerWithWasteFillAnimation } from "../BeakerWithLiquidCollectionAnimation";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step6EmptyCollectionFlask = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
  const [ startAnimationDelay, setStartAnimationDelay ] = useState<number>(9999);
  useEffect(() => {
    // Enable the next button after 3 seconds
    const timer = setTimeout(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextEnabled(nextButtonRef);
      }
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [nextButtonRef]);

  return (
    <group>
      <RotavapWithFlaskAnim
        position={[0, 5, 0]}
        scale={0.8}
        animationTime={0}
        onClick={() => {
          setStartAnimationDelay(0);
        }}
      />
      <HundredMLFlask position={[2.2, 5, .4]} />
      <BeakerWithWasteFillAnimation position={[1., 5, 3]} scale={1.2} startAnimationDelay={startAnimationDelay} />
    </group>
  );
});

export default Step6EmptyCollectionFlask;
