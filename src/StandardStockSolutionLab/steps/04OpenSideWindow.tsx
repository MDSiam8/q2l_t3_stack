import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";
import { Beaker } from "../models/Beaker";
import { Bottle } from "../models/Bottle";
import { BottleCap } from "../models/BottleCap";
import { Spatula } from "../models/Spatula";
import WeighingPaper from "../models/WeighingPaper";
import { setNextEnabled } from "../Experience";

interface BalanceWithAnimationsRef {
  replayAnimation: () => Promise<void>;
  updateBalanceReading: (weight: number) => void; // Assuming it's a function that takes a number
}

interface FourthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step4OpenSideWindow = forwardRef<{}, FourthStepComponentProps>(
  ({ nextButtonRef }, ref) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsRef>(null);

    // useEffect(() => {
    //   // Trigger the animation as soon as the component mounts
    //   if (balanceWithAnimationsRef.current) {
    //     balanceWithAnimationsRef.current.replayAnimation();
    //   }
    // }, []);

    const handleBalanceClick = () => {
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.replayAnimation();

        setNextEnabled(nextButtonRef);
  
      }
    };

    useImperativeHandle(ref, () => ({
      replayAnimation: () => {
        if (balanceWithAnimationsRef.current) {
          balanceWithAnimationsRef.current.replayAnimation();
        }
      },
    }));

    return (
      <group>
        <BalanceWithAnimations
          ref={balanceWithAnimationsRef}
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

export default Step4OpenSideWindow;
