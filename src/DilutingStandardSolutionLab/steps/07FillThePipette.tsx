import React, { forwardRef, useEffect, useRef, useState } from "react";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";
import * as THREE from "three";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { BeakerStockSolutionFill } from "../models/BeakerWithOrangeFillAnim";
import { Canvas } from "@react-three/fiber";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step7Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step7FillThePipette = forwardRef<THREE.Group, Step7Props>(({nextButtonRef}, ref) => {

  const initialBeakerWaterLevel = 1;
  const initialPipetteWaterLevel = 0;

  const [beakerWaterLevel, setBeakerWaterLevel] = useState(initialBeakerWaterLevel);
  const [pipetteWaterLevel, setPipetteWaterLevel] = useState(initialPipetteWaterLevel);
  const [hasExtracted, setHasExtracted] = useState(false);

  const beakerWaterRef = useRef<THREE.Mesh>(null);
  const pipetteWaterRef = useRef<THREE.Mesh>(null);
  const zoomedPipetteWaterRef = useRef<THREE.Mesh>(null);
  const extractionInterval = useRef<NodeJS.Timeout | null>(null);

  // Disable the next button initially
  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  // Enable the next button based on extracting success
  useEffect(() => {
    if (nextButtonRef.current) {
      if (hasExtracted) {
        setNextEnabled(nextButtonRef);
      } else {
        setNextDisabled(nextButtonRef);
      }
    }
  }, [hasExtracted, nextButtonRef]);

  // Start filling the water
  const startExtractingWater = () => {
    if (beakerWaterRef.current && pipetteWaterRef.current) {
      extractionInterval.current = setInterval(() => {
        // Lower water level in the beaker
        setBeakerWaterLevel((prevWaterLevel) => {
          const newLevel = prevWaterLevel - 0.001;
          if (newLevel <= 0) {
            beakerWaterRef.current!.scale.set(1, 0, 1);
            const newVerticalPos = beakerWaterRef.current!.position.y - ((prevWaterLevel * 0.7) * 0.5);
            beakerWaterRef.current!.position.set(0, newVerticalPos, 0.58); // Anchor to bottom of beaker
            return 0;
          } else if (newLevel <= 1) {
            beakerWaterRef.current!.scale.set(1, newLevel, 1);
            const newVerticalPos = beakerWaterRef.current!.position.y - ((prevWaterLevel * 0.7 - newLevel * 0.7) * 0.5);
            beakerWaterRef.current!.position.set(0, newVerticalPos, 0.58); // Anchor to bottom of beaker
            return newLevel;
          } else {
            clearInterval(extractionInterval.current!);
            return prevWaterLevel;
          }
        });

        // Raise water level in the pipette
        setPipetteWaterLevel((prevWaterLevel) => {
          const newLevel = prevWaterLevel + 0.02;
          if (newLevel >= 1.25) {
            pipetteWaterRef.current!.scale.set(1, 1.25, 1);
            const newVerticalPos = pipetteWaterRef.current!.position.y - ((prevWaterLevel * 2) * 0.5);
            pipetteWaterRef.current!.position.set(0, newVerticalPos, 0.58);
            return 1.25;
          } else if (newLevel < 1.25) {
            pipetteWaterRef.current!.scale.set(1, newLevel, 1);
            zoomedPipetteWaterRef.current!.scale.set(1, newLevel, 1);
            const newVerticalPos1 = pipetteWaterRef.current!.position.y - ((prevWaterLevel * 2 - newLevel * 2) * 0.5);
            const newVerticalPos2 = zoomedPipetteWaterRef.current!.position.y - ((prevWaterLevel * 2 - newLevel * 2) * 0.5);
            pipetteWaterRef.current!.position.set(0, newVerticalPos1, 0.58);
            zoomedPipetteWaterRef.current!.position.set(-1, newVerticalPos2, 0.1);
            return newLevel;
          } else {
            clearInterval(extractionInterval.current!);
            return prevWaterLevel;
          }
        });

      }, 100); // Adjust the water level every 100ms
    }
  };

  // Stop filling the water and validate the level
  const stopExtractingWater = () => {
    if (extractionInterval.current) {
      clearInterval(extractionInterval.current);
    }

    if (pipetteWaterLevel >= 0.98 && pipetteWaterLevel <= 1.02) {
      console.log(pipetteWaterLevel);
      alert("Success! You filled the water correctly.");
      setHasExtracted(true);
    } else if (pipetteWaterLevel > 1.02) {
      console.log(pipetteWaterLevel);
      alert(`Try again! You "overfilled" the water.`);
      resetWater();
    }
  };

  // Reset the water level
  const resetWater = () => {

    setBeakerWaterLevel(initialBeakerWaterLevel);
    if (beakerWaterRef.current) {
      beakerWaterRef.current!.scale.set(1, initialBeakerWaterLevel, 1);
      beakerWaterRef.current!.position.set(0, 5.4, 0.58);
    }

    setPipetteWaterLevel(initialPipetteWaterLevel);
    if (pipetteWaterRef.current) {
      pipetteWaterRef.current!.scale.set(1, initialPipetteWaterLevel, 1);
      pipetteWaterRef.current!.position.set(0, 5.55, 0.58);
    }

    if (zoomedPipetteWaterRef.current) {
      zoomedPipetteWaterRef.current!.scale.set(1, initialPipetteWaterLevel, 1);
      zoomedPipetteWaterRef.current!.position.set(-1, 0.05, 0.1);
    }
    setHasExtracted(false);
    
    if (nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }

  };

  // Handle the main pour action
  const handleExtraction = () => {
    startExtractingWater(); // Start the water extracting animation
  };

  return (
    <group>
      <GlassPipette position={[0, 5.5, 0.58]} />
      <PipetteBulb position={[0, 8, 0.58]} />
      {/*<Beaker position={[0, 4.96, 0]} />*/}
      <BeakerStockSolutionFill position={[0, 4.96, 0.58]} />

      {/* Water Mesh inside the Beaker */}
      <mesh
        ref={beakerWaterRef}
        position={[0, 5.4, 0.58]}
        scale={[1, beakerWaterLevel, 1]} // Dynamic height based on fill
      >
        <cylinderGeometry args={[0.35, 0.35, 0.7, 32]} />
        <meshStandardMaterial color={"lightblue"} transparent opacity={0.6} />
      </mesh>

      {/* Water Mesh inside the Pipette */}
      <mesh
        ref={pipetteWaterRef}
        position={[0, 5.55, 0.58]}
        scale={[1, pipetteWaterLevel, 1]} // Dynamic height based on fill
      >
        <cylinderGeometry args={[0.017, 0.017, 2, 32]} />
        <meshStandardMaterial color={ new THREE.Color(0x74cdee) } transparent opacity={0.6} />
      </mesh>

      {/* Pour Button */}
      <Html
        position={[0, 8, -1.0]}
        transform
        scale={0.5}
        rotation={[0, Math.PI / 2, 0]} // Corrected rotation
      >
        <button
          onMouseDown={handleExtraction} // Start pouring on mouse down
          onMouseUp={stopExtractingWater} // Stop pouring on mouse up
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
        >
          Extract Solution
        </button>
      </Html>

      {/* Canvas with zoomed in view */}
      <Html position={[0, 6.5, -1.2]} transform scale={0.8} rotation-y={Math.PI / 2}>
        <div style={{ width: 100, height: 70, border: "1px solid black" }}>
          <Canvas>
            <PerspectiveCamera
              makeDefault
              position={ [0, 1.98, 0] }
              onUpdate={self => self.lookAt(-1, 1.98, 0)}
              fov={ 15 }            />
            <ambientLight intensity={0.5} />
            <GlassPipette position={[-1, 0, 0.1]} />
            <mesh
              ref={zoomedPipetteWaterRef}
              position={[-1, 0.05, 0.1]}
              scale={[1, pipetteWaterLevel, 1]} // Dynamic height based on fill
            >
              <cylinderGeometry args={[0.017, 0.017, 2, 32]} />
              <meshStandardMaterial color={ new THREE.Color(0x74cdee) } transparent opacity={0.6} />
            </mesh>
          </Canvas>
        </div>
      </Html>
    </group>
  );
});
  
export default Step7FillThePipette;