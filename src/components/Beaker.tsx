import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Beaker(props: any) {
  const beaker = useGLTF("./Beaker.gltf");

  return (
    <primitive
      {...props}
      object={beaker.scene}
      scale={10}
      opacity={0.8}
    />
  );
}
