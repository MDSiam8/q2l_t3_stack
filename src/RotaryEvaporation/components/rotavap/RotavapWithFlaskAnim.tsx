import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function RotavapWithFlaskAnim(props) {
  const { scene } = useGLTF("./1-turn on heat bath.glb");
  const clonedScene = scene.clone(); // Clone the scene for isolated use
  const flaskRef = useRef();
  const animationRef = useRef({
    step: 0,
    originalPosition: new THREE.Vector3(),
    originalRotation: new THREE.Quaternion(),
    timer: 0,
  });

  useEffect(() => {
    // Assign flask reference
    flaskRef.current = clonedScene.children[2]?.children[5];

    // Store original position and rotation
    if (flaskRef.current) {
      animationRef.current.originalPosition.copy(flaskRef.current.position);
      animationRef.current.originalRotation.copy(flaskRef.current.quaternion);
    }
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!flaskRef.current) return;
    const flask = flaskRef.current;
    const anim = animationRef.current;

    switch (anim.step) {
      case 0:
        flask.position.y -= 1;
        if (flask.position.y <= anim.originalPosition.y - 0.1) anim.step++;
        break;
      case 1:
        flask.position.x += 0.6;
        if (flask.position.x >= anim.originalPosition.x + 0.5) anim.step++;
        break;
      case 2:
        flask.rotateZ(-0.01);
        if (flask.quaternion.angleTo(anim.originalRotation) >= THREE.MathUtils.degToRad(80)) {
          anim.step++;
          anim.timer = state.clock.elapsedTime;
        }
        break;
      case 3:
        if (state.clock.elapsedTime >= anim.timer + 1) anim.step++;
        break;
      case 4:
        flask.position.lerp(anim.originalPosition, 0.05);
        flask.quaternion.slerp(anim.originalRotation, 0.05);
        if (flask.position.distanceTo(anim.originalPosition) < 0.01 && flask.quaternion.angleTo(anim.originalRotation) < THREE.MathUtils.degToRad(1)) {
          anim.step = 0;
        }
        break;
      default:
        break;
    }
  });

  return (
    <group {...props}>
      <primitive object={clonedScene} scale={0.8} opacity={0.8} />
    </group>
  );
}

useGLTF.preload("./1-turn on heat bath.glb");
