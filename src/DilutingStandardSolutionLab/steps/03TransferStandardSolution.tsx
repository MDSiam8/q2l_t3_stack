import React, { useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import { Group, Vector3 } from "three";
import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper";
import { BeakerStockSolutionFill } from "../models/BeakerWithOrangeFillAnim";
import { StepComponentProps } from "../Experience";

const Step03TransferStandardSolution = forwardRef<Group, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    const flaskRef = useRef<THREE.Group>(null);
    const stopperRef = useRef<THREE.Group>(null);
    const waterRef = useRef<THREE.Mesh>(null);
    const stopperRemoved = useRef(false);
    const flaskTilted = useRef(false);
    const beakerFillRef = useRef<any>(null);

    useEffect(() => {
      setNextDisabled(true);
    }, []);

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
      if (flaskTilted.current || !stopperRemoved.current || !flaskRef.current)
        return;

      flaskTilted.current = true;

      const upPosition = new Vector3(0, 6, 1.5); // Position for upward movement
      const tiltPosition = new Vector3(0, 6, -0.1); // Final tilted position towards beaker

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

          // Start beaker fill animation after flask tilt
          if (beakerFillRef.current) {
            beakerFillRef.current.playAnimation("Animation");
          }

          if (stopperRemoved.current && flaskTilted.current) {
            setNextDisabled(false); // Enable the next button after animation
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
          duration: 1,
          ease: "power1.inOut",
        },
        1
      );

      tl.to(
        flaskRef.current.rotation,
        {
          x: "-=" + Math.PI / 4, // Tilt flask by 45 degrees forward
          duration: 2,
          ease: "power1.inOut",
        },
        "<" // Start with position change for synchronous tilt
      );
    };

    return (
      <group ref={ref}>
        {/* Flask and Stopper */}
        <group
          ref={flaskRef}
          position={[0, 4.94, 1.5]}
          onClick={handleFlaskClick}
        >
          <Flask />
        </group>
        <group
          ref={stopperRef}
          position={[0, 6.9, 1.5]}
          onClick={handleStopperClick}
          rotation-z={3.14}
        >
          <Stopper />
        </group>

        {/* Replaced the Beaker with BeakerStockSolutionFill */}
        <BeakerStockSolutionFill
          ref={beakerFillRef}
          position={[0.25, 4.94, -1.6]}
        />

      </group>
    );
  }
);

export default Step03TransferStandardSolution;
