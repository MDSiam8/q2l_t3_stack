import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";

interface CameraAdjusterProps {
  viewLocation: [number, number, number] | null;
}

export function CameraAdjuster({ viewLocation }: CameraAdjusterProps) {
  const { camera } = useThree();
  const target = viewLocation ?? [0, 6.5, 0];

  useEffect(() => {
    camera.lookAt(...target);
    //   camera.setViewOffset(100,100,0,-10,100,100);
  }, [camera, target]);

  useFrame(() => {
    camera.lookAt(...target);
    // camera.updateProjectionMatrix();
  });

  return null;
}
