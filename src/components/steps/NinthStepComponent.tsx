import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Html, Sphere } from "@react-three/drei";
import AnswerBox from "../AnswerBox";

const NinthStepComponent = forwardRef(({ nextButtonRef }, ref) => {
  const balanceWithAnimationsRef = useRef();
  const weighingPaperRef = useRef();

  useEffect(() => {
    updateBalanceReadingAfterAddingPowder(0.5017);
    if (nextButtonRef && nextButtonRef.current) {
      nextButtonRef.current.disabled = true; // Disable the button initially
      nextButtonRef.current.style.opacity = 0.5;
    }
  }, []);

  const updateBalanceReadingAfterAddingPowder = (num: number) => {
    if (balanceWithAnimationsRef.current) {
      balanceWithAnimationsRef.current.updateBalanceReading(num);
    }
  };

  const handleReplayAnimation = async () => {
    if (balanceWithAnimationsRef.current) {
    //   await balanceWithAnimationsRef.current.replayAnimation();
    }
  };

  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
  }));

  return (
    <group>
      <BalanceWithAnimations
        isOpen={true}
        position={[0, 4.55, 0]}
        ref={balanceWithAnimationsRef}
      />
      <group position={[0.6, 5.6, -0.02]}>
        <WeighingPaper
          folded={true}
          ref={weighingPaperRef}
          rotation-y={(3.14 / 180) * 180}
        />
        <Sphere scale={0.1} position={[0.01, 0.1, 0]} />
      </group>
      <group>
        <BottleCap position={[2, 5.1, -2]} />
      </group>
      <group position={[2, 5, -2]}>
        <Bottle />
      </group>
      <group>
        <Spatula
          rotation-y={(3.14 / 180) * 90}
          scale={0.5}
          position={[2.5, 5, 0]}
        />
        {<Sphere scale={0.05} position={[0, 0.05, 0.68]} />}
      </group>
      <group position={[0, 7, 3]} scale={0.5}>
        <AnswerBox
          question="What is the reading on the balance?"
          correctAnswer="0.5017 g"
          onCorrectAnswer={() => {
            if (nextButtonRef && nextButtonRef.current) {
      nextButtonRef.current.style.opacity = 1;
      nextButtonRef.current.disabled = false; // Enable the button when the correct answer is given
              }
          }}
        />
      </group>
    </group>
  );
});

export default NinthStepComponent;
