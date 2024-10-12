import React, { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { BeakerWaterFill } from "../models/BeakerWaterFill";
import { GlassRod } from "../models/GlassRod";
import { DistilledWater } from "../models/DistilledWater";
import { setNextDisabled } from "../Experience";

interface BeakerHandles {
  playAnimation: (animationName: string) => void;
}

interface ThirteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step13DissolveSample = forwardRef<
  THREE.Group,
  ThirteenthStepComponentProps
>(({ nextButtonRef }, ref) => {
  const beakerRef = useRef<BeakerHandles>(null);
  const distilledWaterRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, []);

  const handleDistilledWaterClick = () => {
    if (distilledWaterRef.current) {
      const targetPosition = new THREE.Vector3(0.1, 5.8, 1.7);

      const tl = gsap.timeline({
        onComplete: () => {
          // Play the "WaterFill" animation on the Beaker
          if (beakerRef.current) {
            beakerRef.current.playAnimation("WaterFill");
          } else {
            console.error("beakerRef.current is null");
          }
        },
      });

      // Animate position
      tl.to(
        distilledWaterRef.current.position,
        {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 2,
          ease: "power1.inOut",
        },
        0 // Start at the beginning of the timeline
      );

      // Animate rotation
      tl.to(
        distilledWaterRef.current.rotation,
        {
          y: "-=" + Math.PI / 2, // Rotate 45 degrees to the right
          x: "-=" + Math.PI / 4,

          duration: 2,
          ease: "power1.inOut",

        },
        0 // Start at the same time as the position animation
      );
    }
  };

  return (
    <group>
      <BeakerWaterFill ref={beakerRef} position={[0.1, 5.1, 0.5]} />
      <GlassRod position={[0.1, 5.1, -1]} />
      <group
        ref={distilledWaterRef}
        position={[0.1, 5.5, 2.5]}
        onClick={handleDistilledWaterClick}
      >
        <DistilledWater />
      </group>
    </group>
  );
});

export default Step13DissolveSample;
