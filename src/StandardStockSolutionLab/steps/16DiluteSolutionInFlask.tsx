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
  const [isAnimating, setIsAnimating] = useState(false);
  const distilledWaterRef = useRef<THREE.Group>(null);
  const flaskRef = useRef<THREE.Group>(null);

  // Manage the next button state based on `hasPoured`
  useEffect(() => {
    if (nextButtonRef.current) {
      hasPoured ? setNextEnabled(nextButtonRef) : setNextDisabled(nextButtonRef);
    }
  }, [hasPoured, nextButtonRef]);

  const handlePour = () => {
    setHasPoured(true);
  };

  const handleWashAgain = () => {
    if (!distilledWaterRef.current || !flaskRef.current) {
      console.error("References to water or flask not available");
      return;
    }

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    const initialPosition = { x: 0.1, y: 5.4, z: 2.5 };
    const pourPosition = { x: 0.1, y: 5.8, z: 1.7 };
    const initialRotation = { x: 0, y: 0, z: 0 };
    const pourRotation = { x: Math.PI / 4, y: -Math.PI / 2, z: 0 };

    // Move the distilled water into pour position
    tl.to(distilledWaterRef.current.position, {
      ...pourPosition,
      duration: 2,
      ease: "power1.inOut",
    })
      .to(distilledWaterRef.current.rotation, {
        ...pourRotation,
        duration: 2,
        ease: "power1.inOut",
      })
      .add(() => {
        // You could trigger another animation on the Flask at this point
        setHasPoured(true);
      })
      // Return distilled water to initial position
      .to(distilledWaterRef.current.position, {
        ...initialPosition,
        duration: 2,
        ease: "power1.inOut",
      })
      .to(distilledWaterRef.current.rotation, {
        ...initialRotation,
        duration: 2,
        ease: "power1.inOut",
      });
  };

  return (
    <group>
      {/* Position the Flask on the right */}
      <Flask ref={flaskRef} position={[2, 4.98, 0]} />

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

      {/* Wash Again Button to trigger animations */}
      <Html position={[0, 9, 0]} transform scale={0.5} rotation-y={90 * Math.PI / 180}>
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg transition-transform duration-300"
          onClick={handleWashAgain}
          disabled={isAnimating} // Disable button during animation
        >
          Wash Again
        </button>
      </Html>
    </group>
  );
};

export default Step16DiluteSolutionInFlask;
