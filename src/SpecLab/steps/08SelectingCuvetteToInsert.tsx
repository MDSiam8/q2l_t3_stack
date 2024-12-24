import React, { forwardRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

import { Cuvette } from "../models/Cuvette";
import { Spectrophotometer } from "../models/Spectrophotometer";
import Step8UIOverlay from "../ui_overlay/Step8UIOverlay";

interface Step8Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

// ForwardRef usage is optional depending on your setup
const Step8SelectingCuvette = forwardRef<THREE.Group, Step8Props>(
  ({ nextButtonRef }, ref) => {
    return (
      <group ref={ref}>
        {/* Your 3D models */}
        <Spectrophotometer position={[0, 5.6, 0]} scale={[1, 3, 5]} />
        <Cuvette position={[-0.3, 6.2, -0.55]} />

        {/*
          Html from @react-three/drei:
            - "position" sets where in 3D space it appears.
            - "transform" means the HTML will move/rotate/scale
              with this group as if it were a 3D object.
            - "style={{ pointerEvents: 'auto' }}" allows clicks.
        */}
        <Html
          position={[0, 8, .5]}
          transform
          distanceFactor={1}
          style={{ pointerEvents: "auto" }}
          rotation={[0, Math.PI / 2, 0]}
          scale={[2, 2, 2]}  
        >
          <Step8UIOverlay />
        </Html>
      </group>
    );
  }
);

export default Step8SelectingCuvette;
