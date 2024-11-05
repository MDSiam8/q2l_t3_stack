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

    useEffect(() => {

    }, []);

    return (
      <group ref={ref}>
        <group>
          <Beaker
            ref={beakerRef}
            position={[0, 4.95, 2.5]}
            rotation-y={3.14}
          />
          <Sphere
            position={[0.25, 4.92, 1.9]}
            scale={[0.3, 0.09, 0.3]}
          >
            <meshStandardMaterial
              color="red"
              roughness={1}
            />
          </Sphere>
        </group>

        <group>
            <Sphere
              position={[0, 4.92, -1.5]}
              scale={[0.3, 0.09, 0.3]}
            >
              <meshStandardMaterial
              color="red"
              roughness={1}
            />
            </Sphere>
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
