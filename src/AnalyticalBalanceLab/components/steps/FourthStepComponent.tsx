import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import { Beaker } from "../Beaker";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import WeighingPaper from "../WeighingPaper";
import { setNextEnabled, setReplayDisabled, setReplayEnabled } from "../Experience";

interface BalanceWithAnimationsRef {
  replayAnimation: () => Promise<void>;
}

interface FourthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  replayAnimButtonRef: React.RefObject<HTMLButtonElement>;
}

const FourthStepComponent = forwardRef<BalanceWithAnimationsRef, FourthStepComponentProps>(
  ({ nextButtonRef, replayAnimButtonRef }, ref) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsRef | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleBalanceClick = async () => {
      if (balanceWithAnimationsRef.current && !isAnimating) {
        setIsAnimating(true);

        // Disable replay button during animation
        if (replayAnimButtonRef && replayAnimButtonRef.current) {
          setReplayDisabled(replayAnimButtonRef)
        }

        // Start the animation
        await balanceWithAnimationsRef.current.replayAnimation();
      }
    };

    useEffect(() => {
      if (isAnimating) {
        // Simulate animation duration with setTimeout
        const animationDuration = 2000; // Change this to the actual duration of your animation in milliseconds

        const timeoutId = setTimeout(() => {
          setIsAnimating(false);
          setNextEnabled(nextButtonRef);

          // Enable replay button after animation is finished
          if (replayAnimButtonRef && replayAnimButtonRef.current) {
            setReplayEnabled(replayAnimButtonRef)
          }
        }, animationDuration);

        return () => clearTimeout(timeoutId);
      }
    }, [isAnimating, nextButtonRef, replayAnimButtonRef]);

    useImperativeHandle(ref, () => ({
      replayAnimation: handleBalanceClick,
    }));

    return (
      <group>
        <BalanceWithAnimations
          ref={(node) => (balanceWithAnimationsRef.current = node)}
          isOpen={true}
          position={[0, 4.55, 0]}
          onClick={handleBalanceClick}
        />
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
  },
);

export default FourthStepComponent;
