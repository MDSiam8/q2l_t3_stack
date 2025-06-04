import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Background(props: any) {
  const beaker = useGLTF("./3d_Background_fix.glb");
  const clonedScene = beaker.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={3}
      rotation={[0, -.4, 0]}
      position={[0, 15, 0]}
      opacity={1}
    />
  );
}

useGLTF.preload("./3d_Background_fix.glb");