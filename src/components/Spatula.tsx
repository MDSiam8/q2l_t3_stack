import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Spatula(props: any) {
  const spatula = useGLTF("./spatula.gltf");
  const clonedScene = spatula.scene.clone(); // Clone the scene for isolated use
  return <primitive {...props} object={clonedScene} />;
}

useGLTF.preload("./spatula.gltf")
