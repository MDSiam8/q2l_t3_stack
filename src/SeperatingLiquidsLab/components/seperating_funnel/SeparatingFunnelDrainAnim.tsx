import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface BeakerWithWasteFillAnimationProps {
  startAnimationDelay?: number; // Delay in seconds, undefined or positive to auto-start, negative to disable auto-start
  [key: string]: any; // Additional props like position, scale, etc.
}

const SFunnelWithDrainAnimation = forwardRef((props: BeakerWithWasteFillAnimationProps, ref) => {
  const { scene, animations } = useGLTF("./separating funnel draining water.glb");
  const clonedScene = scene.clone(); // Clone the scene for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    // Auto-start animation if startAnimationDelay is undefined or a non-negative number
    if (props.startAnimationDelay === undefined || props.startAnimationDelay >= 0) {
      const delay = props.startAnimationDelay !== undefined ? props.startAnimationDelay * 1000 : 0; // Default to 0ms if undefined
      const timer = setTimeout(() => {
        playAnimation();
      }, delay);
      return () => clearTimeout(timer);
    }
    // No cleanup action needed if startAnimationDelay is negative
  }, [props.startAnimationDelay, actions]);

  // Define playAnimation for external calls
  const playAnimation = () => {
    const animation = actions["Animation"];
    if (animation) {
      animation.reset().play();
      animation.setEffectiveTimeScale(1);
      animation.setLoop(THREE.LoopOnce, 1);
      animation.clampWhenFinished = true;
    }
  };

  // Expose playAnimation method to parent components via ref
  useImperativeHandle(ref, () => ({
    playAnimation,
  }));

  return <primitive object={clonedScene} {...props} />;
});

useGLTF.preload("./separating funnel draining water.glb");

export default SFunnelWithDrainAnimation;
