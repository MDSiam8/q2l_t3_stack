import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Pipette(props: any) {
  const pipette = useFBX("./Pipette/pipetmanL.fbx");
  const clonedScene = pipette.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={1.3}
      opacity={0.8}
      rotation-y={[3.14/180 * 90]}
    />
  );
}

// useGLTF.preload("./Pipette/pipettemanL.fbx")