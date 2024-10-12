import React, { forwardRef } from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";

const Step1Introduction = forwardRef((props, ref) => {
  return (
    <group>
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
      {/* Additional elements specific to the first step can be added here */}
    </group>
  );
});

export default Step1Introduction;
