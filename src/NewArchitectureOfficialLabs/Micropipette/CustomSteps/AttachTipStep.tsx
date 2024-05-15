import React, { useState } from "react";
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MicropipetteTipBoxP2Model } from "~/Models/MicropipetteTipBoxP2";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";

const AttachTipStep: React.FC = () => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [micropipettePosition, setMicropipettePosition] = useState(new THREE.Vector3(0, 2, 0));

  const handleMicropipetteClick = () => {
    // Move the micropipette model down and back to its original position
    setMicropipettePosition(new THREE.Vector3(0, 1.5, 0)); // Move down

    setTimeout(() => {
      setMicropipettePosition(new THREE.Vector3(0, 2, 0)); // Move back to original position
      setShowCheckmark(true); // Show checkmark
      setTimeout(() => setShowCheckmark(false), 2000); // Hide checkmark after 2 seconds
    }, 500); // Delay to simulate movement
  };

  return (
    <group>
      <MicropipetteTipBoxP2Model
        startingPosition={[0, 0, 0]}
        opacity={0.6}
        rotation={[0, 0, 0]}
        scale={5}
      />
      <group
        position={micropipettePosition}
        onClick={handleMicropipetteClick}
      >
        <MicropipetteP2Model
          startingPosition={[0, 0.5, 0]} // Relative to the group's position
          opacity={0.6}
          rotation={[0, Math.PI, 0]}
          scale={5}
        />
      </group>
      {showCheckmark && (
        <Html position={[0, 0, -5]} transform style={{ zIndex: 1000 }} rotation-x={Math.PI / 2 + Math.PI} rotation-y={Math.PI / 2} rotation-z={Math.PI / 2}>
          <div style={{ position: 'fixed', bottom: '50px', right: '50px', color: 'green', fontSize: '100px', userSelect: 'none' }}>
            ✔
          </div>
        </Html>
      )}
    </group>
  );
};

export default AttachTipStep;
