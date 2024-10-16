import React, { useRef, useEffect } from "react";
import { GlassDropper } from "../models/GlassDropper";
import { Flask } from "../models/Flask";
import { GlassRod } from "../models/GlassRod";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const Step4OpenSideWindow = () => {
  const dropperGroup = useRef(new THREE.Group()); // Reference for the glass dropper group

  useEffect(() => {
    const initialDropperPosition = new THREE.Vector3(2.5, 5, 1.5); // Start at the far right of the table
    const finalDropperPosition = new THREE.Vector3(0.15, 6.9, 0.1); // Final position above the flask

    // Function to animate the dropper
    const animateGlassDropper = () => {
      return new Promise((resolve) => {
        // Move glass dropper up by 1 unit
        new TWEEN.Tween(dropperGroup.current.position)
          .to({ y: initialDropperPosition.y + 1 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        // After moving up, rotate the dropper by -75 degrees on the X-axis
        setTimeout(() => {
          new TWEEN.Tween(dropperGroup.current.rotation)
            .to({ x: -(3.14 / 180) * 75 }, 1000) // Rotate to -75 degrees
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }, 1000);

        // Move dropper left and then down to its final position
        setTimeout(() => {
          new TWEEN.Tween(dropperGroup.current.position)
            .to({ x: finalDropperPosition.x, y: finalDropperPosition.y, z: finalDropperPosition.z }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(resolve) // Resolve the promise when done
            .start();
        }, 2000); // Start after 2 seconds (allow for the upward movement and rotation)
      });
    };

    // Start the animation when the component mounts
    const startAnimation = async () => {
      await animateGlassDropper();
    };

    startAnimation(); // Trigger the animation

    // Animation loop
    const animate = (time : number) => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <group>
      <Flask position={[0.15, 5, 0]} />

      <GlassRod rotation-x={(3.14 / 180) * 15} position={[0.15, 6.5, 0]} />

      <group ref={dropperGroup} position={[2.5, 5, 1.5]} rotation-x={-(Math.PI / 2)}> {/* Initially lying horizontally */}
        <GlassDropper scale={0.5} />
      </group>
    </group>
  );
};

export default Step4OpenSideWindow;
