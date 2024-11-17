import React, { forwardRef, useRef, useState, useEffect } from "react";
import { Flask } from "../models/Flask";
import { HundredMLFlaskWithFillAnimation } from "../models/HundredMLFlaskWithFillAnimation";
import { DistilledWater } from "../models/DistilledWater";
import { Stopper } from "../models/Stopper";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { setNextEnabled } from "../Experience";

interface StopperRef {
  replayAnimation: () => void;
}

interface Step11ComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step11AddStopperAndMixSolution = forwardRef<THREE.Group, Step11ComponentProps>(
  ({ nextButtonRef }, ref) => {
  const [stopperAttached, setStopperAttached] = useState(false);
  const [startFlaskAnimation, setStartFlaskAnimation] = useState(9999);
  
  const flaskStopperGroup = useRef(new THREE.Group());
  const stopperGroup = useRef(new THREE.Group());
  const stopperRef = useRef<StopperRef>(null);
  
  let clickCount = 0;

  // Constants for stopper attachment
  const stopperStartPos = new THREE.Vector3(0, 1, 0);

  // Mixing animation constants - EXACTLY as in Step19
  const startPos =  new THREE.Vector3(0.15, 5, 0);
  const targetPosition = new THREE.Vector3(0.15, 7, 0);
  const targetRotationX = (3.14 / 180) * 180;
  const initialRotation = flaskStopperGroup.current.rotation.x;

  useEffect(() => {
    flaskStopperGroup.current.position.copy(startPos);
    
    // Disable the next button initially
    if (nextButtonRef && nextButtonRef.current) {
      nextButtonRef.current.disabled = true;
    }
    
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      TWEEN.update();
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      TWEEN.removeAll();
    };
  }, [nextButtonRef]);

  const moveStopperDown = () => {
    return new Promise((resolve) => {
      const downPosition = new THREE.Vector3(0, -2.23, 0);
      const endPosition = stopperGroup.current.position.clone().add(downPosition);

      new TWEEN.Tween(stopperGroup.current.position)
        .to(endPosition, 1500)
        .onUpdate(() => {
          stopperGroup.current.position.copy(stopperGroup.current.position);
        })
        .onComplete(() => {
          setStopperAttached(true);
          resolve(0);
        })
        .start();
    });
  };

  const handleReplayAnimation = () => {
    const moveToTarget = new TWEEN.Tween(flaskStopperGroup.current.position)
      .to(targetPosition, 1800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => {
        const returnToOriginal = new TWEEN.Tween(flaskStopperGroup.current.position)
          .to(startPos, 1800)
          .easing(TWEEN.Easing.Quadratic.Out);

        const rotateBack = new TWEEN.Tween(flaskStopperGroup.current.rotation)
          .to({ x: initialRotation }, 2000)
          .easing(TWEEN.Easing.Quadratic.Out);

        returnToOriginal.start();
        rotateBack.start();
      })
      .start();

    new TWEEN.Tween(flaskStopperGroup.current.rotation)
      .to({ x: targetRotationX }, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  };

  const handleClick = async () => {
    if (!stopperAttached) {
      await moveStopperDown();
      if (stopperRef.current) {
        stopperRef.current.replayAnimation();
      }
    } else if (clickCount < 4) {
      handleReplayAnimation();
      clickCount++;
      
      if (clickCount === 4) {
        setNextEnabled(nextButtonRef);
      }
    }
  };

  return (
    <group>
      <group 
        ref={flaskStopperGroup} 
        onClick={stopperAttached ? handleClick : undefined}
        position={[0.15, 5, 0]}
      >
        <HundredMLFlaskWithFillAnimation
          startAnimationDelay={startFlaskAnimation}
          position={[0, 0, 3.1]}
          scale={1}
        />
        {/* <Flask
          rotation={[0, 0, 0]}
          scale={0.5}
        /> */}
        {stopperAttached && (
          <Stopper
            capped={false}
            rotation-x={(3.14 / 180) * 180}
            scale={0.5}
            position={[0, 1.27, 0]}
          />
        )}
      </group>
      
      {!stopperAttached && (
        <group ref={stopperGroup} onClick={handleClick}>
          <Stopper
            capped={false}
            rotation-x={(3.14 / 180) * 180}
            scale={0.5}
            ref={stopperRef}
            position={[0.15, 8.5, 0]}
          />
        </group>
      )}
    </group>
  );
});

export default Step11AddStopperAndMixSolution; 