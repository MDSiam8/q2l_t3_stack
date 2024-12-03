import React from "react";

export function Spectrophotometer(props: any) {
  return (
    <mesh {...props} scale={1.3}>
      <boxGeometry args={[2, 1, 1.2]} />
      <meshStandardMaterial transparent color={"cyan"} />
    </mesh>
  );
}
