import React, { forwardRef, useEffect } from "react";
import { Group } from "three";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";
import { StepComponentProps } from "../Experience";

const Step1Introduction = forwardRef<Group, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setNextDisabled(false);
      }, 2000);

      // Cleanup the timer when the component unmounts
      return () => clearTimeout(timer);
    }, [setNextDisabled]);
  
  return (
    <group>
      <GlassPipette position={[0, 5.5, 0]} />
      <PipetteBulb position={[0, 8, 0]} />
    </group>
  );
});

export default Step1Introduction;