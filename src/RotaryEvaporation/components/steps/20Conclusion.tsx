import React, { useEffect, forwardRef } from "react";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { RBFlaskWithEvaporatedProduct } from "../round-bottom-flasks/RBFlaskWithEvapProduct";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step20Conclusion = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    useEffect(() => {
      // Disable the next button
      setNextDisabled(nextButtonRef);
    }, []);

    return (
      <group>
        <RBFlaskWithEvaporatedProduct position={[0,4.9,3.7]} />
      </group>
    );
  },
);

export default Step20Conclusion;
