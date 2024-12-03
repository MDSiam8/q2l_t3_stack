import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

interface DropletProps {
  position: [number, number, number];
  onReachTarget: () => void;
}

function Droplet({ position, onReachTarget }: DropletProps) {
  const dropletRef = useRef<Mesh>(null);

  useFrame(() => {
    if (dropletRef.current) {
      // Move the droplet downwards
      dropletRef.current.position.y -= 0.06; // Adjust speed as needed

      // Check if the droplet has reached the target (e.g., y <= 0)
      if (dropletRef.current.position.y <= 6) {
        onReachTarget();
      }
    }
  });

  return (
    <mesh ref={dropletRef} position={position}>
      <sphereGeometry args={[0.1, 10, 10]} />
      <meshStandardMaterial color="deepskyblue" />
    </mesh>
  );
}

export default Droplet;
