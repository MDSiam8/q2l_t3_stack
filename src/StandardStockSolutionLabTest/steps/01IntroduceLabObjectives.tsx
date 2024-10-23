import React, { useRef, useEffect, useState } from "react";
import { GlassDropper } from "../models/GlassDropper";
import { Flask } from "../models/Flask";
import { GlassRod } from "../models/GlassRod";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Html } from "@react-three/drei";

const Step4OpenSideWindow = () => {
  const dropperGroup = useRef(new THREE.Group()); // Reference for the glass dropper group
  const [waterLevel, setWaterLevel] = useState(0); // State for water level
  const MAX_WATER_LEVEL = 100; // Maximum water level

  // Function to animate the dropper
  const animateGlassDropper = () => {
    return new Promise((resolve) => {
      const initialDropperPosition = new THREE.Vector3(2.5, 5, 1.5); // Start position of the dropper
      const finalDropperPosition = new THREE.Vector3(0.15, 6.9, 0.1); // Final position above the flask

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

  useEffect(() => {
    // Start the animation when the component mounts
    const startAnimation = async () => {
      await animateGlassDropper();
    };

    startAnimation(); // Trigger the animation

    // Animation loop
    const animate = (time) => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Function to add water
  const addWater = () => {
    if (waterLevel < MAX_WATER_LEVEL) {
      setWaterLevel(waterLevel + 10); // Increase water level by 10
    }
  };

  // Function to remove water
  const removeWater = () => {
    if (waterLevel > 0) {
      setWaterLevel(waterLevel - 10); // Decrease water level by 10
    }
  };

  return (
    <group>
      <Flask position={[0.15, 5, 0]} waterLevel={waterLevel} /> {/* Pass the water level to the Flask component */}

      <GlassRod rotation-x={(3.14 / 180) * 15} position={[0.15, 6.5, 0]} />

      <group ref={dropperGroup} position={[2.5, 5, 1.5]} rotation-x={-(Math.PI / 2)}> {/* Initially lying horizontally */}
        <GlassDropper scale={0.5} />
      </group>

      <Html position={[1, 8, 0]} transform rotation-y={Math.PI / 2}>
        <button
          className="rounded-full p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 focus:outline-none focus:ring bg-gradient-to-br from-blue-300 to-blue-500 hover:scale-110"
          onClick={addWater}
        >
          Add Water
        </button>
        <button
          className="ml-4 rounded-full p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 focus:outline-none focus:ring bg-gradient-to-br from-red-300 to-red-500 hover:scale-110"
          onClick={removeWater}
        >
          Remove Water
        </button>
      </Html>
    </group>
  );
};

export default Step4OpenSideWindow;
