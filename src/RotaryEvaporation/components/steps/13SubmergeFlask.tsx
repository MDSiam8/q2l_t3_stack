import React, { useEffect, forwardRef } from "react";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { RotavapSubmerge } from "../rotavap/RotavapSubmerged";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step13SubmergeFlask = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    return (
      <group>
        <RotavapSubmerge position={[0, 5, 0]} scale={0.8} onClick={() => {
          setTimeout(() => {
            if (nextButtonRef && nextButtonRef.current) {
              setNextEnabled(nextButtonRef);
            }
          }, 3000);
        }} />
        {/* <HundredMLFlask position={[2.2, 5, -2.2]} /> */}
      </group>
    );
  },
);

export default Step13SubmergeFlask;
