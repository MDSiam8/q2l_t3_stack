import React, { useRef, useEffect } from "react";
import { Mesh } from "three";

const SecondStepComponent = ({ onReplayAnimation }) => {
  const meshRef = useRef<Mesh>();

  // Example of using Three.js within a step
  useEffect(() => {
    // You can interact with the mesh or other elements here
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI / 4; // Rotate differently compared to first step
    }
  }, []);

  // Function to handle any specific animations or actions for the second step
  const handleSecondStepSpecificAction = () => {
    // Specific logic or animations for the second step
    // This could be interacting with the mesh or triggering an animation
  };

  // Replay animation specific to this step, triggered from Experience.tsx
  useEffect(() => {
    if (onReplayAnimation) {
      onReplayAnimation(handleSecondStepSpecificAction);
    }
  }, [onReplayAnimation]);

  return (
    <group>
      {/* Example of a 3D object specific to the second step */}
      <mesh ref={meshRef} position={[1, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Additional elements specific to the second step can be added here */}
    </group>
  );
};

export default SecondStepComponent;
