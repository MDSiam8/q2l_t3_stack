import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  import { BeakerModel } from "~/Models/BeakerModel";
  import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import VolumeControlOverlay from "./CustomComponents/VolumeControlOverlay";
  
  const SetVolumeCustomStep = () => {
    const overlayPosition = { x: 0, y: 0, z: 0 };

    return (
      <group>
        <MicropipetteP2Model
          startingPosition={[0, 2, 0]}
          opacity={0.6}
          rotation={[0, 0, 0]}
          scale={5}
        />
        <group scale={0.5} rotation-y={1.55} position={[-.1,2.2,-2]}>
            <VolumeControlOverlay position={overlayPosition}/>
        </group>

        {/* Additional elements specific to the custom step can be added here */}
      </group>
    );
  };
  export default SetVolumeCustomStep;
  