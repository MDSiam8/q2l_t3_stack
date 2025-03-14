import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function CuvetteCap(props: any) {
  const cuvetteCap = useGLTF("./cuvette_v2cap.glb");
  const clonedScene = cuvetteCap.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.15}
    />
  );
}

useGLTF.preload("./cuvette_v2 (1).glb");