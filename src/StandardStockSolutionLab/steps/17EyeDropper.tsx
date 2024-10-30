import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { GlassDropper } from "../models/GlassDropper";
import { FlaskFill, FlaskHandles } from "../models/FlaskFill_Water"; 
import { GlassRod } from "../models/GlassRod";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Html } from "@react-three/drei";

const Step4OpenSideWindow = forwardRef((props, ref) => {
  const dropperGroup = useRef(new THREE.Group());
  const flaskFillRef = useRef<FlaskHandles>(null);
  const [waterLevel, setWaterLevel] = useState(0); // waterLevel is a state variable that increments with each click

  // Function to animate the dropper
  const animateGlassDropper = () => {
    return new Promise((resolve) => {
      const initialDropperPosition = new THREE.Vector3(2.5, 5, 1.5);
      const finalDropperPosition = new THREE.Vector3(0.15, 6.9, 0.1);

      // Move glass dropper up
      new TWEEN.Tween(dropperGroup.current.position)
        .to({ y: initialDropperPosition.y + 1 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      // Rotate the dropper after moving up
      setTimeout(() => {
        new TWEEN.Tween(dropperGroup.current.rotation)
          .to({ x: -(3.14 / 180) * 75 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }, 1000);

      // Move dropper to final position
      setTimeout(() => {
        new TWEEN.Tween(dropperGroup.current.position)
          .to({ x: finalDropperPosition.x, y: finalDropperPosition.y, z: finalDropperPosition.z }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(resolve)
          .start();
      }, 2000);
    });
  };

  useEffect(() => {
    const startAnimation = async () => {
      await animateGlassDropper();
    };
    
    startAnimation(); // Trigger animation

    const animate = (time : number) => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Function to add water by increasing waterLevel state
  const addWater = () => {
    setWaterLevel(prevLevel => {
      const newLevel = Math.min(prevLevel + 1, 4); // Ensure max level is 4 (full)
      
      // Null check before calling the method
      if (flaskFillRef.current) {
        flaskFillRef.current.playAnimationAtFrame(newLevel); // Display new level animation
      }
      
      return newLevel;
    });
  };
  

  return (
    <group>
      <FlaskFill
        ref={flaskFillRef}
        position={[0.15, 5, 0]} // Position for overlapping the flask
        scale={[0.5, 0.5, 0.5]} // Scale if needed
      />
      
      <GlassRod rotation-x={(3.14 / 180) * 15} position={[0.15, 6.5, 0]} />

      <group ref={dropperGroup} position={[2.5, 5, 1.5]} rotation-x={-(Math.PI / 2)}>
        <GlassDropper scale={0.5} />
      </group>

      <Html position={[1, 8.8, 0]} transform rotation-y={Math.PI / 2}>
        <button
          className="rounded-full p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 focus:outline-none focus:ring bg-gradient-to-br from-blue-300 to-blue-500 hover:scale-110"
          onClick={addWater}
        >
          Add Water
        </button>
      </Html>
    </group>
  );
});

export default Step4OpenSideWindow;
