import React, { useState } from "react";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import { MicropipetteP20Model } from "~/Models/MicropipetteP20";
import { MicropipetteP200Model } from "~/Models/MicropipetteP200";
import { MicropipetteP1000Model } from "~/Models/MicropipetteP1000";
import PipetteLabel from "./CustomComponents/PipetteLabel";
import IncorrectMessage from "./CustomComponents/IncorrectMessage";
import PipetteTypeOverlay from "./CustomComponents/PipetteTypeOverlay";
import { Html } from '@react-three/drei';

const SelectPipetteCustomStep: React.FC = () => {
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);

  const handlePipetteClick = (pipetteNumber: number) => {
    if (pipetteNumber === 1) {
      // Correct selection, show correct message
      console.log("Correct selection! Proceed to the next step.");
      setShowCorrectMessage(true);
    } else {
      // Incorrect selection, show the error message
      setShowIncorrectMessage(true);
    }
  };

  const pipettePositions = [
    { type: "P2", position: { x: 0, y: 2, z: 3 }, model: MicropipetteP2Model },
    { type: "P20", position: { x: 0, y: 2, z: 1 }, model: MicropipetteP20Model },
    { type: "P200", position: { x: 0, y: 2, z: -1 }, model: MicropipetteP200Model },
    { type: "P1000", position: { x: 0, y: 2, z: -3 }, model: MicropipetteP1000Model },
  ];

  return (
    <group>
      {pipettePositions.map((pipette, index) => {
        const ModelComponent = pipette.model;
        return (
          <group key={pipette.type} position={[pipette.position.x, pipette.position.y, pipette.position.z]}>
            <ModelComponent
              startingPosition={[0, 0, 0]} // Relative to the group's position
              opacity={0.6}
              rotation={[0, Math.PI, 0]} // Updated rotation
              scale={5}
            />
            <PipetteTypeOverlay
              position={{ x: 0, y: 1, z: 0 }} // Position the overlay above the pipette
              pipetteType={pipette.type}
            />
            <PipetteLabel
              position={{ x: 0, y: -0.5, z: 0 }} // Position label below the pipette
              label={(index + 1).toString()}
              onClick={() => handlePipetteClick(index + 1)}
            />
          </group>
        );
      })}
      {showCorrectMessage && (
        <Html
          position={[0, 6, 0]} // Position the message
          style={{ zIndex: 1000 }}
          transform
          rotation-x={Math.PI / 2 + Math.PI}
          rotation-y={Math.PI / 2}
          rotation-z={Math.PI / 2}
        >
          <div
            style={{
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              userSelect: 'none', // Make the message unselectable
            }}
            className="select-none" // Ensure it is not selectable
          >
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'green' }}>Correct selection!</p>
            <p>Proceed to the next step.</p>
            <button
              onClick={() => setShowCorrectMessage(false)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                fontSize: '16px',
                background: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                userSelect: 'none', // Make the button text unselectable
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
      {showIncorrectMessage && (
        <IncorrectMessage
          message="Incorrect option! Make sure to see the screen in front of the table for a hint!"
          onClose={() => setShowIncorrectMessage(false)}
        />
      )}
    </group>
  );
};

export default SelectPipetteCustomStep;
