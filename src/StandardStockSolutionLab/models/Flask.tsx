import React, { useRef } from "react";
import { useFBX, useGLTF } from "@react-three/drei";

export function Flask(props: any) {
  const flask = useGLTF("./vflask50m.glb");
  const clonedScene = flask.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={0.3}
    />
  );
}

useGLTF.preload("./vflask50m.glb")