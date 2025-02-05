import React, { forwardRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Cuvette } from "../models/Cuvette";
import { GlassDropper } from "../models/GlassDropper";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step3Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

// Color of the solution for easy changing later
let waterColor = new THREE.Color( 0x1777e7 );

const Step3WashCuvetteWithWater = forwardRef<THREE.Group, Step3Props>(({nextButtonRef}, ref) => {

  // useState to track status of the animation
  const [animationComplete, setAnimationStatus] = useState(false);

  // References for the meshes of the water and cuvette.
  const cuvetteWaterRef = useRef<THREE.Mesh>(null);
  const dropperWaterRef = useRef<THREE.Mesh>(null);
  const cuvetteRef = useRef<THREE.Group>(null);
  const cuvetteAndWaterRef = useRef<THREE.Group>(null); // This reference encompases two meshes to make them easier to move together.
  
  // Disable the next button initially
  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  // Run the animation to wash the cuvette
  const transferSolution = () => {

    // Check if the ref components are not null
    if (!dropperWaterRef.current || !cuvetteWaterRef.current || !cuvetteRef.current || !cuvetteAndWaterRef.current) {
      return;
    }

    // Creating the gsap timeline
    const masterTl = gsap.timeline({
      onComplete: () => {
        console.log("All animations completed.");
      },
    });

    // Time interval for each portion of the animation for easy changing
    const transferWaterInterval = 1;
    const moveCuvetteInterval = 1;
    const moveCuvetteInterval2 = 1;
    const rotateCuvetteInterval = 1;
    const pourSolutionInterval = 1;
    const rotateCuvetteInterval2 = 1;
    const moveCuvetteInterval3 = 1;
    const moveCuvetteInterval4 = 1;

    // Parameters for the shaking animation
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

      // Set animationComplete to true so that animation will not run again and enable next button
      setAnimationStatus(true);
      setNextEnabled(nextButtonRef);
  }

  // Function that runs when Wash Cuvette button is clicked
  const handleAnimation = () => {
    if (!animationComplete) {
      transferSolution();
    }
    
  };
  
  return(
    <group>
      {/* Model for the glass dropper */}
      <GlassDropper position={[0, 6, 0]} />

      {/* Group contatining the model for the cuvette as well as the cuvette solution mesh */}
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
          scale={[1, 0, 1]}
        >
          <boxGeometry args={[0.12, 0.7, 0.12, 32]} />
          <meshStandardMaterial color={waterColor} />
        </mesh>
      </group>
      
      {/* Mesh for solution in the dropper */}
      <mesh
        ref={dropperWaterRef}
        position={[0, 6.5, 0]}
        scale={[1, 1, 1]}
      >
        <cylinderGeometry args={[0.02, 0.02, 0.5, 32]} />
        <meshStandardMaterial color={waterColor} />
      </mesh>
      
      {/* Mesh for the grey box representing the sink */}
      <mesh
        position={[0, 4, 8.3]}
      >
        <boxGeometry args={[4, 1.8, 4.5, 32]} />
        <meshStandardMaterial color='grey' />
      </mesh>

      {/* Button to trigger the animation to wash the cuvette */}
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

export default Step3WashCuvetteWithWater;