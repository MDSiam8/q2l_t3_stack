import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function LabEnvironment(props: any) {
  const labEnvironment = useGLTF("./V2.glb");
  const clonedScene = labEnvironment.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={10}
      opacity={0.8}
    />
  );
}

useGLTF.preload("./V2.glb");