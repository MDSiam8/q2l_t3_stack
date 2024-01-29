import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { setReplayDisabled, setReplayEnabled } from "../Experience"; // Import the necessary functions
import { setNextEnabled } from "../Experience";
import { Beaker } from "../Beaker";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

interface BalanceWithAnimationsRef {
  replayAnimation: () => Promise<void>;
  updateBalanceReading: (weight: number) => void; // Assuming it's a function that takes a number
}

interface WeighingPaperRef {
  replayAnimation: () => Promise<void>;
}

interface SixthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  replayButtonRef: React.RefObject<HTMLButtonElement>; // Add replayButtonRef to props
}

const SixthStepComponent = forwardRef<{}, SixthStepComponentProps>(
  ({ nextButtonRef, replayButtonRef }, ref) => {
    const balanceWithAnimationsRef = useRef<BalanceWithAnimationsRef>(null);
    const weighingPaperRef = useRef<WeighingPaperRef>(null);
    const paperGroup = useRef(new THREE.Group());
    const startPos = new THREE.Vector3(0, 1, 0);
    const [isAnimating, setIsAnimating] = useState(false);

    const updateBalanceReadingAfterPaperDown = (num: number) => {
      if (balanceWithAnimationsRef.current) {
        balanceWithAnimationsRef.current.updateBalanceReading(num);
      }
    };

    const movePaperLeft = () => {
      return new Promise<void>((resolve) => {
        const leftPosition = new THREE.Vector3(0.6, 0, 2.98);
        const endPosition = startPos.clone().add(leftPosition);

        new TWEEN.Tween(paperGroup.current.position)
          .to(endPosition, 1700)
          .onUpdate(() => {
            paperGroup.current.position.copy(paperGroup.current.position);
          })
          .onComplete(() => resolve())
          .start();
      });
    };

    const movePaperDown = () => {
      return new Promise<void>((resolve) => {
        const downPosition = new THREE.Vector3(0, -0.4, 0);
        const endPosition = paperGroup.current.position.clone().add(downPosition);

        new TWEEN.Tween(paperGroup.current.position)
          .to(endPosition, 1500)
          .onUpdate(() => {
            paperGroup.current.position.copy(paperGroup.current.position);
          })
          .onComplete(() => resolve())
          .start();
      });
    };

    const handleReplayAnimation = async () => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);

      // Disable replay button during animation
      if (replayButtonRef && replayButtonRef.current) {
        setReplayDisabled(replayButtonRef);
      }

      updateBalanceReadingAfterPaperDown(0.0);
      paperGroup.current.position.copy(startPos);
      await movePaperLeft();
      await movePaperDown();
      updateBalanceReadingAfterPaperDown(0.0012);

      setIsAnimating(false);

      // Enable replay button after animation is finished
      if (replayButtonRef && replayButtonRef.current) {
        setReplayEnabled(replayButtonRef);
      }

      setNextEnabled(nextButtonRef);
    };

    useEffect(() => {
      const animate = () => {
        requestAnimationFrame(animate);
        TWEEN.update();
      };
      requestAnimationFrame(animate);

      handleReplayAnimation(); // Start the initial animation sequence
    }, [nextButtonRef, replayButtonRef]); // Include replayButtonRef as a dependency

    useImperativeHandle(ref, () => ({
      replayAnimation: handleReplayAnimation,
    }));

    return (
      <group>
        {/* Other elements on the table */}
        <BalanceWithAnimations
          isOpen={false}
          position={[0, 4.55, 0]}
          ref={balanceWithAnimationsRef}
        />
        {/* Ensure other elements on the table are visible and set their positions accordingly */}
        <group>
          <Beaker rotation-y={(-3.14 / 180) * 90} position={[2.6, 4.9, -3]} />
          <Spatula
            rotation-y={(3.14 / 180) * 90}
            scale={0.5}
            position={[2.5, 5, 0]}
          />
          <BottleCap position={[2, 5.1, -2]} />
          <Bottle position={[2, 5, -2]} />
          <group ref={paperGroup}>
            <WeighingPaper
              folded={true}
              ref={weighingPaperRef}
              position={[0, 5, -3]}
              rotation-y={(3.14 / 180) * 180}
              onClick={() => handleReplayAnimation()}
            />
          </group>
        </group>
      </group>
    );
  }
);

export default SixthStepComponent;
