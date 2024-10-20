import React from "react";
export default function WhiteTile(props: any) {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[1, 0.02, 1]} /> {/* Width, Height (thin), Depth */}
      <meshStandardMaterial color="#ffffff" /> {/* White color */}
    </mesh>
  );
}