import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Spatula(props: any) {
  const spatula = useGLTF("./spatula.gltf");
  return <primitive {...props} object={spatula.scene} />;
}
