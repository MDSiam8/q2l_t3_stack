import React, { useState } from "react";
import { Html } from '@react-three/drei';
import TipBoxLabel from "./CustomComponents/TipBoxLabel"; // Import the TipBoxLabel component
import { MicropipetteTipBoxP2Model } from "~/Models/MicropipetteTipBoxP2";
import { MicropipetteTipBoxP20Model } from "~/Models/MicropipetteTipBoxP20";
import { MicropipetteTipBoxP200Model } from "~/Models/MicropipetteTipBoxP200";
import { MicropipetteTipBoxP1000Model } from "~/Models/MicropipetteTipBoxP1000";
import IncorrectMessage from "./CustomComponents/IncorrectMessage";

const SelectTipBoxStep: React.FC = () => {
  const [showIncorrectMessage, setShowIncorrectMessage] = useState(false);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);

  const handleTipBoxClick = (boxNumber: number) => {
    if (boxNumber === 1) { // Assume 1 is the correct box number
      setShowCorrectMessage(true);
      setShowIncorrectMessage(false);
    } else {
      setShowCorrectMessage(false);
      setShowIncorrectMessage(true);
    }
  };

  const tipBoxPositions = [
    { type: "P2", number: 1, position: { x: 0, y: 0, z: 5.5 }, model: MicropipetteTipBoxP2Model },
    { type: "P20", number: 2, position: { x: 0, y: 0, z: 2.5 }, model: MicropipetteTipBoxP20Model },
    { type: "P200", number: 3, position: { x: 0, y: 0, z: -0.5 }, model: MicropipetteTipBoxP200Model },
    { type: "P1000", number: 4, position: { x: 0, y: 0, z: -3.5 }, model: MicropipetteTipBoxP1000Model },
  ];

  return (
    <group>
      {tipBoxPositions.map((tipBox) => {
        const ModelComponent = tipBox.model;
        return (
          <group key={tipBox.type} position={[tipBox.position.x, tipBox.position.y, tipBox.position.z]}>
            <ModelComponent
              startingPosition={[0, 0, 0]} // Relative to the group's position
              opacity={0.6}
              rotation={[0, 0, 0]} // Updated rotation
              scale={4}
            />
            <TipBoxLabel
              position={{ x: 2, y: 1.2, z: -0.8 }} // Position the label above the tip box
              label={tipBox.number.toString()}
              onClick={() => handleTipBoxClick(tipBox.number)}
            />
          </group>
        );
      })}
      <Html
        position={[0, 6, 0]} // Position the message
        style={{ zIndex: 999 }}
        transform
        rotation-x={Math.PI / 2 + Math.PI}
        rotation-y={Math.PI / 2}
        rotation-z={Math.PI / 2}
      >
        <div
          style={{
            width: '800px', // Increase the width
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            userSelect: 'none', // Make the message unselectable
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 'none', // Ensure the text does not wrap unnecessarily
          }}
          className="select-none" // Ensure it is not selectable
        >
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'black', margin: 0 }}>
            Choose the correct tip holder for the following micropipette -&gt; Target pipette: P2
          </p>
        </div>
      </Html>
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

export default SelectTipBoxStep;
