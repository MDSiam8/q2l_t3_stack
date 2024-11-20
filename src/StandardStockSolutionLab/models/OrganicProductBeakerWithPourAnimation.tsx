// OrganicProductBeakerWithPourAnimation.jsx
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export function OrganicProductBeakerWithPourAnimation(
  props: JSX.IntrinsicElements["group"] & { onClick?: () => void }
) {
  const { scene, animations } = useGLTF(
    "./beaker pouring solution animation.glb"
  );
  const clonedScene = scene.clone();
  const { actions } = useAnimations(animations, clonedScene);
  const groupRef = useRef<THREE.Group>(null);

  const { invalidate } = useThree();

  useEffect(() => {
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      TWEEN.update(time);
      invalidate(); // Force re-render in React Three Fiber
    };
    requestAnimationFrame(animate);
  }, [invalidate]);

  const playAnimation = () => {
    if (groupRef.current) {
      const group = groupRef.current; // TypeScript knows 'group' is not null here
      const initialPosition = group.position.clone();
      const initialRotation = group.rotation.clone();

      new TWEEN.Tween(group.position)
        .to(
          {
            y: initialPosition.y + 1.0, // Adjust as needed
            z: initialPosition.z - 2.5, // Adjust to align with the flask
          },
          1500
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          // Tilt the beaker to pour
          new TWEEN.Tween(group.rotation)
            .to(
              {
                x: initialRotation.x - 0.785398, // Tilt -45 degrees in radians
              },
              1000
            )
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();

          // Play GLTF animation
          const action = actions["Animation"]; // Ensure this matches your animation name
          if (action) {
            action.reset().play();
            action.setEffectiveTimeScale(1);
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;
          }

          // Move back to original position after a delay
          setTimeout(() => {
            new TWEEN.Tween(group.rotation)
              .to(
                {
                  x: initialRotation.x, // Reset rotation
                },
                1000
              )
              .easing(TWEEN.Easing.Quadratic.Out)
              .start();

            new TWEEN.Tween(group.position)
              .to(
                {
                  y: initialPosition.y,
                  z: initialPosition.z,
                },
                1500
              )
              .easing(TWEEN.Easing.Quadratic.Out)
              .start();
          }, 2000); // Adjust delay based on the pouring duration
        })
        .start();
    }
  };

  return (
    <group
      {...props}
      ref={groupRef}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
        playAnimation();
      }}
    >
      {/* Adjust the scale here */}
      <primitive object={clonedScene} scale={10} />
    </group>
  );
}

useGLTF.preload("./beaker pouring solution animation.glb");
