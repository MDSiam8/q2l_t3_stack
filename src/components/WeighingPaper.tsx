import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import * as THREE from "three";

export default function WeighingPaper(props : any) {
  const paper = useGLTF('/weighing paper folding animation.gltf');
  const animations = useAnimations(paper.animations, paper.scene);
  const animationAction = useRef<THREE.AnimationAction | null>(null);
  const [timeScale, setTimeScale] = useState(1); // 1 for forward, -1 for reverse

  useEffect(() => {
    const action = animations.actions['ArmatureAction']; // Replace 'ArmatureAction' with your actual animation name
    if (action) {
      animationAction.current = action;
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }
  }, [animations.actions]);

  const handlePlayAnimation = () => {
    const action = animationAction.current;
    if (action) {
      setTimeScale(1); // Play forward
      action.reset().play();
    }
  };

  const handleReverseAnimation = () => {
    const action = animationAction.current;
    if (action) {
      setTimeScale(-1); // Play in reverse
      action.play();
    }
  };

  useEffect(() => {
    const action = animationAction.current;
    if (action) {
      action.paused = false; // Make sure the animation is not paused
      action.timeScale = timeScale; // Set the direction of the animation
    }
  }, [timeScale]);

  return (
    <group {...props} >
      <primitive object={paper.scene} scale={0.0245}  />
      <Html
        position={[0, -.05, 0]} // Adjust this position as needed
        transform
        sprite
        scale={0.4}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className="mx-2 cursor-pointer rounded bg-blue-300 px-4 py-2 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handlePlayAnimation}
          >
            Replay
          </button>
          <button
            className="mx-2 cursor-pointer rounded bg-red-300 px-4 py-2 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleReverseAnimation}
          >
            Reverse
          </button>
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload('/weighing paper folding animation.gltf');