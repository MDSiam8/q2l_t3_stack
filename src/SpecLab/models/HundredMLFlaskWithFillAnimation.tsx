import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface HundredMLFlaskWithFillAnimationProps {
  startAnimationDelay?: number;
  [key: string]: any;
}

export function HundredMLFlaskWithFillAnimation({
  startAnimationDelay = 0,
  ...props
}: HundredMLFlaskWithFillAnimationProps) {
  const { scene, animations } = useGLTF("./rb flask filling animation.glb");
  const clonedScene = scene.clone();
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
    }, startAnimationDelay * 1000);

    return () => clearTimeout(timer);
  }, [startAnimationDelay, actions]);

  return <primitive {...props} object={clonedScene} />;
}

useGLTF.preload("./rb flask filling animation.glb");
