import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function GlassDropper(props: any) {
  const glassDropper = useGLTF("./glass dropper.glb");
  const clonedScene = glassDropper.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={1}
      opacity={0.8}
    />
  );
}

useGLTF.preload("./glass dropper.glb");