import React, { useState, useEffect, forwardRef } from "react";
import { OrganicProductBeakerWithPourAnimation } from "../models/OrganicProductBeakerWithPourAnimation";
import { GlassRod } from "../models/GlassRod";
import { DistilledWater } from "../models/DistilledWater";
import { HundredMLFlaskWithFillAnimation } from "../models/HundredMLFlaskWithFillAnimation";
import { setNextDisabled, setNextEnabled } from "../Experience"
import * as THREE from "three";

interface Step14Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step14TransferSolution = forwardRef<THREE.Group, Step14Props>(
  ({ nextButtonRef }, ref) => {
    const [startFlaskAnimation, setStartFlaskAnimation] = useState(9999);

    useEffect(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    }, [nextButtonRef]);

    const onBeakerClick = () => {
      setStartFlaskAnimation(1.95);

      setTimeout(() => {
        setNextEnabled(nextButtonRef);
      }, 5000);
    };

    return (
      <group ref={ref}>
        <OrganicProductBeakerWithPourAnimation
          position={[0, 5.1, 0.5]}
          onClick={onBeakerClick}
        />
      
      <group
        position={[0.8, 5, -1]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <GlassRod/>
      </group>
      <mesh
        position={[0.2, 5, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2, 1]} /> 
        <meshBasicMaterial
          color={0xffffff}
          transparent
          // opacity={0.01} make it transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

        <DistilledWater position={[0, 5.5, 2.5]} />

        <HundredMLFlaskWithFillAnimation
          startAnimationDelay={startFlaskAnimation}
          position={[0, 5.0, 0]}
          scale={0.8}
        />
      </group>
    );
  }
);

export default Step14TransferSolution;