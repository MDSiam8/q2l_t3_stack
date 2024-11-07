import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function PipetteBulb(props: any) {
  const glassPipette = useGLTF("./pipet bulb.glb");
  const clonedScene = glassPipette.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.5}
    />
  );
}

useGLTF.preload("./pipet bulb.glb");