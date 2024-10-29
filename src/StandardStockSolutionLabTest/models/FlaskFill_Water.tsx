import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface FlaskHandles {
  playAnimationAtFrame: (fillLevel: number) => void;
  mixer?: THREE.AnimationMixer;
}

export const FlaskFill = forwardRef<FlaskHandles, JSX.IntrinsicElements["group"]>((props, ref) => {
  const { scene, animations } = useGLTF("./FlaskFill_Water.glb") as any;
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
        const clip = THREE.AnimationClip.findByName(animations, "FillWater");
        if (clip) {
          const action = mixer.current.clipAction(clip, scene);
  
          // Set up the action for loop once and clamp when finished
          action.setLoop(THREE.LoopOnce, 0);
          action.clampWhenFinished = true;
          action.enabled = true;
  
          // Define start and end times for each fill level
          let startTime = 0;
          //let endTime = 0;
  
          switch (fillLevel) {
            case 1: 
              startTime = 0.25; 
              //endTime = clip.duration * 0.25; 
              break; // 1/4 filled
            case 2: 
              startTime = clip.duration * 0.5; 
              //endTime = clip.duration * 0.5; 
              break;  // half filled
            case 3: 
              startTime = clip.duration * 0.75; 
              //endTime = clip.duration * 0.75; 
              break; // 3/4 filled
            case 4: 
              startTime = clip.duration * 1; 
              //endTime = clip.duration; 
              break; // fully filled
            default: 
              startTime = 0;
              //endTime = 0; // empty
          }
  
          // Set the animation to start from the last reached level and go to the next level
          action.time = startTime;
          action.play();
  
          // Set the effective time scale so that it stops at the next level's end time
          //const playDuration = endTime - startTime;
          //action.setDuration(playDuration / clip.duration); // Normalize based on the portion we want to play
        } else {
          console.warn(`Animation "FillWater" not found.`);
        }
      }
    },
    mixer: mixer.current,
  }));
  
  

  return (
    <group {...props}>
      <primitive object={scene} scale={0.6} opacity={1} />
    </group>
  );
});

// Preload the GLB file
useGLTF.preload("./FlaskFill_Water.glb");
