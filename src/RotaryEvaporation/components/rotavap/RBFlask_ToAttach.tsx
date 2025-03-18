import React, { useRef, useEffect, useImperativeHandle, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { MeshProps } from "@react-three/fiber";

interface RBFlaskTAProps extends MeshProps {
  // Additional props if needed
}

export const RB_Flask_TA = React.forwardRef<any, RBFlaskTAProps>((props, ref) => {
  const { onClick, ...restProps } = props;
  const { scene, animations } = useGLTF("./6-NoMachine_RBFlask_WA.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const { actions } = useAnimations(animations, clonedScene);
  const objectRef = useRef<THREE.Group>(new THREE.Group());

  const initialPosition = new THREE.Vector3(0, 5, -3);
  const targetPosition = new THREE.Vector3(0, 5, 0);

  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.position.copy(initialPosition);
    }
  }, []);

  const moveObjectToTarget = () => {
    return new Promise<void>((resolve) => {
      const moveDuration = 1.6; // seconds
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
    if (onClick) onClick(e);
  };

  useImperativeHandle(ref, () => ({
    playAnimation: handleClick,
  }));

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    animate();
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

useGLTF.preload("./6-NoMachine_RBFlask_WA.glb");
