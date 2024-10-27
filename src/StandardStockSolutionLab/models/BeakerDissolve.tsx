import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
  } from "react";
  import { useGLTF } from "@react-three/drei";
  import * as THREE from "three";
  
  interface BeakerHandles {
    playAnimation: (animationName: string, timeScale?: number) => void;
  }
  
  export const BeakerDissolve = forwardRef<
    BeakerHandles,
    JSX.IntrinsicElements["group"]
  >((props, ref) => {
    // Load the GLB model
    const { scene, animations } = useGLTF("./Beaker_DissolveAnim3.glb") as any;
  
    // Reference to the AnimationMixer
    const mixer = useRef<THREE.AnimationMixer>();
  
    // Initialize the AnimationMixer when the scene and animations are loaded
    useEffect(() => {
      if (scene && animations) {
        mixer.current = new THREE.AnimationMixer(scene);
      }
  
      // Cleanup on unmount
      return () => {
        if (mixer.current) {
          mixer.current.stopAllAction();
        }
      };
    }, [scene, animations]);
  
    // Animation loop to update the mixer
    useEffect(() => {
      const clock = new THREE.Clock();
  
      const animate = () => {
        requestAnimationFrame(animate);
        if (mixer.current) {
          mixer.current.update(clock.getDelta());
        }
      };
  
      animate();
  
      // No cleanup needed for requestAnimationFrame
    }, []);
  
    // Expose the playAnimation method via ref
    useImperativeHandle(ref, () => ({
      playAnimation: (animationName: string, timeScale: number = 1) => {
        if (mixer.current && animations) {
          const clip = THREE.AnimationClip.findByName(animations, animationName);
          if (clip) {
            const action = mixer.current.clipAction(clip, scene);
            action.reset();
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.enabled = true;
            action.timeScale = timeScale; // Set the playback speed here
            action.play();
          } else {
            console.warn(`Animation "${animationName}" not found.`);
          }
        }
      },
    }));
  
    return (
      <primitive object={scene} {...props} scale={10} opacity={0.8} />
    );
  });
  
  // Preload the GLB file
  useGLTF.preload("./Beaker_DissolveAnim3.glb");
  