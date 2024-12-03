import React, {
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
  } from "react";
  import { useGLTF } from "@react-three/drei";
  import * as THREE from "three";
  
  interface FlaskHandles {
    playAnimation: (animationName: string, speed?: number) => void;
  }
  
  export const WaterBelowLine = forwardRef<
    FlaskHandles,
    JSX.IntrinsicElements["group"]
  >((props, ref) => {
    const { scene, animations } = useGLTF("./NewWater_BelowLine.glb") as any;
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
      playAnimation: (animationName: string, speed: number = 1) => {
        if (mixer.current && animations) {
          const clip = THREE.AnimationClip.findByName(animations, animationName);
          if (clip) {
            const action = mixer.current.clipAction(clip, scene);
            action.reset();
            // Set the action to play only once and clamp when finished
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.enabled = true;
            action.timeScale = speed; // Apply speed
            action.play();
          } else {
            console.warn(`Animation "${animationName}" not found.`);
            console.log(
              "Available animations:",
              animations.map((a: any) => a.name)
            );
          }
        }
      },
    }));
  
    return <primitive object={scene} {...props} scale={0.3} opacity={0.8} />;
  });
  
  useGLTF.preload("./NewWater_BelowLine.glb");
  