import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Html, Sphere } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { StepComponentProps, StepRef } from "../Experience";

interface BalanceWithAnimationsRef {
  replayAnimation: () => Promise<void>;
  updateBalanceReading: (weight: number) => void;
}

interface WeighingPaperRef {
  replayAnimation: () => void;
}

const SeventhStepComponent = forwardRef<StepRef, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsRef>(null);
    const weighingPaperRef = useRef<WeighingPaperRef>(null);
    const bottleCapGroup = useRef(new THREE.Group());
    const spatulaGroup = useRef(new THREE.Group());
    const initialBottleCapPosition = new THREE.Vector3(0, 0, 0);
    const initialSpatulaPosition = new THREE.Vector3(2.5, 5.0, 0);
    const [sphereScale, setSphereScale] = useState(0.0);
    const [balanceReading, setBalanceReading] = useState(0.0012);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const animate = () => {
        requestAnimationFrame(animate);
        TWEEN.update();
      };

      setNextDisabled(true);
      requestAnimationFrame(animate);

      handleReplayAnimation();
    }, [setNextDisabled]);

    const updateBalanceReading = (newReading: number) => {
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.updateBalanceReading(newReading);
      }
      setBalanceReading(newReading);
    };

    const moveBottleCap = () => {
      return new Promise<void>((resolve) => {
        new TWEEN.Tween(bottleCapGroup.current.position)
          .to({ y: initialBottleCapPosition.y + 1 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            new TWEEN.Tween(bottleCapGroup.current.position)
              .to({ z: initialBottleCapPosition.z - 1 }, 1000)
              .easing(TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                new TWEEN.Tween(bottleCapGroup.current.position)
                  .to({ y: initialBottleCapPosition.y - 2.1 }, 1000)
                  .easing(TWEEN.Easing.Quadratic.Out)
                  .onComplete(resolve)
                  .start();
              })
              .start();
          })
          .start();
      });
    };

    const animateSpatula = () => {
      return new Promise<void>((resolve) => {
        new TWEEN.Tween(spatulaGroup.current.position)
          .to({ y: initialSpatulaPosition.y + 2 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            new TWEEN.Tween(spatulaGroup.current.rotation)
              .to({ x: Math.PI / 2 }, 1000)
              .easing(TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                new TWEEN.Tween(spatulaGroup.current.position)
                  .to({ x: 0.2, y: 5.8, z: 0 }, 1000)
                  .easing(TWEEN.Easing.Quadratic.Out)
                  .onComplete(() => {
                    setSphereScale(0.05);
                    updateBalanceReading(balanceReading + 0.1);
                    resolve();
                  })
                  .start();
              })
              .start();
          })
          .start();
      });
    };

    const handleReplayAnimation = async () => {
      if (isAnimating) return;
      setIsAnimating(true);

      setSphereScale(0);
      updateBalanceReading(0.0012);

      bottleCapGroup.current.position.copy(initialBottleCapPosition);
      spatulaGroup.current.position.copy(initialSpatulaPosition);
      spatulaGroup.current.rotation.set(0, Math.PI / 2, 0);

      await moveBottleCap();
      await animateSpatula();

      setIsAnimating(false);
      setNextDisabled(false);
    };

    useImperativeHandle(ref, () => ({
      resetAndReplay: handleReplayAnimation,
    }));

    return (
      <group>
        <BalanceWithAnimations
          isOpen={false}
          position={[0, 4.55, 0]}
          ref={balanceWithAnimationsRef}
        />
        <group position={[0.6, 5.6, -0.02]}>
          <WeighingPaper
            folded={true}
            ref={weighingPaperRef}
            rotation-y={(3.14 / 180) * 180}
          />
          <Sphere scale={sphereScale} />
        </group>
        <group position={[2, 4.95, -2]}>
          <group ref={bottleCapGroup}>
            <BottleCap />
          </group>
          <Bottle />
        </group>
        <group ref={spatulaGroup} position={[0, 0, 0]}>
          <Spatula rotation-y={(3.14159 / 180) * 90} scale={0.5} />
        </group>
      </group>
    );
  },
);

export default SeventhStepComponent;
