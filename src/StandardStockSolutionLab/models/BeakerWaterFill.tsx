import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
  } from "react";
  import { useGLTF } from "@react-three/drei";
  import * as THREE from "three";
  
  interface BeakerHandles {
    playAnimation: (animationName: string) => void;
  }
  
  export const BeakerWaterFill = forwardRef<
    BeakerHandles,
    JSX.IntrinsicElements["group"]
  >((props, ref) => {
    const { scene, animations } = useGLTF("./Beaker_FillAnim.glb") as any;
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
      playAnimation: (animationName: string) => {
        if (mixer.current && animations) {
          const clip = THREE.AnimationClip.findByName(animations, animationName);
          if (clip) {
            const action = mixer.current.clipAction(clip, scene);
            action.reset();
            // Set the action to play only once and clamp when finished
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.enabled = true;
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
  
  useGLTF.preload("./Beaker_FillAnim.glb");
  