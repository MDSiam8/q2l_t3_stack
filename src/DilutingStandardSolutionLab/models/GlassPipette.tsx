import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function GlassPipette(props: any) {
  const glassPipette = useGLTF("./pipet25.glb");
  const clonedScene = glassPipette.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={.5}
    />
  );
}

export default GlassPipette;

useGLTF.preload("./pipet25.glb");