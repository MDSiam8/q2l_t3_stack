import React, { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask";
import { DistilledWater } from "../models/DistilledWater";
import WhiteTile from "../models/WhiteTile";

interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step16DiluteSolutionInFlask: React.FC<DiluteSolutionInFlaskProps> = ({
  nextButtonRef,
}) => {
  const [hasPoured, setHasPoured] = useState(false);
  const [needsWashing, setNeedsWashing] = useState(false);
  const distilledWaterRef = useRef<THREE.Group>(null); // Reference to distilled water

  // Enable or disable the next button based on pouring status
  useEffect(() => {
    if (nextButtonRef.current) {
      hasPoured ? setNextEnabled(nextButtonRef) : setNextDisabled(nextButtonRef);
    }
  }, [hasPoured, nextButtonRef]);

  const handlePour = () => {
    setHasPoured(true);
  };

  const handleWashAgain = () => {
    if (!distilledWaterRef.current) {
      console.error("distilledWaterRef is not available");
      return;
    }

    setNeedsWashing(true);

    // New GSAP timeline for washing animation
    const tl = gsap.timeline({
      onComplete: () => {
        setNeedsWashing(false); // Reset the washing state after animation completes
      },
    });

    // Example washing animation - adapt positions and rotations as needed
    tl.to(distilledWaterRef.current.position, {
      x: 0.1,
      y: 5.8,
      z: 1.7,
      duration: 2,
      ease: "power1.inOut",
    }).to(distilledWaterRef.current.rotation, {
      x: "-=" + Math.PI / 4,
      y: "-=" + Math.PI / 2,
      duration: 2,
      ease: "power1.inOut",
    });

    // Return distilled water to initial position after wash
    tl.to(distilledWaterRef.current.position, {
      x: 0.1,
      y: 5.4,
      z: 2.5,
      duration: 2,
      ease: "power1.inOut",
    }).to(distilledWaterRef.current.rotation, {
      x: 0,
      y: 0,
      duration: 2,
      ease: "power1.inOut",
    });
  };

  return (
    <group>
      <Flask position={[0, 4.98, 0]} />
      <DistilledWater
        ref={distilledWaterRef}
        position={[0.1, 5.4, 2.5]}
        rotation-y={270 * Math.PI / 180}
      />
      <WhiteTile position={[-0.5, 5.8, 0]} transform scale={2.25} rotation-x={90 * Math.PI / 180} rotation-z={90 * Math.PI / 180} />

      {/* Pour Button */}
      <Html position={[0, 8, 0]} transform scale={0.5} rotation-y={90 * Math.PI / 180}>
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          onClick={handlePour}
        >
          Pour
        </button>
      </Html>

      {/* Wash Again Button */}
      <Html position={[0, 9, 0]} transform scale={0.5} rotation-y={90 * Math.PI / 180}>
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg transition-transform duration-300"
          onClick={handleWashAgain}
        >
          Wash Again
        </button>
      </Html>
    </group>
  );
};

export default Step16DiluteSolutionInFlask;