import React, { useRef, useEffect, forwardRef } from "react";
import { Sphere } from "@react-three/drei";
import { Beaker } from "../models/Beaker";
import { Flask } from "../models/Flask";
import { GlassRod } from "../models/GlassRod";
import { Group, Mesh } from "three";

interface CheckBeakerResidueProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step15CheckBeakerResidue = forwardRef<Group, CheckBeakerResidueProps>(
  ({ nextButtonRef }, ref) => {
    const glassRodRef = useRef<THREE.Object3D>(null);
    const beakerRef = useRef<THREE.Object3D>(null);
    const flaskRef = useRef<THREE.Object3D>(null);
    const groupSphereRef = useRef<Group>(null);

    useEffect(() => {

    }, []);

    return (
      <group ref={ref}>
        <group>
          <Beaker
            ref={beakerRef}
            position={[0, 4.95, 2.5]}
            rotation-y={ 3.14 }
          />
          <group ref={groupSphereRef}>
            <Sphere position={[0, 4.8, -1.5]} scale={.3} />
            {/* <Sphere position={[0.1, 5.2, -1.5]} scale={0.03} />
            <Sphere position={[-0.12, 5.3, -1.7]} scale={0.03} />
            <Sphere position={[0.17, 5.1, -1.6]} scale={0.03} />
            <Sphere position={[0.1, 5.1, -1.5]} scale={0.03} />
            <Sphere position={[-0.15, 5.2, -1.7]} scale={0.03} />
            <Sphere position={[0, 5.1, -1.6]} scale={0.03} /> */}
          </group>
        </group>
        

        <Flask
          ref={flaskRef}
          position={[0, 4.95, -1.5]}
          rotation-y={(-Math.PI / 180) * 45}
        />

        <group rotation={[Math.PI / 36, 0, 0]} position={[0, 6, -1.5]}>
          <GlassRod
            ref={glassRodRef}
            position={[0, 0, 0]}
          />
        </group>
      </group>
    );
  }
);

export default Step15CheckBeakerResidue;
