import React, { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper";
import { Beaker } from "../models/Beaker";
import { BeakerWaterFill } from "../models/BeakerWaterFill";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step03Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step03TransferStandardSolution = forwardRef<THREE.Group, Step03Props>(
  ({ nextButtonRef }, ref) => {
    const flaskRef = useRef<THREE.Group>(null);
    const stopperRef = useRef<THREE.Group>(null);
    const waterRef = useRef<THREE.Mesh>(null); 
    const stopperRemoved = useRef(false);
    const flaskTilted = useRef(false);

    useEffect(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    }, [nextButtonRef]);

    // Handle stopper click to remove it
    const handleStopperClick = () => {
      if (stopperRemoved.current || !stopperRef.current) return;

      stopperRemoved.current = true;
      gsap.to(stopperRef.current.position, {
        y: 8.0, // Move stopper higher up for visibility
        x: -0.5, // Slightly shift stopper to the left
        duration: 1,
        ease: "power1.inOut",
      });
    };

    // Handle flask click to move up slightly, tilt, and start water fill animation
    const handleFlaskClick = () => {
      if (flaskTilted.current || !stopperRemoved.current || !flaskRef.current) return;

      flaskTilted.current = true;

      const upPosition = new THREE.Vector3(0, 6, 1.5); // Position for upward movement
      const tiltPosition = new THREE.Vector3(0, 6, 1.2); // Final tilted position towards beaker

      const tl = gsap.timeline({
        onComplete: () => {
          // Start water fill animation after flask tilt
          if (waterRef.current) {
            gsap.to(waterRef.current.scale, {
              y: 0.5, // Fill the water to 1/2 height 
              duration: 2,
              ease: "power1.inOut",
            });
          }

          if (nextButtonRef && nextButtonRef.current) {
            setNextEnabled(nextButtonRef); // Enable the next button after animation
          }
        },
      });

      // Move flask up slightly before tilting
      tl.to(
        flaskRef.current.position,
        {
          x: upPosition.x,
          y: upPosition.y,
          z: upPosition.z,
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );

      // Move flask to tilt position with rotation
      tl.to(
        flaskRef.current.position,
        {
          x: tiltPosition.x,
          y: tiltPosition.y,
          z: tiltPosition.z,
          duration: 2,
          ease: "power1.inOut",
        },
        "+=0.2" // Short delay after moving up
      );

      tl.to(
        flaskRef.current.rotation,
        {
          x: "-=" + Math.PI / 4, // Tilt flask by 45 degrees forward
          z: "+=" + Math.PI / 8, // Slight rotation on z-axis to align toward the beaker
          duration: 2,
          ease: "power1.inOut",
        },
        "<" // Start with position change for synchronous tilt
      );
    };

    return (
      <group ref={ref}>
        {/* Flask and Stopper */}
        <group ref={flaskRef} position={[0, 4.94, 1.5]} onClick={handleFlaskClick}>
          <Flask />
        </group>
        <group ref={stopperRef} position={[0, 6.6, 1.5]} onClick={handleStopperClick}>
          <Stopper />
        </group>

        {/* Beaker */}
        <Beaker position={[0.25, 4.94, -1.6]} />

        {/* Water in Beaker */}
        <mesh
          ref={waterRef}
          position={[0, 5, -1]} 
          scale={[0.15, 0.0, 0.15]}
        >
          <cylinderGeometry args={[2, 2, 2, 10]} />
          <meshStandardMaterial color={"lightblue"} transparent opacity={0.6} />
        </mesh>
      </group>
    );
  }
);

export default Step03TransferStandardSolution;