import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Html, Sphere, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Beaker } from "../models/Beaker";
import { Flask } from "../models/Flask";
import { GlassRod } from "../models/GlassRod";
import { Group } from "three";

interface CheckBeakerResidueProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step15CheckBeakerResidue = forwardRef<Group, CheckBeakerResidueProps>(
  ({ nextButtonRef }, ref) => {
    const [hasResidue, setHasResidue] = useState(true); // Start with residue present
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [isCameraZoomed, setIsCameraZoomed] = useState(false);

    const glassRodRef = useRef<THREE.Object3D>(null);
    const beakerRef = useRef<THREE.Object3D>(null);
    const flaskRef = useRef<THREE.Object3D>(null);
    const groupSphereRef = useRef<Group>(null);

    const { camera } = useThree();

    // Store original camera position to reset later
    const originalCameraPosition = useRef<[number, number, number]>([0, 10, 10]);
    const originalCameraLookAt = useRef<[number, number, number]>([0, 5, 0]);

    // Initialize camera position on mount
    useEffect(() => {
      camera.position.set(...originalCameraPosition.current);
      camera.lookAt(...originalCameraLookAt.current);
    }, [camera]);

    // Disable the Next button initially if residue is present
    useEffect(() => {
      if (nextButtonRef.current) {
        if (hasResidue) {
          setNextDisabled(nextButtonRef);
        } else {
          setNextEnabled(nextButtonRef);
        }
      }
    }, [hasResidue, nextButtonRef]);

    const handleRinseAgain = () => {
      // Logic for rinsing again (remove residue)
      setHasResidue(false);
      setIsPopupVisible(false);
    };

    const handleContinue = () => {
      if (hasResidue) {
        // Show popup if residue still remains
        setIsPopupVisible(true);
      } else {
        // If no residue, proceed with the next step
        setIsPopupVisible(false);
        setNextEnabled(nextButtonRef);
      }
    };

    const handleZoom = () => {
      setIsZoomedIn(true);
    };

    const handleCloseZoom = () => {
      setIsZoomedIn(false);
    };

    const handleCameraZoom = () => {
      setIsCameraZoomed(!isCameraZoomed);
    };

    useEffect(() => {
      if (isCameraZoomed) {
        // Adjust the camera position to be directly in front of the Beaker
        camera.position.set(0, 5, 5); // Position directly in front
        camera.lookAt(0, 4.95, 2.5); // Look directly at the Beaker
      } else {
        // Reset the camera to its original position
        camera.position.set(...originalCameraPosition.current);
        camera.lookAt(...originalCameraLookAt.current);
      }
    }, [isCameraZoomed, camera]);

    return (
      <>
        {/* Include OrbitControls in the main scene */}
        <OrbitControls />

        <group ref={ref}>
          {/* Main Scene Components */}
          <group>
            <Beaker
              ref={beakerRef}
              position={[0, 4.95, 2.5]}
              rotation-y={Math.PI}
            />
            <group ref={groupSphereRef}>
              {hasResidue && (
                <Sphere  position={[0, 4.8, -1.5]} scale={0.3}>
                  <meshStandardMaterial color="red"  />
                </Sphere>
              )}
              {/* Additional spheres can be added here if needed */}
            </group>
          </group>

          <Flask
            ref={flaskRef}
            position={[0, 4.95, -1.5]}
            rotation-y={(-Math.PI / 180) * 45}
          />

          <group rotation={[Math.PI / 36, 0, 0]} position={[0, 6, -1.5]}>
            <GlassRod ref={glassRodRef} position={[0, 0, 0]} />
          </group>

          {/* HTML elements for global buttons */}
          <Html
            position={[0, 7, 0]}
            transform
            scale={0.5}
            rotation-y={Math.PI / 2}
          >
            {/* Rinse Again Button */}
            <button
              className="rounded-md p-3 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-lg transition-transform duration-300"
              onClick={handleRinseAgain}
            >
              Rinse Again
            </button>

            {/* Continue Button */}
            <button
              className="ml-4 rounded-md p-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg transition-transform duration-300"
              onClick={handleContinue}
            >
              Continue
            </button>

            {/* Zoom Button */}
            <button
              className="ml-4 rounded-md p-3 text-sm font-bold text-white bg-purple-500 hover:bg-purple-600 shadow-lg transition-transform duration-300"
              onClick={handleZoom}
            >
              Zoom
            </button>
          </Html>

          {/* HTML element for Camera Zoom button positioned next to the Beaker */}
          <Html
            position={[1, 4.95, 2.5]} // Positioned to the right of the Beaker
            transform
            scale={0.3}
            rotation-y={0} // Facing forward
          >
            {/* Camera Zoom Button */}
            <button
              className="rounded-md p-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg transition-transform duration-300"
              onClick={handleCameraZoom}
            >
              {isCameraZoomed ? "Reset Camera" : "Camera Zoom"}
            </button>
          </Html>

          {/* Popup for residue warning */}
          {isPopupVisible && (
            <Html
              position={[0, 8, 0]}
              transform
              scale={0.5}
              rotation-y={Math.PI / 2}
            >
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Warning: </strong>
                <span>Please rinse again, as the residue still remains.</span>
                <button
                  className="absolute top-0 right-0 px-4 py-3"
                  onClick={() => setIsPopupVisible(false)}
                >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.348 5.652a1 1 0 010 1.415L11.414 10l2.934 2.934a1 1 0 01-1.414 1.415L10 11.414l-2.934 2.934a1 1 0 01-1.415-1.415L8.586 10 5.652 7.066a1 1 0 011.414-1.414L10 8.586l2.934-2.934a1 1 0 011.414 0z" />
                  </svg>
                </button>
              </div>
            </Html>
          )}

          {/* Zoomed-In Dialog */}
          {isZoomedIn && (
            <Html
              position={[1, 5, -4]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.4}
              transform
            >
              <div className="relative p-5 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-2">Zoomed-In View</h2>
                <div className="zoomed-content mb-3">
                  <Canvas
                    style={{ width: "100%", height: "300px" }}
                    camera={{ position: [0, 1.5, 3], fov: 90 }}
                  >
                    <ambientLight intensity={0.5} />
                    <PerspectiveCamera
                      makeDefault
                      position={[0, 0.4, 3]}
                      fov={20}
                    />
                    <OrbitControls />
                    {/* Beaker and Residue in Zoomed View */}
                    <Beaker position={[0, 0, 0]} rotation-y={Math.PI} />
                    {hasResidue && (
                      <Sphere position={[0, -0.15, -0.5]} scale={0.3}>
                        <meshStandardMaterial color="red" />
                      </Sphere>
                    )}
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
      </>
    );
  }
);

export default Step15CheckBeakerResidue;
