import React from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import { GroupProps, Object3DProps, Vector3, Vector3Props } from "@react-three/fiber";
import * as THREE from "three";

export function RotoVap_NoAttachments(props: any) {
  const RotoVapMesh = useGLTF("./Rotovap_NoAttachments.glb")

  const clonedScene = RotoVapMesh.scene.clone(); // Clone the scene for isolated use

  return (
    // <group {...props}>
    //     <primitive object={clonedScene} scale={0.8} opacity={0.8} />

    //     <meshStandardMaterial transparent opacity={0.0} />
    // </group>
    <primitive
        {...props}
        object={clonedScene}
        scale={0.64}
        opacity={0.8}
    />
  );
}

useGLTF.preload("./Rotovap_NoAttachments.glb");