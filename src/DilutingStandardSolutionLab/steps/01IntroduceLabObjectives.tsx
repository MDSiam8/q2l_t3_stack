import React, { forwardRef } from "react";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";

const Step1Introduction = forwardRef((props, ref) => {
  return (
    <group>
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <GlassPipette position={[0, 5.5, 0]} />
      {/* Additional elements specific to the first step can be added here */}
      <PipetteBulb position={[0, 8, 0]} />
    </group>
  );
});

export default Step1Introduction;
