import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Stopper(props: any) {
  const beaker = useGLTF("./stopper_1003.gltf"); // This needs to be replaced by the correct model.
  const clonedScene = beaker.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.4}
      opacity={0.9}
    />
  );
}

useGLTF.preload("./stopper_1003.gltf");