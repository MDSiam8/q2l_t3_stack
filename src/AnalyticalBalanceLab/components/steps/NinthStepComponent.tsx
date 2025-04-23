import React, {
  useRef,
  useEffect,
  forwardRef,
} from "react";
import BalanceWithAnimations, { BalanceWithAnimationsHandles } from "../BalanceWithAnimations";
import WeighingPaper, { WeighingPaperRef } from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Html, Sphere } from "@react-three/drei";
import AnswerBox from "../AnswerBox";
import { Beaker } from "../Beaker";
import { StepComponentProps, StepRef } from "../Experience";

const NinthStepComponent = forwardRef<StepRef, StepComponentProps>(
  ({ setNextDisabled }) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsHandles>(null);
    const weighingPaperRef = useRef<WeighingPaperRef>(null);
  
    useEffect(() => {
      updateBalanceReadingAfterAddingPowder(0.5017);
      setNextDisabled(true);
    }, []);

    const updateBalanceReadingAfterAddingPowder = (num: number) => {
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.updateBalanceReading(num);
      }
    };

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
        </group>
        <group position={[0, 7, 3]} scale={0.5}>
          <AnswerBox
            question="What is the reading on the balance?"
            correctAnswers={["0.5017 g", ".5017 g", ".5017", "0.5017", ".5017g", "0.5017g"]}
            onCorrectAnswer={() => {setNextDisabled(false)}}
          />
        </group>
        <Beaker rotation-y={(-3.14 / 180) * 90} position={[2.6, 4.90, -3]} />
      </group>
    );
  },
);

export default NinthStepComponent;
