import React, { useRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { MeshProps } from "@react-three/fiber";

interface BumpTrapProps extends MeshProps {
  // Additional props if needed
}

export const BumpTrap = React.forwardRef<any, BumpTrapProps>((props, ref) => {
  // Destructure parent's onClick and keep the rest of the props
  const { onClick, ...restProps } = props;
  const { scene, animations } = useGLTF("./4-NoMachine_BumpTrap_WA.glb");
  // Memoize the cloned scene so it's created only once
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const { actions } = useAnimations(animations, clonedScene);
  const objectRef = useRef<THREE.Group>();

  // Set the initial position only once on mount
  useEffect(() => {
    if (!objectRef.current) return;
    const initialPosition = new THREE.Vector3(0, 5, -0.5);
    objectRef.current.position.copy(initialPosition);
  }, []);

  const moveObjectToTarget = () => {
    return new Promise<void>((resolve) => {
      if (!objectRef.current) return resolve();
      const targetPosition = new THREE.Vector3(0, 5, 0);
      const moveDuration = 0.2; // seconds
      new TWEEN.Tween(objectRef.current.position)
        .to(targetPosition, moveDuration * 1000)
        .onComplete(() => resolve())
        .start();
    });
  };

  const playAnimation = () => {
    const animationName = "Animation";
    const action = actions[animationName];
    if (action) {
      action.reset().play();
      action.setEffectiveTimeScale(0.75);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
    }
  };

  const handleClick = async (e: any) => {
    await moveObjectToTarget();
    playAnimation();
    // Delay calling the parent's onClick to let the animation complete
    setTimeout(() => {
      if (onClick) onClick(e);
    }, 2000); // Adjust delay as needed
  };

  useImperativeHandle(ref, () => ({
    playAnimation: handleClick,
  }));

  // Keep the tween animations running
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <primitive
      {...restProps}
      object={clonedScene}
      ref={objectRef}
      scale={0.64}
      opacity={0.8}
      onClick={handleClick}
    />
  );
});

useGLTF.preload("./4-NoMachine_BumpTrap_WA.glb");
