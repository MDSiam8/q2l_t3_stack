import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function BottleCap(props: any) {
  const beaker = useGLTF("./sample bottle cap.gltf");

  return (
    <primitive
      {...props}
      object={beaker.scene}
      scale={1.3}
      opacity={0.8}
      rotation-y={[3.14/180 * 90]}
    />
  );
}
