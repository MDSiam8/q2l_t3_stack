import React, { forwardRef, useEffect } from "react";
import { Group } from "three";
import BalanceWithAnimations from "../BalanceWithAnimations";
import { StepComponentProps } from "../Experience";

const FirstStepComponent = forwardRef<Group, StepComponentProps>(({ setNextDisabled }, ref) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNextDisabled(false);
    }, 2000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [setNextDisabled]);
  
  return (
    <group ref={ref}>
      <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
    </group>
  );
});

export default FirstStepComponent;