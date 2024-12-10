import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, MeshStandardMaterial } from "three";

export function Spectrophotometer(props: any) {
  // Load the spec.png texture
  const specTexture = useLoader(TextureLoader, "./spec.png");

  return (
    <group {...props} scale={1.3}>
      {/* Main Box */}
      <mesh>
        <boxGeometry args={[1, 1, 1.5]} />
        <meshStandardMaterial color="grey" />
      </mesh>

      {/* Top Plane with spec.png */}
      <mesh position={[0, 0.5 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1.5]} />
        <meshStandardMaterial map={specTexture} transparent />
      </mesh>
    </group>
  );
}
