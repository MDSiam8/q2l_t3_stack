import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState
} from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper, { WeighingPaperRef } from "../WeighingPaper";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Beaker } from "../Beaker";
import { StepComponentProps, StepRef } from "../Experience";

const FifthStepComponent = forwardRef<StepRef, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    const weighingPaperRef = useRef<WeighingPaperRef>(null);
    const paperGroup = useRef<THREE.Group>(new THREE.Group());
    const originalStartPos = new THREE.Vector3(0, 5, -3);
    /** @ts-ignore @type {Tween} */
    const tweenRef = useRef<TWEEN.Tween | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
      if (paperGroup.current) {
        paperGroup.current.position.copy(originalStartPos);
      }

      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        TWEEN.update();
      };
      
      animate();

      // Cleanup function to stop animation loop on unmount
      return () => {
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
        
        if (tweenRef.current) {
          tweenRef.current.stop();
          tweenRef.current = null;
        }
        
        isAnimatingRef.current = false;
      };
    }, []);

    const movePaperUp = (): Promise<void> => {
      return new Promise((resolve) => {
        paperGroup.current.position.copy(originalStartPos);
        
        const upPosition = new THREE.Vector3(0, 1, 0);
        const moveDuration = 1;
        const endPosition = originalStartPos.clone().add(upPosition);

        tweenRef.current = new TWEEN.Tween(paperGroup.current.position)
          .to({ x: endPosition.x, y: endPosition.y, z: endPosition.z }, moveDuration * 1600)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            resolve();
          })
          .start();
      });
    };

    const runFullAnimation = async () => {
      if (animationPlayed || isAnimatingRef.current) {
        return;
      }
      
      isAnimatingRef.current = true;
      setNextDisabled(true);
      
      try {
        await movePaperUp();
        
        // After paper moves up, trigger its animation
        if (weighingPaperRef.current) {
          weighingPaperRef.current.replayAnimation();
          setTimeout(() => {
            setNextDisabled(false);
            setAnimationPlayed(true);
            isAnimatingRef.current = false;
          }, 3000);
        }
      } catch (error) {
        // Next button will trigger even if animation bugs
        console.error("Animation error:", error);
        setNextDisabled(false);
        isAnimatingRef.current = false;
      }
    };

    const resetAnimation = () => {
      setAnimationPlayed(false);
      isAnimatingRef.current = false;
      if (paperGroup.current) {
        paperGroup.current.position.copy(originalStartPos);
      }
      if (tweenRef.current) {
        tweenRef.current.stop();
        tweenRef.current = null;
      }
    };

    useImperativeHandle(ref, () => ({
      resetAndReplay: () => {
        resetAnimation();
        runFullAnimation();
      }
    }));

    return (
      <group>
        <BalanceWithAnimations isOpen={false} position={[0, 4.55, 0]} />
        <group ref={paperGroup}>
          <WeighingPaper
            folded={false}
            ref={weighingPaperRef}
            rotation-y={(3.14 / 180) * 180}
            onClick={runFullAnimation}
          />
        </group>
        <Spatula
          rotation-y={(3.14 / 180) * 90}
          scale={0.5}
          position={[2.5, 5, 0]}
        />
        <BottleCap position={[2, 5.1, -2]} />
        <Bottle position={[2, 5, -2]} />
        <Beaker rotation-y={(-3.14 / 180) * 90} position={[2.6, 4.9, -3]} />
      </group>
    );
  }
);

FifthStepComponent.displayName = "FifthStepComponent";

export default FifthStepComponent;