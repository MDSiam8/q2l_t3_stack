import React from "react";
import { Html } from '@react-three/drei';

interface IncorrectMessageProps {
  message: string;
  onClose: () => void;
  style?: React.CSSProperties;
}

const IncorrectMessage: React.FC<IncorrectMessageProps> = ({ message, onClose, style }) => {
  return (
    <Html position={[0, 5, 0]} style={style} transform rotation-x={Math.PI / 2 + Math.PI} rotation-y={Math.PI / 2} rotation-z={Math.PI / 2}>
      <div
        className="incorrect-message select-none"
        style={{
          padding: '20px', // Padding around the message
          background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
          borderRadius: '10px', // Rounded corners
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Shadow effect
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center', // Center text alignment
          color: 'red', // Text color
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{message}</span>
        <button
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            fontSize: '14px',
            background: 'red',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Html>
  );
};

export default IncorrectMessage;
