import React, { useRef, useEffect, forwardRef, useState } from "react";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { setNextEnabled } from "../Experience";
import { MixedFlask } from "../models/MixedFlask";
import { Stopper } from "../models/Stopper";

interface StopperRef {
  replayAnimation: () => void;
}

interface Step19ComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step19MixSolution = forwardRef<THREE.Group, Step19ComponentProps>(
  ({ nextButtonRef }, ref) => {
    const [clickCount, setClickCount] = useState(0);
    
    const flaskStopperGroup = useRef(new THREE.Group());
    const stopperRef = useRef<StopperRef>(null);

    // Mixing animation constants
    const startPos = new THREE.Vector3(0.15, 5, 0);
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

    const handleClick = () => {
      if (clickCount < 4) {
        handleReplayAnimation();
        setClickCount(prev => {
          if (prev === 3) {
            setNextEnabled(nextButtonRef);
          }
          return prev + 1;
        });
      }
    };

    return (
      <group>
        <group 
          ref={flaskStopperGroup} 
          onClick={handleClick}
          position={[0.15, 5, 0]}
        >
          <MixedFlask
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.5}
          />
          <Stopper
            capped={false}
            rotation-x={(3.14 / 180) * 180}
            scale={0.5}
            position={[0, 1.95, 0]}
          />
        </group>
      </group>
    );
  }
);

export default Step19MixSolution;
  