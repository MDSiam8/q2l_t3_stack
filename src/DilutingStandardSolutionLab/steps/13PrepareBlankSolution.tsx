import React, { useRef, useEffect, useState, forwardRef } from "react";
import { GlassRod } from "../models/GlassRod";
import { HundredMLFlaskWithFillAnimation } from "../models/HundredMLFlaskWithFillAnimation";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Html } from "@react-three/drei";
import { setNextEnabled } from "../Experience";
import { DistilledWater } from "../models/DistilledWater";

interface PrepareBlankSolutionProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const PrepareBlankSolution = forwardRef<{}, PrepareBlankSolutionProps>(
({ nextButtonRef }, ref) => {
  const dropperGroup = useRef(new THREE.Group());
  const [waterLevel, setWaterLevel] = useState(0);
  const flaskRef = useRef<any>(null);

  // Function to animate the dropper (simplified for now)
  const animateGlassDropper = () => {
    return new Promise((resolve) => {
      const finalPosition = new THREE.Vector3(0.15, 5.9, -0.7);
      const initialRotation = dropperGroup.current.rotation.clone();

      // First move to position
      new TWEEN.Tween(dropperGroup.current.position)
        .to({ 
          x: finalPosition.x, 
          y: finalPosition.y, 
          z: finalPosition.z 
        }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          // Then tilt after reaching position
          new TWEEN.Tween(dropperGroup.current.rotation)
            .to({
              x: initialRotation.x + 0.6, // Adjust this value to control tilt amount
            }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(resolve)
            .start();
        })
        .start();
    });
  };

  useEffect(() => {
    const startAnimation = async () => {
      await animateGlassDropper();
    };
    
    startAnimation();

    const animate = (time: number) => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  const addWater = () => {
    setWaterLevel(prevLevel => {
      const newLevel = Math.min(prevLevel + 1, 4);
      
      // Enable next button when flask is full
      if (newLevel === 4) {
        setNextEnabled(nextButtonRef);
      }
      
      return newLevel;
    });
  };

  return (
    <group>
      <HundredMLFlaskWithFillAnimation
        ref={flaskRef}
        position={[0.15, 5, 3.1]}
        scale={1}
      />
      
      <GlassRod 
        rotation-x={(3.14 / 180) * 15} 
        position={[0.15, 6, 0]} 
      />

      <group ref={dropperGroup} position={[2.5, 5.5, -1.6]} rotation-y={Math.PI / 2}>
        <DistilledWater scale={1} />
      </group>

      <Html position={[1, 8.8, 0]} transform rotation-y={Math.PI / 2}>
        <button
          className="rounded-full p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 focus:outline-none focus:ring bg-gradient-to-br from-blue-300 to-blue-500 hover:scale-110"
          onClick={addWater}
        >
          Add Water
        </button>
      </Html>
    </group>
  );
});

export default PrepareBlankSolution;