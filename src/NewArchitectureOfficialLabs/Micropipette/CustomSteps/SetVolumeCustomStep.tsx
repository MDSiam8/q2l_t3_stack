import React, { useState } from "react";
import { BeakerModel } from "~/Models/BeakerModel";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import VolumeControlOverlay from "./CustomComponents/VolumeControlOverlay";
import { Html } from '@react-three/drei';

const SetVolumeCustomStep = () => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const overlayPosition = { x: 0, y: 0, z: 0 };

  const handleVolumeChange = (volume: number) => {
    if (volume === 100) { // 100 corresponds to 1 μL
      setShowCheckmark(true);
    } else {
      setShowCheckmark(false);
    }
  };

  return (
    <group>
      <MicropipetteP2Model
        startingPosition={[0, 2, 0]}
        opacity={0.6}
        rotation={[0, Math.PI, 0]}
        scale={5}
      />
      <group scale={0.25} rotation-y={3.14 * -90/180} position={[-.1,2.2,0]}>
        <VolumeControlOverlay
          position={{ x: 0, y: 5, z: 0 }}
          rotation={[0, Math.PI, 0]}
          onVolumeChange={handleVolumeChange} // Pass the volume change handler
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

export default SetVolumeCustomStep;
