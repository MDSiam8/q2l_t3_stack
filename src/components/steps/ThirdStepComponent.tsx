import React, { forwardRef } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import InventorySystem from "../InventorySystem";

const ThirdStepComponent = forwardRef((props, ref) => {
  return (
    <group>
      <InventorySystem position={[3, 1, 0]} transform />
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
      {/* Additional elements specific to the first step can be added here */}
    </group>
  );
});

export default ThirdStepComponent;
