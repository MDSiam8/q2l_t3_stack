import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Stopper(props: any) {
  const stopper = useGLTF("./stopper.glb");
  const clonedScene = stopper.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.30}
    />
  );
}

useGLTF.preload("./stopper.glb")