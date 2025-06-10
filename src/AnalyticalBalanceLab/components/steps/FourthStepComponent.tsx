import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { Group } from "three";
import BalanceWithAnimations from "../BalanceWithAnimations";
import { Beaker } from "../Beaker";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import WeighingPaper from "../WeighingPaper";
import { StepRef, StepComponentProps } from "../Experience";

interface BalanceWithAnimationsRef {
  replayAnimation: () => Promise<void>;
  updateBalanceReading: (weight: number) => void;
}

const FourthStepComponent = forwardRef<StepRef, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsRef>(null);
    const groupRef = useRef<Group>(null);
    const [hasPlayed, setHasPlayed] = React.useState(false);

    const handleBalanceClick = () => {
      if (hasPlayed) return;
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.replayAnimation();
        setTimeout(() => {
          setNextDisabled(false);
        }, 3000);

        setHasPlayed(true);
      }
    };

    useImperativeHandle(ref, () => ({
      resetAndReplay: async () => {
        if (balanceWithAnimationsRef.current) {
          setNextDisabled(true);
          await balanceWithAnimationsRef.current.replayAnimation();
          setNextDisabled(false);
        }
      }
    }));

    return (
      <group ref={groupRef}>
        <BalanceWithAnimations
          ref={balanceWithAnimationsRef}
          isOpen={true}
          position={[0, 4.55, 0]}
          onClick={handleBalanceClick}
        />
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
  }
);

FourthStepComponent.displayName = "FourthStepComponent";

export default FourthStepComponent;