import React, { useRef, useEffect, forwardRef, useState } from "react";
import { Html, Sphere } from "@react-three/drei";
import { Flask } from "../models/Flask";
import { DistilledWater } from "../models/DistilledWater";
import WhiteTile from "../models/WhiteTile";
import gsap from "gsap";
import * as THREE from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step16Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step16DiluteSolutionInFlask = forwardRef<THREE.Group, Step16Props>(
  ({ nextButtonRef }, ref) => {
    const [waterLevel, setWaterLevel] = useState(0);
    const [hasPoured, setHasPoured] = useState(false);

    const distilledWaterRef = useRef<THREE.Group>(null);
    const waterRef = useRef<THREE.Mesh>(null);
    const pourInterval = useRef<NodeJS.Timeout | null>(null);

    // Disable the next button initially
    useEffect(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    }, [nextButtonRef]);

    // Enable the next button based on pouring success
    useEffect(() => {
      if (nextButtonRef.current) {
        if (hasPoured) {
          setNextEnabled(nextButtonRef);
        } else {
          setNextDisabled(nextButtonRef);
        }
      }
    }, [hasPoured, nextButtonRef]);

    // Handle distilled water animation on click
    const handleDistilledWaterClick = () => {
      if (distilledWaterRef.current) {
        const targetPosition = new THREE.Vector3(0, 6.4, 1.2);
        const tl = gsap.timeline({
          onComplete: () => {
            // Optionally, you can add actions after the animation completes
          },
        });

        tl.to(
          distilledWaterRef.current.position,
          {
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            duration: 2,
            ease: "power1.inOut",
          },
          0
        );

        tl.to(
          distilledWaterRef.current.rotation,
          {
            x: "-=" + Math.PI / 4,
            y: "-=" + Math.PI / 8,
            duration: 2,
            ease: "power1.inOut",
          },
          0
        );
      }
    };

    // Start filling the water
    const startFillingWater = () => {
      if (waterRef.current) {
        pourInterval.current = setInterval(() => {
          setWaterLevel((prevWaterLevel) => {
            const newLevel = prevWaterLevel + 0.0125;
            if (newLevel <= 1) {
              waterRef.current!.scale.set(0.15, newLevel, 0.15);
              waterRef.current!.position.set(0, 4.98 + newLevel, 0); // Anchor to bottom of flask
              return newLevel;
            } else {
              clearInterval(pourInterval.current!);
              return prevWaterLevel;
            }
          });
        }, 100); // Adjust the water level every 100ms
      }
    };

    // Stop filling the water and validate the level
    const stopFillingWater = () => {
      if (pourInterval.current) {
        clearInterval(pourInterval.current);
      }

      if (waterLevel >= 0.61 && waterLevel <= 0.63) {
        console.log(waterLevel);
        alert("Success! You filled the water correctly.");
        setHasPoured(true);
      } else if (waterLevel > 0.63) {
        console.log(waterLevel);
        alert(`Try again! You "overfilled" the water.`);
        resetWater();
      }
    };

    // Reset the water level
    const resetWater = () => {
      setWaterLevel(0);
      if (waterRef.current) {
        waterRef.current!.scale.set(0.15, 0, 0.15);
        waterRef.current!.position.set(0, 4.98, 0);
      }
      setHasPoured(false);
      if (nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    };

    // Handle the main pour action
    const handlePour = () => {
      handleDistilledWaterClick(); // Animate the distilled water
      startFillingWater(); // Start the water filling animation
    };

    return (
      <group ref={ref}>
        {/* Main Flask */}
        <Flask position={[0, 4.94, 0]} />

        {/* Water Mesh */}
        <mesh
          ref={waterRef}
          position={[0, 5, 0]}
          scale={[0.15, waterLevel, 0.15]} // Dynamic height based on fill
        >
          <cylinderGeometry args={[0.8, 2.0, 2, 32]} />
          <meshStandardMaterial color={"lightblue"} transparent opacity={0.6} />
        </mesh>

        <group>
            <Sphere
              position={[0, 5, 0]}
              scale={[0.32, 0.5, 0.32]}
            >
              <meshStandardMaterial
              color="orange"
              roughness={1}
            />
            </Sphere>
        </group>
        {/* Distilled Water */}
        <group
          ref={distilledWaterRef}
          position={[0, 5.45, 1.5]}
          rotation-y={(270 * Math.PI) / 180}
          scale={[1, 1, 1]}
          onClick={handleDistilledWaterClick}
        >
          <DistilledWater />
        </group>

        {/* White Tile */}
        <WhiteTile
          position={[-0.5, 5.8, 0]}
          transform
          scale={2.25}
          rotation-x={(90 * Math.PI) / 180}
          rotation-z={(90 * Math.PI) / 180}
        />

        {/* Pour Button */}
        <Html
          position={[0, 8, 0]}
          transform
          scale={0.5}
          rotation={[0, Math.PI / 2, 0]} // Corrected rotation
        >
          <button
            onMouseDown={handlePour} // Start pouring on mouse down
            onMouseUp={stopFillingWater} // Stop pouring on mouse up
            className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          >
            Pour Water
          </button>
        </Html>
      </group>
    );
  }
);

export default Step16DiluteSolutionInFlask;
