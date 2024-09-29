import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface BeakerWithWasteFillAnimationProps {
    startAnimationDelay?: number; // Delay in seconds
    [key: string]: any; // To allow for other props like position, scale, etc.
  }
  
  export function SeperatingFunnelVentAirAfterMixing({ startAnimationDelay = 0, ...props }: BeakerWithWasteFillAnimationProps) {
    const { scene, animations } = useGLTF("./vent air (after mixing).glb");
    const clonedScene = scene.clone(); // Clone the scene for isolated use
    const { actions } = useAnimations(animations, clonedScene);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        const animation = actions["Animation"];
        if (animation) {
          animation.reset().play();
          animation.setEffectiveTimeScale(1);
          animation.setLoop(THREE.LoopOnce, 1);
          animation.clampWhenFinished = true;
        }
      }, startAnimationDelay * 1000); // Convert seconds to milliseconds
  
      return () => clearTimeout(timer);
    }, [startAnimationDelay, actions]);
  
    return <primitive {...props} object={clonedScene} />;
  }
  
  useGLTF.preload("./vent air (after mixing).glb");
  