import React, { useState, useEffect } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import { GroupProps, Vector3 } from "@react-three/fiber";
import * as THREE from "three";
import Arrow from "../Arrow";

export function RotavapTurnOff(props: GroupProps) {
  const gltf1 = useGLTF("./13-turn off rotation.glb");
  const gltf2 = useGLTF("./14-turn off heat bath.glb");
  const [currentModel, setCurrentModel] = useState(gltf1);
  const [animationState, setAnimationState] = useState(0); // 0: first animation, 1: second animation

  const { scene, animations } = currentModel;
  const clonedScene = scene.clone(); // Clone the scene for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  // Function to play the first animation
  const playFirstAnimation = () => {
    const action = actions["Animation"];
    if (action) {
      action.reset().play();
      action.setEffectiveTimeScale(0.75);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;

      setTimeout(() => {
        setAnimationState(1); // Enable second animation
      }, 3000); // Adjust duration as needed
    }
  };

  // Function to play the second animation
  const playSecondAnimation = () => {
    setCurrentModel(gltf2);
    const action = actions["Animation"];
    if (action) {
      action.reset().play();
      action.clampWhenFinished = true;
      action.setLoop(THREE.LoopOnce, 1);

    //   action.setLoop(THREE.LoopRepeat, Infinity);
    }
  };

  const hitboxPosition1 : Vector3 = [-.75, 6.35, 2.85];
  const hitboxPosition2 : Vector3 = [1.8, .85, -0.5];
  const hitboxScale : Vector3 = [.5, .5, .5];

  return (
    <group {...props}>
      <primitive object={clonedScene} scale={0.8} opacity={0.8} />
      {animationState === 0 && <Arrow pointingDirection="left" position={[-.7, 6.3, 1]} />}
      {animationState === 1 && <Arrow pointingDirection="left" position={[1.6, .9, -2]} />}
      {animationState === 0 && (
        <Box position={hitboxPosition1} scale={hitboxScale} onClick={playFirstAnimation}>
          <meshStandardMaterial transparent opacity={0.00} />
        </Box>
      )}
      {animationState === 1 && (
        <Box position={hitboxPosition2} scale={hitboxScale} onClick={playSecondAnimation}>
          <meshStandardMaterial transparent opacity={0.0} />
        </Box>
      )}
    </group>
  );
}

useGLTF.preload("./13-turn off rotation.glb");
useGLTF.preload("./14-turn off heat bath.glb");
