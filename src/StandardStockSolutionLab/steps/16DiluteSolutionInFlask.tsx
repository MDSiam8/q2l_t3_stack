import React, { useState, useEffect, useRef } from "react";
import { Html, OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask"; // Assuming you have a Flask component similar to Beaker
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  // Add other props as necessary
}

const ObjectsOnTable: React.FC = () => {
  return (
    <group>
      <Flask position={[0, 5, 0]} />
    </group>
  );
};

const Step16DiluteSolutionInFlask: React.FC<DiluteSolutionInFlaskProps> = ({
  nextButtonRef,
}) => {
  const [hasPoured, setHasPoured] = useState(false); // Track whether the pour action has happened
  const cameraRef = useRef<any>();

  const { camera, scene } = useThree();

  // Disable the Next button initially, enable after pouring
  useEffect(() => {
    if (nextButtonRef.current) {
      if (hasPoured) {
        setNextEnabled(nextButtonRef);
      } else {
        setNextDisabled(nextButtonRef);
      }
    }
    if (cameraRef.current) {
      // cameraRef.current.position.set(0.2929247093555727, 6.579637219923648, 2.4785378931193676);
      // cameraRef.current.rotation.set(-0.2026981473988437, -0.22400813895643168, -0.045622541076982395);
      // cameraRef.current.quaternion.set(-0.09797923174877703, -0.11346085238372462, -0.011244595719363874, 0.9886355568101859);
      cameraRef.current.lookAt(0, 5, 0);
    }
  }, [hasPoured, nextButtonRef]);

  const handlePour = () => {
    // Logic for pouring the solution
    setHasPoured(true);
    // You can add more stuff here
  };

  useFrame(() => {
    //console.log(cameraRef.current);
  });

  return (
    <>
      <group>
        <ObjectsOnTable /> {/* Adjust the position as per your scene */}

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

      {/* Canvas with zoomed in view */}
      <Html position={[3, 8, -4]} transform scale={0.8} rotation-y={Math.PI / 2}>
        <div style={{ width: 300, height: 170, border: "2px solid black" }}>
          <Canvas>
            <PerspectiveCamera
            ref={ cameraRef }
            makeDefault
            position={ [0.2929247093555727, 6.579637219923648, 2.4785378931193676] }
            rotation={ [-0.2026981473988437, -0.22400813895643168, -0.045622541076982395] }
            quaternion={ [-0.09797923174877703, -0.11346085238372462, -0.011244595719363874, 0.9886355568101859] }
            fov={ 20 }
            />
            <OrbitControls enableZoom={true} />
            <ambientLight intensity={0.5} />
            <ObjectsOnTable />
          </Canvas>
        </div>
      </Html>
    </>
    
  );
};

export default Step16DiluteSolutionInFlask;
