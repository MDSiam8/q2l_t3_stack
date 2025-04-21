import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";
import { Props } from "~/BaseComponents";

export function Pipette(props: Props) {
  const pipette = useFBX("./Pipette/pipetmanL.fbx");
  const clonedScene = pipette.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={1.3}
      opacity={0.8}
      rotation-y={[3.14/180 * 45]}
      rotation-z={3.14/180 * 45}
    />
  );
}

// useGLTF.preload("./Pipette/pipettemanL.fbx")