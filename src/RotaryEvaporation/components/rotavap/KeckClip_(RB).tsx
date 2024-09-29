import React, { useRef, useEffect, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { MeshProps } from "@react-three/fiber";

interface KeckClipRBProps extends MeshProps {
  // Add any additional props if needed
}

export const KeckClip_RB = React.forwardRef<any, KeckClipRBProps>((props, ref) => {
  const KeckClipMesh = useGLTF("./7-NoMachine_RBFlaskClip_WA.glb") as any;
  const { scene, animations } = KeckClipMesh;
  
  const clonedScene = scene.clone(); // Clone the scene for isolated use
  const { actions } = useAnimations(animations, clonedScene);

  const initialPosition = new THREE.Vector3(0, 5, -3.5); // Initial position
  const targetPosition = new THREE.Vector3(0, 5, 0); // Target position after movement

  const objectRef = useRef<THREE.Group>(new THREE.Group());

  useEffect(() => {
    objectRef.current.position.copy(initialPosition); // Set initial position
  }, []);

  const moveObjectToTarget = () => {
    return new Promise<void>((resolve) => {
      const moveDuration = 1.6; // Duration in seconds

      new TWEEN.Tween(objectRef.current.position)
        .to(targetPosition, moveDuration * 1000)
        .onUpdate(() => {
          objectRef.current.position.copy(objectRef.current.position);
        })
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

  const handleClick = async () => {
    await moveObjectToTarget();
    playAnimation();
  };

  useImperativeHandle(ref, () => ({
    playAnimation: handleClick,
  }));

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <primitive
      {...props}
      object={clonedScene}
      ref={objectRef}
      scale={0.64}
      opacity={0.8}
      onClick={handleClick} // Move and play animation on click
    />
  );
});

useGLTF.preload("./7-NoMachine_RBFlaskClip_WA.glb");
