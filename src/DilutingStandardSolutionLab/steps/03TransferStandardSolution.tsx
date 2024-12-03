import React, { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper";
import { Beaker } from "../models/Beaker";
import { BeakerWaterFill } from "../models/BeakerWaterFill";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { BeakerStockSolutionFill } from "../models/BeakerWithOrangeFillAnim";

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
    const beakerFillRef = useRef<any>(null);
    useEffect(() => {
      if (beakerFillRef.current) {
        beakerFillRef.current.playAnimation("Animation");
      }
    }, []);

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
        y: 5.25, 
        x: 1.0,
        z: -0.7,
        duration: 2,
        ease: "power1.inOut",
      });
    };

    // Handle flask click to move up slightly, tilt, and start water fill animation
    const handleFlaskClick = () => {
      if (flaskTilted.current || !stopperRemoved.current || !flaskRef.current) return;

      flaskTilted.current = true;

      // Starting position: 0.3, 4.94, 0

      const upPosition = new THREE.Vector3(0.3, 6, 0); // Position for upward movement
      const tiltPosition = new THREE.Vector3(0.3, 6, 0.5); // Final tilted position towards beaker

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
          duration: 1.5,
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
          duration: 1.5,
          ease: "power1.inOut",
        },
        "+=0.2" // Short delay after moving up
      );

      tl.to(
        flaskRef.current.rotation,
        {
          x: "-=" + Math.PI / 3, // Tilt flask by 45 degrees forward
          duration: 1.5,
          ease: "power1.inOut",
        },
        "<" // Start with position change for synchronous tilt
      );
    };

    return (
      <group ref={ref}>
        {/* Flask and Stopper */}
        <group ref={flaskRef} position={[0.3, 4.94, 0]} onClick={handleFlaskClick}>
          <Flask />
        </group>
        <group ref={stopperRef} position={[0.3, 6.92, 0]} rotation={[Math.PI, 0, 0]} onClick={handleStopperClick}>
          <Stopper />
        </group>

        <BeakerStockSolutionFill ref={beakerFillRef} position={[0.25, 4.9, -1.6]} />

        {/* Water in Beaker */}
        <mesh
          ref={waterRef}
          position={[0.25, 5.2, -1.6]} 
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