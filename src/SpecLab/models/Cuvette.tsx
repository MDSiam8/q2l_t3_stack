import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Cuvette(props: any) {
  const cuvette = useGLTF("./cuvette_clearv2.glb");
  const clonedScene = cuvette.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.165}
    />
  );
}

useGLTF.preload("./cuvette_clearv2.glb");