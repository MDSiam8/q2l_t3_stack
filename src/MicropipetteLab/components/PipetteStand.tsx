import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";
import { Props } from "~/BaseComponents";

export function PipetteStand(props: Props) {
  const pipetteStand = useFBX("./Pipette Stand/pipetteStand.fbx");
  const clonedScene = pipetteStand.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={0.5}
      opacity={0.8}
      rotation-x={Math.PI/180 * -90}
      rotation-y={Math.PI/180 * 0}
      rotation-z={Math.PI/180 * 0}
    />
  );
}

// useGLTF.preload("./Pipette/pipettemanL.fbx")