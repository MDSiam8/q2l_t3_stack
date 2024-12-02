import React, { forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export const FillToLine = forwardRef((props: any, ref) => {
  const { scene, animations } = useGLTF("./FillToLine.glb");
  const { actions } = useAnimations(animations, scene);

  // Allow parent to trigger animation playback
  useImperativeHandle(ref, () => ({
    play: () => {
      const animation = actions["FillWater"];
      if (animation) {
        animation.reset().play();
        animation.setEffectiveTimeScale(1);
        animation.setLoop(THREE.LoopOnce, 1);
        animation.clampWhenFinished = true;
      } else {
        console.warn("Animation 'FillWater' not found in FillToLine.glb");
      }
    },
  }));

  return (
    <primitive
      {...props}
      object={scene}
    />
  );
});

// Preload the GLTF file
useGLTF.preload("./FillToLine.glb");
