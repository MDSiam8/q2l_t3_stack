import React, { useEffect, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { StepComponentProps } from "../Experience";

interface FinishedStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const FinishedStepComponent = forwardRef<THREE.Group, StepComponentProps>(({ setNextDisabled }) => {
  const textRef = useRef<THREE.Mesh>(null);
  const yOffset: number = 7;

  // Update position on each frame for drifting effect
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const y = yOffset + Math.sin(t) * 0.5; // Drifting up and down around yOffset units
    if (textRef.current) {
      textRef.current.position.y = y;
    }
  });


  useEffect(() => {
    setNextDisabled(false);
  }, []);

  return (
    <group>
      <Text
        ref={textRef}
        position={[0, yOffset, 0]} // Initial position
        rotation={[0, Math.PI / 2, 0]} // Rotated 90 degrees on Y axis
        fontSize={1.5}
        color="#7e38b7" // Cute purple color
        font="/Righteous-Regular.ttf" // Path to your 3D font file
      >
        Lab Completed!
      </Text>
    </group>
  );
});

export default FinishedStepComponent;
