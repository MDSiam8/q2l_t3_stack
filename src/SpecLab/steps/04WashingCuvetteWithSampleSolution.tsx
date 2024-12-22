import React, { forwardRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Cuvette } from "../models/Cuvette";
import { GlassDropper } from "../models/GlassDropper";
import * as THREE from "three";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step4Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

let solutionColor = new THREE.Color( 0x1777e7 );


const Step4WashCuvette = forwardRef<THREE.Group, Step4Props>(({nextButtonRef}, ref) => {

  const [cuvetteWaterLevel, setCuvetteWaterLevel] = useState(0);
  const [dropperWaterLevel, setDropperWaterLevel] = useState(1);

  const [animationComplete, setAnimationStatus] = useState(false);

  const cuvetteWaterRef = useRef<THREE.Mesh>(null);
  const dropperWaterRef = useRef<THREE.Mesh>(null);
  const cuvetteRef = useRef<THREE.Group>(null);
  const cuvetteAndWaterRef = useRef<THREE.Group>(null);

  const transferInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Disable the next button initially
  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  const transferSolution = () => {

    if (!dropperWaterRef.current || !cuvetteWaterRef.current || !cuvetteRef.current || !cuvetteAndWaterRef.current) {
      return;
    }

    const masterTl = gsap.timeline({
      onComplete: () => {
        console.log("All animations completed.");
      },
    });

    const transferWaterInterval = 1;
    const moveCuvetteInterval = 1;
    const moveCuvetteInterval2 = 1;
    const rotateCuvetteInterval = 1;
    const pourSolutionInterval = 1;
    const rotateCuvetteInterval2 = 1;
    const moveCuvetteInterval3 = 1;
    const moveCuvetteInterval4 = 1;

    const stirRadius = 0.2;
    const stirDuration = 2;
    const centerX = cuvetteAndWaterRef.current.position.x;
    const centerZ = cuvetteAndWaterRef.current.position.z;

    let theta = 0;

    masterTl
      .to(
        dropperWaterRef.current.scale,
        {
          x: 1,
          y: 0,
          z: 1,
          duration: transferWaterInterval
        },
        "start"
      )
      .to(
        dropperWaterRef.current.position,
        {
          x: 0,
          y: 6.25,
          z: 0,
          duration: transferWaterInterval
        },
        "start"
      )
      .to(
        cuvetteWaterRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: transferWaterInterval
        },
        "start"
      )
      .to(
        cuvetteWaterRef.current.position,
        {
          x: 0,
          y: cuvetteWaterRef.current.position.y + 0.35,
          z: 0,
          duration: transferWaterInterval
        },
        "start"
      )
      .to(
        {},
        {
          duration: stirDuration,
          onUpdate: () => {
            theta += (4 * Math.PI) / (stirDuration * 60); // Assuming 60 FPS
            if (theta > 4 * Math.PI) theta -= 4 * Math.PI;
  
            const newX = centerX + stirRadius * Math.cos(theta);
            const newZ = centerZ + stirRadius * Math.sin(theta);
  
            if (cuvetteAndWaterRef.current) {
              cuvetteAndWaterRef.current.position.x = newX;
              cuvetteAndWaterRef.current.position.z = newZ;
            }
          },
        },
        "shakeCuvette"
      )
      .to(
        cuvetteAndWaterRef.current.position,
        {
          z: cuvetteAndWaterRef.current.position.z + 7,
          duration: moveCuvetteInterval
        },
        "moveCuvette"
      )
      .to(
        cuvetteAndWaterRef.current.position,
        {
          y: cuvetteAndWaterRef.current.position.y + 1,
          duration: moveCuvetteInterval2
        },
        "moveCuvette2"
      )
      .to(
        cuvetteAndWaterRef.current.rotation,
        {
          x: cuvetteAndWaterRef.current.rotation.x + Math.PI / 2,
          duration: rotateCuvetteInterval
        },
        "tiltCuvette"
      )
      .to(
        cuvetteWaterRef.current.scale,
        {
          x: cuvetteWaterRef.current.scale.x,
          y: cuvetteWaterRef.current.scale.y,
          z: 0,
          duration: pourSolutionInterval
        },
        "pourSolutiuon"
      )
      .to(
        cuvetteAndWaterRef.current.rotation,
        {
          x: 0,
          duration: rotateCuvetteInterval2
        },
        "tiltCuvette2"
      )
      .to(
        cuvetteAndWaterRef.current.position,
        {
          y: 4.96,
          duration: moveCuvetteInterval3
        },
        "moveCuvette3"
      )
      .to(
        cuvetteAndWaterRef.current.position,
        {
          z: 0,
          duration: moveCuvetteInterval4
        },
        "moveCuvette4"
      )

      setAnimationStatus(true);
      setNextEnabled(nextButtonRef);
  }

  const handleAnimation = () => {
    if (!animationComplete) {
      transferSolution();
    }
    
  };
  
  return(
    <group>
      <GlassDropper position={[0, 6, 0]} />

      <group
        ref={cuvetteAndWaterRef}
        position={[0, 4.96, 0]}
      >
        <group
          ref={cuvetteRef}
          position={[0, 0, 0]}
        >
          <Cuvette />
        </group>
        <mesh
          ref={cuvetteWaterRef}
          position={[0, 0.35 - (0.7 * 0.5), 0]}
          scale={[1, cuvetteWaterLevel, 1]}
        >
          <boxGeometry args={[0.12, 0.7, 0.12, 32]} />
          <meshStandardMaterial color={solutionColor} />
        </mesh>
      </group>
      

      <mesh
        ref={dropperWaterRef}
        position={[0, 6.5, 0]}
        scale={[1, dropperWaterLevel, 1]}
      >
        <cylinderGeometry args={[0.02, 0.02, 0.5, 32]} />
        <meshStandardMaterial color={solutionColor} />
      </mesh>

      <mesh
        position={[0, 4, 8.3]}
      >
        <boxGeometry args={[4, 1.8, 4.5, 32]} />
        <meshStandardMaterial color='grey' />
      </mesh>

      <Html
        position={[0, 7, -1.5]}
        transform
        scale={0.5}
        rotation={[0, Math.PI / 2, 0]} // Corrected rotation
      >
        <button
          onMouseDown={handleAnimation} // Start pouring on mouse down
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
        >
          Wash Cuvette
        </button>
      </Html>

    </group>
  );
});

export default Step4WashCuvette;