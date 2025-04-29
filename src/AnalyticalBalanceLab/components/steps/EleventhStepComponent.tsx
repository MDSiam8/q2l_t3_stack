import React, {
  useRef,
  useEffect,
  forwardRef,
} from "react";
import * as THREE from "three";
import BalanceWithAnimations, { BalanceWithAnimationsHandles } from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Sphere } from "@react-three/drei";
import AnswerBox from "../AnswerBox";
import { Beaker } from "../Beaker";
import { StepComponentProps } from "../Experience";

const EleventhStepComponent = forwardRef<THREE.Group,StepComponentProps>(
  ({ setNextDisabled }) => {
  const balanceWithAnimationsRef = useRef<BalanceWithAnimationsHandles>(null);
  const weighingPaperRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null); // Assuming sphereRef is a ref to a THREE.Mesh
  
  useEffect(() => {
    updateBalanceReadingAfterAddingPowder(0.0012);
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
      <group position={[0.6, 5.6, -0.02]} ref={weighingPaperRef}>
        <WeighingPaper folded={true} rotation-y={(3.14 / 180) * 180} />
        <Sphere
          ref={sphereRef}
          scale={0.0}
          position={[0.01, 0.1, 0]}
          visible={true}
        />
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
        <Sphere scale={0.05} position={[0, 0.05, 0.68]} />
      </group>
      <group position={[2.6, 4.9, -3]}>
        <Beaker rotation-y={(-3.14 / 180) * 90} />
        <Sphere position={[-0.6, 0, -0.2]} scale={0.2} />
      </group>
      <group position={[0, 7, 3]} scale={0.5}>
        <AnswerBox
          question="What is the reading on the balance?"
          correctAnswers={["0.0012 g", ".0012 g", "0.0012", ".0012", "0.0012g", ".0012g"]}
          onCorrectAnswer={() => {setNextDisabled(false)}}
        />
      </group>
    </group>
  );
});

export default EleventhStepComponent;
