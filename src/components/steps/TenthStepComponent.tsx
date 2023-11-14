import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Sphere } from "@react-three/drei";
import AnswerBox from "../AnswerBox";
import { Beaker } from "../Beaker";

const TenthStepComponent = forwardRef(({ nextButtonRef }, ref) => {
  const balanceWithAnimationsRef = useRef();
  const weighingPaperRef = useRef();
  const sphereRef = useRef();
  const [initialWeighingPaperPosition, setInitialWeighingPaperPosition] =
    useState();
  const [initialWeighingPaperRotation, setInitialWeighingPaperRotation] =
    useState();
  const [initialSpherePos, setInitialSpherePos] = useState();
  const [sphereScale, setSphereScale] = useState(0);

  useEffect(() => {
    resetAnimationObjects();
    updateBalanceReadingAfterAddingPowder(0.5017);
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    requestAnimationFrame(animate);
    handleReplayAnimation();
  }, []);

  const updateBalanceReadingAfterAddingPowder = (num: number) => {
    if (balanceWithAnimationsRef.current) {
      balanceWithAnimationsRef.current.updateBalanceReading(num);
    }
  };

  const resetAnimationObjects = () => {
    if (
      weighingPaperRef.current &&
      initialWeighingPaperPosition &&
      initialWeighingPaperRotation
    ) {
      weighingPaperRef.current.position.copy(initialWeighingPaperPosition);
      weighingPaperRef.current.rotation.copy(initialWeighingPaperRotation);
    }
    if (sphereRef.current && initialSpherePos) {
      sphereRef.current.position.copy(initialSpherePos);
      sphereRef.current.visible = true; // Make the sphere visible again
    }
    setSphereScale(0.0);
  };

  const handleReplayAnimation = async () => {
    resetAnimationObjects();
    if (balanceWithAnimationsRef.current) {
      await balanceWithAnimationsRef.current.replayAnimation();
    }
    await animateWeighingPaperAndSphere();
  };

  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
  }));

  const animateWeighingPaperAndSphere = async () => {
    // Animate the weighing paper to the beaker's position
    const targetPosition = new THREE.Vector3(2, 6.4, -2.7);
    updateBalanceReadingAfterAddingPowder(0);
    new TWEEN.Tween(weighingPaperRef.current.position)
      .to(targetPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => {
        // Rotate the weighing paper by 45 degrees on the z-axis
        new TWEEN.Tween(weighingPaperRef.current.rotation)
          .to({ x: -Math.PI / 4 }, 2000) // 45 degrees in radians
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            sphereRef.current.visible = true;
            // Animate the sphere downward by 1 unit and then hide it
            new TWEEN.Tween(sphereRef.current.position)
              .to(
                {
                  y: sphereRef.current.position.y - 0.9,
                  z: sphereRef.current.position.z - 1.5,
                },
                2000,
              )
              .easing(TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                sphereRef.current.visible = false; // Hide the sphere after animation
                setSphereScale(0.15);

                // Return the weighing paper to its original position and rotation
                if (
                  initialWeighingPaperPosition &&
                  initialWeighingPaperRotation
                ) {
                  new TWEEN.Tween(weighingPaperRef.current.position)
                    .to(initialWeighingPaperPosition, 2000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onComplete(() => {
                        updateBalanceReadingAfterAddingPowder(0.0017);
                    })
                    .start();
                  new TWEEN.Tween(weighingPaperRef.current.rotation)
                    .to({x: 0}, 2000)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
                }
              })
              .start();
          })
          .start();
      })
      .start();
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
          scale={0.1}
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
        <Sphere position={[-0.6, 0, -0.2]} scale={sphereScale} />
      </group>
    </group>
  );
});

export default TenthStepComponent;
