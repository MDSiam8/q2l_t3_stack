import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

export function CollectionFlaskWithWastePourAnimation({
  startAnimation,
  position,
  scale,
  rotationY,
  ...props
} : {startAnimation : boolean, position : number[], scale: number, rotationY: number}) {
  const { scene, animations } = useGLTF(
    "./collection flask pouring animation.glb",
  );
  const clonedScene = scene.clone(); // Clone the scene for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  React.useEffect(() => {
    if (startAnimation && actions["Animation"]) {
      const animation = actions["Animation"];

      animation.reset().play();
      animation.setEffectiveTimeScale(1);
      animation.setLoop(THREE.LoopOnce, 1);
      animation.clampWhenFinished = true;
    }
  }, [startAnimation, actions]);

  return <primitive {...props} rotation-y={rotationY} object={clonedScene} />;
}

useGLTF.preload("./collection flask pouring animation.glb");
