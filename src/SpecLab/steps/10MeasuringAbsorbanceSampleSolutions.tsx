import React, { forwardRef, useEffect, useState, useCallback, memo } from "react";
import { Spectrophotometer } from "../models/Spectrophotometer";
import { Cuvette } from "../models/Cuvette";
import { Text, Plane } from "@react-three/drei";

// CloseButton Component
const CloseButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <group position={[0, -0.8, 0]}>
      <Plane
        args={[1, 0.3]}
        onClick={onClick}
        position={[0, 0, 0.1]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial color="red" />
        <Text
          color="white"
          fontSize={0.2}
          position={[0, 0, 0.1]}
          anchorX="center"
          anchorY="middle"
        >
          Close
        </Text>
      </Plane>
    </group>
  );
});

interface Step10Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step10MeasuringAbsorbanceSampleSolutions = forwardRef<
  THREE.Group,
  Step10Props
>(({ nextButtonRef }, ref) => {
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [absorbanceValue] = useState("0.496"); // Simulated absorbance value

  useEffect(() => {
    if (nextButtonRef?.current) {
      nextButtonRef.current.disabled = true;
      nextButtonRef.current.style.opacity = "0.5";
    }
  }, [nextButtonRef]);

  const handleMeasurement = useCallback(() => {
    setShowMeasurement(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowMeasurement(false);
  }, []);

  return (
    <group ref={ref}>
      {/* Spectrophotometer */}
      <Spectrophotometer position={[0, 5, 0]} />

      {/* Cuvette */}
      <Cuvette position={[-0.3, 5.4, -0.55]} />

      {/* Start Measurement Button */}
      {!showMeasurement && (
        <group position={[0, 6.5, 0]} rotation={[0, 1.57, 0]}>
          <Plane
            args={[2.2, 0.6]} // Increase width and height of the Plane
            onClick={handleMeasurement}
            position={[0, 0.5, 0]}
          >
            <meshStandardMaterial color="#00796b" />
            <Text
              color="white"
              fontSize={0.2}
              position={[0, 0, 0.01]} // Slight offset to prevent z-fighting
              anchorX="center"
              anchorY="middle"
            >
              Start Measurement
            </Text>
          </Plane>
        </group>      
      )}

      {/* Measurement Popup */}
      {showMeasurement && (
        <group position={[0, 7.5, 0]} rotation={[0, 1.57, 0]}>
          {/* Popup Background */}
          <Plane args={[3, 2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="white" />
          </Plane>

          {/* Absorbance Text */}
          <Text
            color="black"
            fontSize={0.2}
            position={[0, 0.5, 0.05]} // Slightly forward to prevent overlap
            anchorX="center"
            anchorY="middle"
          >
            Absorbance
          </Text>
          <Text
            color="black"
            fontSize={0.4}
            position={[0, 0, 0.05]} // Slightly forward
            anchorX="center"
            anchorY="middle"
          >
            {absorbanceValue}
          </Text>

          {/* Close Button */}
          <CloseButton onClick={handleClosePopup} />
        </group>
      )}
    </group>
  );
});

export default Step10MeasuringAbsorbanceSampleSolutions;
