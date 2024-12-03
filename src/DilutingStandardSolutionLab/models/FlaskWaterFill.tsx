import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface FlaskWaterFillProps {
  isFilled?: boolean; // Whether the flask should be filled initially
  startAnimationDelay?: number; // Delay in seconds, undefined or positive to auto-start, negative to disable auto-start
  [key: string]: any; // Additional props like position, scale, etc.
}

export const FlaskWaterFill = forwardRef((props: FlaskWaterFillProps, ref) => {
  const { isFilled = false, startAnimationDelay = 0, ...otherProps } = props;
  const { scene, animations } = useGLTF("./DilutingFlasks.glb");
  const clonedScene = scene.clone(); // Clone for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    // Handle immediate fill
    if (isFilled) {
      setToEndState();
    }
    // Auto-start animation if startAnimationDelay is undefined or a non-negative number
    else if (startAnimationDelay === undefined || startAnimationDelay >= 0) {
      const delay = startAnimationDelay !== undefined ? startAnimationDelay * 1000 : 0; // Default to 0ms if undefined
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isFilled, startAnimationDelay, actions]);

  // Define startAnimation for external calls
  const startAnimation = () => {
    console.log("Attempting to start animation...");
    const animation = actions["FillFlask"];
    if (animation) {
      console.log("Playing animation...");
      animation.reset().play();
      animation.setEffectiveTimeScale(1);
      animation.setLoop(THREE.LoopOnce, 1);
      animation.clampWhenFinished = true;
    }
  };

  // Define a method to immediately set the animation to its end state
  const setToEndState = () => {
    const animation = actions["FillFlask"];
    if (animation) {
      animation.reset().play();
      animation.paused = true; // Pause the animation
      animation.enabled = true; // Enable the animation
      animation.time = animation.getClip().duration; // Set to end state
    }
  };

  // Expose startAnimation and setToEndState methods to parent components via ref
  useImperativeHandle(ref, () => ({
    startAnimation,
    setToEndState,
  }));

  return <primitive object={clonedScene} {...otherProps} scale={9} opacity={0.8} />;
});

useGLTF.preload("./DilutingFlasks.glb");