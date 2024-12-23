import React, { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Cuvette } from "../models/Cuvette";
import { GlassDropper } from "../models/GlassDropper";

interface Step5Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
}

// Color of the solution for easy changing later
let solutionColor = new THREE.Color( 0x1777e7 );

const Step5FillTheCuvette = forwardRef<THREE.Group, Step5Props>(({nextButtonRef}, ref) => {

  const [taskComplete, setTaskComplete] = useState(false);

  const cuvetteWaterRef = useRef<THREE.Mesh>(null);
  const dropperWaterRef = useRef<THREE.Mesh>(null);
  const zoomedWaterRef = useRef<THREE.Mesh>(null);

  const addSolutionInterval = useRef<NodeJS.Timeout | null>(null);

  // Disable the next button initially
  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  // Enable the next button based when the solution has been added to the correct amount
  useEffect(() => {
    if (nextButtonRef.current) {
      if (taskComplete) {
        setNextEnabled(nextButtonRef);
      } else {
        setNextDisabled(nextButtonRef);
      }
    }
  }, [taskComplete, nextButtonRef]);

  const resetSolution = () => {
    if (cuvetteWaterRef.current) {
      cuvetteWaterRef.current.scale.set(1, 0, 1);
      cuvetteWaterRef.current.position.set(0, 5.22 - (0.45 * 0.5), 0);
    }

    if (zoomedWaterRef.current) {
      zoomedWaterRef.current.scale.set(1, 0, 1);
      zoomedWaterRef.current.position.set(-0.85, 0.46 - (0.45 * 0.5), 1.6);
    }

    if (dropperWaterRef.current) {
      dropperWaterRef.current.scale.set(1, 1, 1);
      dropperWaterRef.current.position.set(0, 6.5, 0);
    }
  }

  const startAddingSolution = () => {
    if (cuvetteWaterRef.current && dropperWaterRef.current && zoomedWaterRef.current) {
      addSolutionInterval.current = setInterval(() => {
        // Increase water level inside cuvette (in both main view and zoomed-in view)
        const newCuvetteLevel = cuvetteWaterRef.current!.scale.y + 0.002;
        if (newCuvetteLevel > 1.3) {
          cuvetteWaterRef.current!.scale.y = 1.3;
          cuvetteWaterRef.current!.position.y = 5.22 + (0.45 * 0.5 * 0.3);
          zoomedWaterRef.current!.scale.y = 1.3;
          zoomedWaterRef.current!.position.y = 0.46 + (0.45 * 0.5 * 0.3);
        } else {
          cuvetteWaterRef.current!.scale.y = newCuvetteLevel;
          cuvetteWaterRef.current!.position.y += 0.45 * 0.5 * 0.001;
          zoomedWaterRef.current!.scale.y = newCuvetteLevel;
          zoomedWaterRef.current!.position.y += 0.45 * 0.5 * 0.001;
        }

        // Lower water level inside dropper
        const newDropperLevel = dropperWaterRef.current!.scale.y - 0.0014;
        if (newDropperLevel < 0) {
          dropperWaterRef.current!.scale.y = 0;
          dropperWaterRef.current!.position.y = 6.5 - (0.5 * 0.5);
        } else {
          dropperWaterRef.current!.scale.y = newDropperLevel;
          dropperWaterRef.current!.position.y -= 0.5 * 0.5 * 0.0007;
        }
      });
    }
  }

  const stopAddingSolution = () => {
    if (addSolutionInterval.current) {
      clearInterval(addSolutionInterval.current);
    }
    if (cuvetteWaterRef.current && zoomedWaterRef.current) {
      if (cuvetteWaterRef.current.scale.y >= 0.9 && cuvetteWaterRef.current.scale.y <= 1.1) {
        alert("Sucess! You added the correct amount of solution.");
        setTaskComplete(true);
      } else if (cuvetteWaterRef.current.scale.y > 1.1) {
        alert("Try again! You need to fill 2/3rds of the cuvette with the solution. Don't overfill it!");
        resetSolution();
      }
    }
  }

  const handleAddSolution = () => {
    if (!taskComplete) {
      console.log(taskComplete);
      startAddingSolution();
    }
  }

  return (
    <group>
      <Cuvette position={[0, 4.96, 0]} />
      <GlassDropper position={[0, 6, 0]} />

      <mesh
        ref={dropperWaterRef}
        position={[0, 6.5, 0]}
        scale={[1, 1, 1]}
      >
        <cylinderGeometry args={[0.02, 0.02, 0.5, 32]} />
        <meshStandardMaterial color={solutionColor} />
      </mesh>

      <mesh
        ref={cuvetteWaterRef}
        position={[0, 5.22 - (0.45 * 0.5), 0]}
        scale={[1, 0, 1]}
      >
        <boxGeometry args={[0.14, 0.45, 0.14, 32]} />
        <meshStandardMaterial color={solutionColor} />
      </mesh>

      <Html
        position={[0, 6.5, -1.2]}
        transform
        scale={0.5}
        rotation={[0, Math.PI / 2, 0]} // Corrected rotation
      >
        <button
          onMouseDown={handleAddSolution} // Start adding solution on mouse down
          onMouseUp={stopAddingSolution} // Stop adding solution on mouse up
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
        >
          Add Solution
        </button>
      </Html>

      {/*0.3900000000*/}
      <Html position={[0, 6.0, 2.0]} transform scale={1} rotation-y={Math.PI / 2}>
        <div style={{ width: 100, height: 70, border: "1px solid black" }}>
          <Canvas>
            <PerspectiveCamera
              makeDefault
              position={ [0, 0, 9] }
              onUpdate={self => self.lookAt(0, 0, 0)}
              fov={ 15 }
            />
            <ambientLight intensity={0.5} />
            <Cuvette position={[-0.85, 0.2, 1.6]} />
            <mesh
              ref={zoomedWaterRef}
              position={[-0.85, 0.46 - (0.45 * 0.5), 1.6]}
              scale={[1, 0, 1]} // Dynamic height based on fill
            >
              <boxGeometry args={[0.14, 0.45, 0.14, 32]} />
              <meshStandardMaterial color={ solutionColor } />
            </mesh>
          </Canvas>
        </div>
      </Html>
    </group>
  )
});

export default Step5FillTheCuvette;