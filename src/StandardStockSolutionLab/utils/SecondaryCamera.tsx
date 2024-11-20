// src/components/SecondaryCamera.tsx
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface SecondaryCameraProps {
  onClose: () => void;
}

const SecondaryCamera: React.FC<SecondaryCameraProps> = ({ onClose }) => {
  const { scene, gl, camera: mainCamera } = useThree();
  const zoomCameraRef = useRef<THREE.PerspectiveCamera>(null);
  const renderTargetRef = useRef<THREE.WebGLRenderTarget>(
    new THREE.WebGLRenderTarget(512, 512)
  );

  useFrame(() => {
    if (zoomCameraRef.current) {
      // Position the zoom camera closer to the Flask
      zoomCameraRef.current.position.set(0, 0, 5); // Adjust as needed
      zoomCameraRef.current.lookAt(0, 0, 0); // Ensure it looks at the Flask

      // Render the scene from the zoom camera to the render target
      gl.setRenderTarget(renderTargetRef.current);
      gl.render(scene, zoomCameraRef.current);
      gl.setRenderTarget(null);
    }
  }, 1); // Execute after the main camera

  return (
    <>
      {/* Secondary Perspective Camera */}
      <PerspectiveCamera
        ref={zoomCameraRef}
        makeDefault={false}
        fov={50}
        position={[0, 0, 5]} // Adjust position for zoom
        lookAt={() => new THREE.Vector3(0, 0, 0)} // Ensure it looks at the Flask
      />

      {/* Plane to Display the Rendered Texture */}
      <mesh position={[1.5, 2, -3]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={renderTargetRef.current.texture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame for the Dialog Box */}
      <mesh position={[1.5, 2, -3.001]}>
        <planeGeometry args={[3.1, 3.1]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>

      {/* Close Button within the 3D Scene */}
      <Html position={[1.5, 3.5, -3]}>
        <button
          className="rounded-md p-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg"
          onClick={onClose}
        >
          Close
        </button>
      </Html>
    </>
  );
};

export default SecondaryCamera;
