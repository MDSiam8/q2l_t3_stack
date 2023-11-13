import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";

const FourthStepComponent = forwardRef((props, ref) => {
  const balanceWithAnimationsRef = useRef();

  useEffect(() => {
    // Trigger the animation as soon as the component mounts
    if (balanceWithAnimationsRef.current) {
      balanceWithAnimationsRef.current.replayAnimation();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    replayAnimation: () => {
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.replayAnimation();
      }
    }
  }));

  return (
    <group>
      <BalanceWithAnimations ref={balanceWithAnimationsRef} isOpen={true} position={[0, 4.55, 0]} />
      {/* Additional elements specific to the fourth step can be added here */}
    </group>
  );
});

export default FourthStepComponent;
