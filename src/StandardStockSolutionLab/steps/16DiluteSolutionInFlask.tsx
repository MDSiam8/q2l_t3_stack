import React, { useState, useEffect, useRef } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask"; // Assuming you have a Flask component similar to Beaker
import { Canvas, useThree } from "@react-three/fiber";

interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  // Add other props as necessary
}

const ZoomedCanvas: React.FC = () => {
  const { camera, gl } = useThree(); // Just in case i need to access the three.js objects of the zoomed canvas
  const flaskRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={flaskRef} position={[-3, 1, 1]}>
      <Flask />
    </mesh>
  );
};

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
    <>
      <group>
        <Flask position={[0, 5, 0]} /> {/* Adjust the position as per your scene */}

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
      <Html position={[3, 10, 0]} transform scale={0.8} rotation-y={Math.PI / 2}>
        <div style={{ width: 300, height: 300, border: "2px solid black" }}>
          <Canvas>
            {/*<OrbitControls enableZoom={false} />*/}
            <ambientLight intensity={0.5} />
            <ZoomedCanvas />
          </Canvas>
        </div>
      </Html>
    </>
    
  );
};

export default Step16DiluteSolutionInFlask;
