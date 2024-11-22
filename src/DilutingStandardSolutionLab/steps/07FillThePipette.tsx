import React, { forwardRef, useRef, useState } from "react";
import { Beaker } from "../models/Beaker";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";
import * as THREE from "three";
import { Html } from "@react-three/drei";



const Step7FillThePipette = forwardRef((props, ref) => {

  const initialBeakerWaterLevel = 1;

  const [beakerWaterLevel, setBeakerWaterLevel] = useState(initialBeakerWaterLevel);
  const [pipetteWaterLevel, setPipetteWaterLevel] = useState(0);
  const [hasPoured, setHasPoured] = useState(false);

  const beakerWaterRef = useRef<THREE.Mesh>(null);
  const pourInterval = useRef<NodeJS.Timeout | null>(null);

  // Start filling the water
  const startFillingWater = () => {
    if (beakerWaterRef.current) {
      pourInterval.current = setInterval(() => {
        setBeakerWaterLevel((prevWaterLevel) => {
          const newLevel = prevWaterLevel - 0.0125;
          if (newLevel <= 1) {
            beakerWaterRef.current!.scale.set(1, newLevel, 1);
            const newVerticalPos = beakerWaterRef.current.position.y - ((prevWaterLevel * 0. - newLevel * 0.7) * 0.5);
            beakerWaterRef.current!.position.set(-0.236, newVerticalPos, 0.594); // Anchor to bottom of flask
            return newLevel;
          } else {
            clearInterval(pourInterval.current!);
            return prevWaterLevel;
          }
        });
        setPipetteWaterLevel((prevWaterLevel) => {
          return prevWaterLevel;
        });
      }, 100); // Adjust the water level every 100ms
    }
  };

  // Stop filling the water and validate the level
  const stopFillingWater = () => {
    if (pourInterval.current) {
      clearInterval(pourInterval.current);
    }

    if (beakerWaterLevel >= 0.61 && beakerWaterLevel <= 0.63) {
      console.log(beakerWaterLevel);
      alert("Success! You filled the water correctly.");
      setHasPoured(true);
    } else if (beakerWaterLevel > 0.63) {
      console.log(beakerWaterLevel);
      alert(`Try again! You "overfilled" the water.`);
      resetWater();
    }
  };

  // Reset the water level
  const resetWater = () => {
    setBeakerWaterLevel(initialBeakerWaterLevel);
    if (beakerWaterRef.current) {
      beakerWaterRef.current!.scale.set(1, initialBeakerWaterLevel, 1);
      beakerWaterRef.current!.position.set(-0.236, 5.4, 0.594);
    }
    setHasPoured(false);
    /*
    if (nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
    */
  };

  // Handle the main pour action
  const handlePour = () => {
    startFillingWater(); // Start the water filling animation
  };

  return (
    <group>
      <GlassPipette position={[0, 5.5, 0.58]} />
      <PipetteBulb position={[0, 8, 0.58]} />
      <Beaker position={[0, 4.96, 0]} />

      {/* Water Mesh */}
      <mesh
          ref={beakerWaterRef}
          position={[-0.236, 5.4, 0.594]}
          scale={[1, initialBeakerWaterLevel, 1]} // Dynamic height based on fill
        >
          <cylinderGeometry args={[0.35, 0.35, 0.7, 32]} />
          <meshStandardMaterial color={"lightblue"} transparent opacity={0.6} />
      </mesh>

       {/* Pour Button */}
       <Html
          position={[0, 8, -1.0]}
          transform
          scale={0.5}
          rotation={[0, Math.PI / 2, 0]} // Corrected rotation
        >
          <button
            onMouseDown={handlePour} // Start pouring on mouse down
            onMouseUp={stopFillingWater} // Stop pouring on mouse up
            className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          >
            Extract Solution
          </button>
        </Html>
    </group>
  );
});
  
export default Step7FillThePipette;