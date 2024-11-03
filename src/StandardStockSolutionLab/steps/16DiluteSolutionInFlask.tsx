import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask";
import { DistilledWater } from "../models/DistilledWater";
import WhiteTile from "../models/WhiteTile";
import gsap from "gsap"; // Import GSAP for animations

interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step16DiluteSolutionInFlask: React.FC<DiluteSolutionInFlaskProps> = ({
  nextButtonRef,
}) => {
  const [hasPoured, setHasPoured] = useState(false);
  const [needsWashing, setNeedsWashing] = useState(false); // Track if the flask needs washing

  useEffect(() => {
    if (nextButtonRef.current) {
      if (hasPoured) {
        setNextEnabled(nextButtonRef);
      } else {
        setNextDisabled(nextButtonRef);
      }
    }
  }, [hasPoured, nextButtonRef]);

  const handlePour = () => {
    setHasPoured(true);
  };

  const handleWashAgain = () => {
    setNeedsWashing(true);
    // Trigger washing animations similar to Step 13
    const tl = gsap.timeline({
      onComplete: () => {
        setNeedsWashing(false); // Reset after animation completes
      },
    });

    // Add washing animations, adjusting position and rotation as needed
    tl.to(
      { /* target element */ },
      { x: 0.1, y: 5.8, z: 1.7, duration: 2, ease: "power1.inOut" }
    ).to(
      { /* rotation target */ },
      { y: "-=" + Math.PI / 2, x: "-=" + Math.PI / 4, duration: 2, ease: "power1.inOut" }
    );
  };

  return (
    <group>
      <Flask position={[0, 4.98, 0]} />
      <DistilledWater position={[0, 5.45, 1.5]} rotation-y={270 * Math.PI / 180} />
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
