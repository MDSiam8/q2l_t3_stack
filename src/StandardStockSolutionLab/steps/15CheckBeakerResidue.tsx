import React, { useRef, useEffect, forwardRef } from "react";
import { Html } from "@react-three/drei";
import { Beaker } from "../models/Beaker";
import { Flask } from "../models/Flask";
import { GlassRod } from "../models/GlassRod";
import { Group } from "three";

interface CheckBeakerResidueProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step15CheckBeakerResidue = forwardRef<Group, CheckBeakerResidueProps>(
  ({ nextButtonRef }, ref) => {
    const glassRodRef = useRef<THREE.Object3D>(null);
    const beakerRef = useRef<THREE.Object3D>(null);
    const flaskRef = useRef<THREE.Object3D>(null);

    useEffect(() => {

    }, []);

    return (
      <group ref={ref}>
        <Beaker
          ref={beakerRef}
          position={[1.8, 5, 2.5]}
          rotation-y={ 3.14 }
        />

        <Flask
          ref={flaskRef}
          position={[2, 5, -1.5]}
          rotation-y={(-Math.PI / 180) * 45}
        />

        <group rotation={[Math.PI / 36, 0, 0]} position={[0, 6, -1.5]}>
          <GlassRod
            ref={glassRodRef}
            position={[2, 0, 0]}
          />
        </group>





        {/* <Html>
          <div style={{ color: "black", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            residue
          </div>
        </Html> */}
      </group>
    );
  }
);

export default Step15CheckBeakerResidue;
