import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface BeakerWithWasteFillAnimationProps {
  startAnimationDelay?: number; // Delay in seconds
  [key: string]: any; // To allow for other props like position, scale, etc.
}

export function SFunnelWithTwoLayers({ startAnimationDelay = 0, ...props }: BeakerWithWasteFillAnimationProps) {
  const { scene, animations } = useGLTF("./separating funnel draining water.glb");
  const clonedScene = scene.clone(); // Clone the scene for isolated use

  return <primitive {...props} object={clonedScene} />;
}

useGLTF.preload("./separating funnel draining water.glb");
