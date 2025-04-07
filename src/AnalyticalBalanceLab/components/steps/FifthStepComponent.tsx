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
import { StepRef } from "../Experience";

const FifthStepComponent = forwardRef<StepRef, { setNextDisabled: (value: boolean) => void }>(
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
        
        // Cancel any in-progress tweens
        if (tweenRef.current) {
          tweenRef.current.stop();
          tweenRef.current = null;
        }
        
        // Reset animation state on unmount
        isAnimatingRef.current = false;
      };
    }, []);

    // Function to move the paper up
    const movePaperUp = (): Promise<void> => {
      return new Promise((resolve) => {
        // Reset position to start
        paperGroup.current.position.copy(originalStartPos);
        
        const upPosition = new THREE.Vector3(0, 1, 0);
        const moveDuration = 1; // Duration in seconds
        const endPosition = originalStartPos.clone().add(upPosition);

        // Store the tween in the ref for potential cancellation
        tweenRef.current = new TWEEN.Tween(paperGroup.current.position)
          .to({ x: endPosition.x, y: endPosition.y, z: endPosition.z }, moveDuration * 1600)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            resolve();
          })
          .start();
      });
    };

    // Complete animation sequence
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
          
          // Enable the next button after animation completes
          setTimeout(() => {
            setNextDisabled(false);
            setAnimationPlayed(true); // Mark as played
            isAnimatingRef.current = false;
          }, 3000); // Give enough time for the paper animation to complete
        }
      } catch (error) {
        console.error("Animation error:", error);
        setNextDisabled(false); // Ensure button is enabled even if animation fails
        isAnimatingRef.current = false;
      }
    };

    // Reset everything for a fresh replay
    const resetAnimation = () => {
      setAnimationPlayed(false);
      isAnimatingRef.current = false;
      if (paperGroup.current) {
        paperGroup.current.position.copy(originalStartPos);
      }
      // Cancel any in-progress tweens
      if (tweenRef.current) {
        tweenRef.current.stop();
        tweenRef.current = null;
      }
    };

    // Expose the resetAndReplay method to the parent
    useImperativeHandle(ref, () => ({
      resetAndReplay: () => {
        resetAnimation(); // Reset state first
        runFullAnimation(); // Then run the animation
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