import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RedP2TipBoxModel } from "~/MicropipetteLab/components/RedP2TipBox";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import * as THREE from "three";

const PushPipetteIntoTipBox = () => {
  const pipetteRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);
  const targetPosition = new THREE.Vector3(0.025, -1.8, 0.155);
  const speed = 0.02;

  useFrame(() => {
    if (clicked && pipetteRef.current) {
      const position = pipetteRef.current.position;
      position.lerp(targetPosition, speed);
    }
  });

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <group>
      <mesh ref={pipetteRef} onClick={handleClick}>
        <MicropipetteP2Model
          startingPosition={[-0.05, 4, 0.38]}
          opacity={1}
          rotation={[0, 0, 0]}
          scale={5}
        />
      </mesh>
      <RedP2TipBoxModel
        opacity={1}
        startingPosition={[-0.5, 0.5, 1.2]}
        scale={3.6}
        rotation={[0, 0, 0]}
      />
      {/* Additional elements specific to the custom step can be added here */}
    </group>
  );
};

export default PushPipetteIntoTipBox;