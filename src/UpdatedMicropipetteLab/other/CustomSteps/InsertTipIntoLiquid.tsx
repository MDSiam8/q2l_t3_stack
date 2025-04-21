import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BeakerWithOrangeReagnentModel } from "~/MicropipetteLab/components/BeakerWithOrangeReagnent";
import { RedP2MicropipetteModel } from "~/MicropipetteLab/components/RedP2Micropipette";
import * as THREE from "three";

const InsertTipIntoLiquid = () => {
  const pipetteRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);
  const targetPosition = new THREE.Vector3(0.025, -1.5, 0);
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
        <RedP2MicropipetteModel
          startingPosition={[0, 2, 0.55]}
          opacity={1}
          rotation={[0, Math.PI, 0]}
          scale={0.5}
        />
      </mesh>
      <BeakerWithOrangeReagnentModel
        opacity={1}
        startingPosition={[0, 0.55, 0.4]}
        scale={3}
        rotation={[0, 9.5, 0]}
      />
      {/* Additional elements specific to the custom step can be added here */}
    </group>
  );
};

export default InsertTipIntoLiquid;