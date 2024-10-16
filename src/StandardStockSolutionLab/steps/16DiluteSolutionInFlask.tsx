import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask"; // Assuming you have a Flask component similar to Beaker
import { DistilledWater } from "../models/DistilledWater";
import WhiteTile from "../models/WhiteTile";


interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  // Add other props as necessary
}

const Step16DiluteSolutionInFlask: React.FC<DiluteSolutionInFlaskProps> = ({
  nextButtonRef,
}) => {
  const [hasPoured, setHasPoured] = useState(false); // Track whether the pour action has happened

  // Disable the Next button initially, enable after pouring
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
    // Logic for pouring the solution
    setHasPoured(true);
    // You can add more stuff here
  };


  return (
    <group>
      <Flask position={[0, 4.98, 0]} /> {/* Adjust the position as per your scene */}
      <DistilledWater position={[0, 5.45, 1.5]} rotation-y={270 * Math.PI / 180}/>
      <WhiteTile position={[-0.5, 5.8, 0]} transform scale={2.25} rotation-x={90 * Math.PI / 180} rotation-z={90 * Math.PI / 180}/>
      {/* Floating Pour Button */}
      <Html position={[0, 8, 0]} transform scale={0.5} rotation-y={90 * Math.PI / 180}>
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          onClick={handlePour}
        >
          Pour
        </button>
      </Html>
    </group>
  );
};

export default Step16DiluteSolutionInFlask;
