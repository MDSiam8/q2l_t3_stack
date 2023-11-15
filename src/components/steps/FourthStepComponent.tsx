import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import { Beaker } from "../Beaker";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import WeighingPaper from "../WeighingPaper";

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
      <Beaker rotation-y={(-3.14 / 180) * 90} position={[2.6, 4.9, -3]} />
      <WeighingPaper
        folded={false}
        rotation-y={(3.14 / 180) * 180}
        position={[0, 5, -3]}
      />
      <Spatula
        rotation-y={(3.14 / 180) * 90}
        scale={0.5}
        position={[2.5, 5, 0]}
      />
      <BottleCap position={[2, 5.1, -2]} />
      <Bottle position={[2, 5, -2]} />
    </group>
  );
});

export default FourthStepComponent;
