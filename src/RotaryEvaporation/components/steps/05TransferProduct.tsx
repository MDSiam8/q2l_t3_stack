import React, { useEffect, forwardRef } from "react";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { setNextEnabled } from "../Experience";
import { HundredMLFlask } from "../round-bottom-flasks/100mlRBFlask";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step5TransferProducts = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {

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
        <RotavapWithHeatBathAnim position={[0, 5, 0]} scale={0.8}/>
        <HundredMLFlask position={[2.2, 5, -2.2]} />
      </group>
    );
  }
);

export default Step5TransferProducts;