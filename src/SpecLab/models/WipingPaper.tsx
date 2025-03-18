import React from "react";

export function WipingPaper(props: any) {
  return (
    <mesh {...props} rotation-z={Math.PI / 2} scale={1.3}>
      <boxGeometry args={[1, 0.01, 1.2]} />
      <meshStandardMaterial opacity={0.8} transparent />
    </mesh>
  );
}
