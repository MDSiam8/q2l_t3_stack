import React, { useEffect, useRef, forwardRef } from "react";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { StepComponentProps } from "../Experience";

// Use forwardRef to forward refs to the component
const SecondStepComponent = forwardRef<HTMLDivElement, StepComponentProps>(({ setNextDisabled }) => {
  const bottleRef = useRef();
  const bottleCapRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNextDisabled(false);
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [setNextDisabled]);

  return (
    <group>
      <Bottle ref={bottleRef} position={[0, 5, 0]} />
      <BottleCap ref={bottleCapRef} position={[0, 5.1, 0]} />
    </group>
  );
});

export default SecondStepComponent;
