import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface HundredMLFlaskWithFillAnimationProps {
  startAnimationDelay?: number; // Delay in seconds, undefined or positive to auto-start, negative to disable auto-start
  [key: string]: any; // Additional props like position, scale, etc.
}

export const BeakerFillWithWaterAnimation = forwardRef((props: HundredMLFlaskWithFillAnimationProps, ref) => {
  const { scene, animations } = useGLTF("./beaker filling with water.glb");
  const clonedScene = scene.clone(); // Clone for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    // Auto-start animation if startAnimationDelay is undefined or a non-negative number
    if (props.startAnimationDelay === undefined || props.startAnimationDelay >= 0) {
      const delay = props.startAnimationDelay !== undefined ? props.startAnimationDelay * 1000 : 0; // Default to 0ms if undefined
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);
      return () => clearTimeout(timer);
    }
    // No cleanup action needed if startAnimationDelay is negative
  }, [props.startAnimationDelay, actions]);

  // Define startAnimation for external calls
  const startAnimation = () => {
    console.log("Attempting to start animation...");
    const animation = actions["Animation"];
    if (animation) {
      console.log("Playing animation...");
      animation.reset().play();
      animation.setEffectiveTimeScale(1);
      animation.setLoop(THREE.LoopOnce, 1);
      animation.clampWhenFinished = true;
    }
  };

  // Expose startAnimation method to parent components via ref
  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return <primitive object={clonedScene} {...props} scale={9} opacity={0.8} />;
});

useGLTF.preload("./beaker filling with water.glb");
