import { forwardRef, useEffect } from "react";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { setNextDisabled } from "../Experience";
interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step14Finish = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
  useEffect(() => {
    setNextDisabled(nextButtonRef);
  }, [])
  return (
    <group>
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <BeakerFillWithOrganicLayer isFilled position={[0, 5, 0]} startAnimationDelay={-1} />
      {/* Additional elements specific to the first step can be added here */}
    </group>
  );
});

export default Step14Finish;
