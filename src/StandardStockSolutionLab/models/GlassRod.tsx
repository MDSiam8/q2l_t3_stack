import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const GlassRod = forwardRef((props, ref) => {
  const glassRod = useGLTF("./glass rod_20221229.glb");
  const clonedScene = glassRod.scene.clone(); // Clone the scene for isolated use

  return (
    <primitive
      {...props}
      object={clonedScene}
      scale={0.5}
    />
  );
});

useGLTF.preload("./glass rod_20221229.glb");
