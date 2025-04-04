import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function GlassRod(props: any) {
  const glassRod = useGLTF("./glass rod_20221229.glb");
  const clonedScene = glassRod.scene.clone(); // Clone the scene for isolated use
  // const bottleRef = useRef();

  useEffect(() => {
    // const logPosition = () => {
    //   if (bottleRef.current) {
    //     console.log("Bottle position:", bottleRef.current.position);
    //   }
    // };
    // Log position initially
    // logPosition();
    // Optional: If you expect the position to change, you can set up an interval to log it
    // const intervalId = setInterval(logPosition, 1000); // Log every 1 second
    // Cleanup function
    // return () => clearInterval(intervalId);
  }, []);
  return (
    <primitive
      // ref={bottleRef}
      {...props}
      object={clonedScene}
      scale={.5}
      rotation={[0, (3.14 / 180) * 90, 0]}
    />
  );
}

useGLTF.preload("./glass rod_20221229.glb")