import React, { useState, useEffect } from "react";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Flask } from "../models/Flask";

interface DiluteSolutionInFlaskProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step16DiluteSolutionInFlask: React.FC<DiluteSolutionInFlaskProps> = ({
  nextButtonRef,
}) => {
  const [hasPoured, setHasPoured] = useState(false);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  useEffect(() => {
    if (nextButtonRef.current) {
      if (hasPoured) {
        setNextEnabled(nextButtonRef);
      } else {
        setNextDisabled(nextButtonRef);
      }
    }
  }, [hasPoured, nextButtonRef]);

  const handlePour = () => {
    setHasPoured(true);
  };

  const handleZoom = () => {
    setIsZoomedIn(true);
  };

  const handleCloseZoom = () => {
    setIsZoomedIn(false);
  };

  return (
    <group>
      <Flask position={[0, 5, 0]} />

      {/* Pour Button */}
      <Html
        position={[0, 8, 0]}
        transform
        scale={0.5}
        rotation={[0, Math.PI / 2, 0]} // Corrected rotation
      >
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
          onClick={handlePour}
        >
          Pour
        </button>
      </Html>

      {/* Zoom Button */}
      <Html
        position={[0, 6, 0]}
        transform
        scale={0.5}
        rotation={[0, Math.PI / 2, 0]} // Corrected rotation
      >
        <button
          className="rounded-md p-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg transition-transform duration-300"
          onClick={handleZoom}
        >
          Zoom
        </button>
      </Html>

      {/* Zoomed-In Dialog */}
      {isZoomedIn && (
        <Html
          position={[1, 5, -4]}
          rotation={[0, Math.PI / 2, 0]} // Corrected rotation
          scale={0.4}
          transform
        >
          <div className="relative p-5 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-2">Zoomed-In View</h2>
            <div className="zoomed-content mb-3">
              <Canvas
                style={{ width: "100%", height: "300px" }}
                camera={{ position: [0, 1.5, 3], fov: 90 }} // Adjusted camera position and fov
              >
                <ambientLight intensity={0.5} />
                <PerspectiveCamera
                  makeDefault
                  position={[0, 0.4, 3]}
                  fov={20}
                />
                <OrbitControls />
                <Flask position={[0, 0, 0]} scale={[1, 1, 1]} /> {/* Adjusted scale if necessary */}
              </Canvas>
            </div>
            <button
              className="absolute top-2 right-2 text-sm text-red-500"
              onClick={handleCloseZoom}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Step16DiluteSolutionInFlask;
