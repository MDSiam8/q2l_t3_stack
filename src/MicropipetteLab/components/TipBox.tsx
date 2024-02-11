import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";
import { Props } from "~/BaseComponents";

export function TipBox(props: Props) {
  const TipBox = useFBX("./Pipette Tip Box/PipetteTipBox.fbx");
  const clonedScene = TipBox.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={1.3}
      opacity={0.8}
      rotation-x={Math.PI/180 * -90}
      rotation-y={Math.PI/180 * 0}
      rotation-z={Math.PI/180 * 0}
    />
  );
}

// useGLTF.preload("./Pipette/pipettemanL.fbx")