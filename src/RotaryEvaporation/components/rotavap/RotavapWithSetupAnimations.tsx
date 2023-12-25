import React, { useState, useEffect, useRef } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const animationFiles:string[] = [
  "./4-install bump trap.glb",
  "./5-insert keck clip (bump trap).glb",
  "./6-install rb flask.glb",
  "./7-install keck clip (rb).glb "
];

export function RotavapWithSetupAnimations(props: GroupProps) {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  
  const gltfResult = useGLTF(animationFiles[currentAnimationIndex] as string) as any;
  const { scene, animations } = gltfResult;
  const clonedScene = scene.clone();
  const { actions } = useAnimations(animations, clonedScene);
  const isAnimationFinished = useRef(false);
useEffect(() => {
  const action = actions["Animation"];
  if (action) {
    action.reset().play();
    action.setEffectiveTimeScale(0.75);
    action.setLoop(THREE.LoopOnce, 1); // Play only once
    action.clampWhenFinished = true;
    isAnimationFinished.current = false;

    const duration = action.getClip().duration / action.getEffectiveTimeScale();
    const timeoutId = setTimeout(() => {
      isAnimationFinished.current = true;
      if (currentAnimationIndex < animationFiles.length - 1) {
        setCurrentAnimationIndex(currentAnimationIndex + 1);
      }
    }, duration * 1000);

    return () => clearTimeout(timeoutId);
  }
}, [currentAnimationIndex, actions]);
  useFrame(() => {
    const action = actions["Animation"];
    if (action && !isAnimationFinished.current) {
      if (action.paused || action.time >= action.getClip().duration) {
        isAnimationFinished.current = true;
        if (currentAnimationIndex < animationFiles.length - 1) {
          setCurrentAnimationIndex(currentAnimationIndex + 1);
        }
      } 
    }
  });

  const hitboxPosition: THREE.Vector3 = new THREE.Vector3(1, 0.2, 0);
  const hitboxScale: THREE.Vector3 = new THREE.Vector3(1, 0.2, 0.4);

  return (
    <group {...props}>
      <primitive object={clonedScene} scale={0.8} opacity={0.8} />
      <Box position={hitboxPosition} scale={hitboxScale}>
        <meshStandardMaterial transparent opacity={0.0} />
      </Box>
    </group>
  );
}

// Preload all animation files
animationFiles.forEach(file => {
  if (typeof file === "string") {
    useGLTF.preload(file);
  }
});
