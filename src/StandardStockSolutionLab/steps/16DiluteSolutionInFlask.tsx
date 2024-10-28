import React, { useRef, useEffect, forwardRef, useState } from "react";
import { Html } from "@react-three/drei";
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
    // const [pourStartTime, setPourStartTime] = useState<number | null>(null); 
    const distilledWaterRef = useRef<THREE.Group>(null);
    const waterRef = useRef<THREE.Mesh>(null);          
    const pourInterval = useRef<NodeJS.Timeout | null>(null);  

    useEffect(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    }, [nextButtonRef]);

    // lift and tilt the distilled water towards the flask when clicked 
    const handleDistilledWaterClick = () => {
      if (distilledWaterRef.current) {
        const targetPosition = new THREE.Vector3(0, 6.4, 1.2); 
        const tl = gsap.timeline({
          onComplete: () => {
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

    // start filling the water and record the start time
    const startFillingWater = () => {
      // setPourStartTime(Date.now());
      if (waterRef.current) {
        pourInterval.current = setInterval(() => {
          setWaterLevel((prevWaterLevel) => {
            const newLevel = prevWaterLevel + 0.0125;
            if (newLevel <= 1) {
              waterRef.current!.scale.set(0.15, newLevel, 0.15); 
              waterRef.current!.position.set(0, 4.98 + newLevel, 0); // anchor the water level to bottom of flask  
              return newLevel;
            } else {
              clearInterval(pourInterval.current!);
              return prevWaterLevel;
            }
          });
        }, 100); // adjust the water level every 100ms
      }
    };

    const stopFillingWater = () => {
      if (pourInterval.current) {
        clearInterval(pourInterval.current);
      }

      // setPourStartTime(null);  // reset the pour start time
       if (waterLevel >= 0.61 && waterLevel <= 0.63) {
        console.log(waterLevel);
        alert("Success! You filled the water correctly.");
        setNextEnabled(nextButtonRef); 
      } 
      if(waterLevel > 0.63) {
        console.log(waterLevel);
        alert(`Try again! You "overfilled" the water.`);
        resetWater(); // disable the next button and reset the water 
      }
    };

    const resetWater = () => {
      setWaterLevel(0);
      if (waterRef.current) {
        waterRef.current!.scale.set(0.15, 0, 0.15); 
        waterRef.current!.position.set(0, 4.98, 0);  
      }
    };

    return (
      <group>
        <Flask position={[0, 4.95, 0]} />

        <mesh 
          ref={waterRef}
          position={[0, 5, 0]}   
          scale={[0.15, waterLevel, 0.15]}  // allow height to be dynamic based on fill 
        >
          <cylinderGeometry args={[0.8, 2.0, 2, 32]} /> 
          <meshStandardMaterial color={"lightblue"} transparent opacity={0.6} />
        </mesh>

        <group ref={distilledWaterRef} position={[0, 5.45, 1.5]} rotation-y={270 * Math.PI / 180} scale={[1, 1, 1]} onClick={handleDistilledWaterClick}>
          <DistilledWater /> 
        </group>
        <WhiteTile position={[-0.5, 5.8, 0]} transform scale={2.25} rotation-x={90 * Math.PI / 180} rotation-z={90 * Math.PI / 180}/>
        <Html position={[0, 8, 0]} transform scale={0.5} rotation-y={(90 * Math.PI) / 180}>
          <button
            onMouseDown={startFillingWater}  
            onMouseUp={stopFillingWater}     
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
