import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";
import { Props } from "~/BaseComponents";

export function Vortexer(props: Props) {
  const vortexer = useFBX("./Vortexer/vortexer.fbx");
  const clonedScene = vortexer.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={1.3}
      opacity={0.8}
      rotation-x={Math.PI/180 * 0}
      rotation-y={Math.PI/180 * 0}
      rotation-z={Math.PI/180 * 0}
      position={[0,100,-1000]}
    />
  );
}

// useGLTF.preload("./Pipette/pipettemanL.fbx")