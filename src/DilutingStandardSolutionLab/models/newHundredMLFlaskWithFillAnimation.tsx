import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface FlaskHandles {
  playAnimationAtFrame: (fillLevel: number) => void;
  mixer?: THREE.AnimationMixer;
}

export const HundredMLFlaskWithFillAnimation = forwardRef<FlaskHandles, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { scene, animations } = useGLTF("./rb flask filling animation.glb") as any;
  const mixer = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (scene && animations) {
      mixer.current = new THREE.AnimationMixer(scene);
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
      }
    };
  }, [scene, animations]);

  useEffect(() => {
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer.current) {
        mixer.current.update(clock.getDelta());
      }
    };

    animate();
  }, []);

  useImperativeHandle(ref, () => ({
    playAnimationAtFrame: (fillLevel) => {
      if (mixer.current && animations) {
        // Find the animation clip - adjust the name to match your animation
        const clip = THREE.AnimationClip.findByName(animations, "Animation");
        if (clip) {
          const action = mixer.current.clipAction(clip, scene);

          // Set up the action for loop once and clamp when finished
          action.setLoop(THREE.LoopOnce, 0);
          action.clampWhenFinished = true;
          action.enabled = true;

          // Define start time for each fill level
          let startTime = 0;

          switch (fillLevel) {
            case 1: 
              startTime = clip.duration * 0.25; 
              break; // 1/4 filled
            case 2: 
              startTime = clip.duration * 0.5; 
              break;  // half filled
            case 3: 
              startTime = clip.duration * 0.75; 
              break; // 3/4 filled
            case 4: 
              startTime = clip.duration * 1; 
              break; // fully filled
            default: 
              startTime = 0;
          }

          // Set the animation to start from the last reached level
          action.time = startTime;
          action.paused = true;
          action.play();
        } else {
          console.warn(`Animation not found in the model.`);
        }
      }
    },
    mixer: mixer.current,
  }));

  return (
    <group {...props}>
      <primitive object={scene} scale={1} opacity={1} />
    </group>
  );
});

// Preload the GLB file
useGLTF.preload("./rb flask filling animation.glb");