import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function DistilledWater(props: any) {
  const distilledWater = useGLTF("./distilledWater.glb");
  const clonedScene = distilledWater.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={7.8}
    />
  );
}

useGLTF.preload("./distilledWater.glb")