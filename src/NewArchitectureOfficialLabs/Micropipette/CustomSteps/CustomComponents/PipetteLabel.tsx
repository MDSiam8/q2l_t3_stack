import React from "react";
import { Html } from '@react-three/drei';

interface PipetteLabelProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const PipetteLabel: React.FC<PipetteLabelProps> = ({ position, label, onClick, style }) => {
  return (
    <Html position={[position.x, position.y - 0.6, position.z]} style={style} transform rotation-x={Math.PI / 2 + Math.PI} rotation-z={Math.PI / 2}>
      <div
        className="pipette-label select-none"
        style={{
          width: '20px', // Width of the label
          height: '20px', // Height of the label
          padding: '5px', // Padding
          background: 'white', // Background color
          borderRadius: '3px', // Rounded corners
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow effect
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer', // Pointer cursor to indicate clickable
        }}
        onClick={onClick}
      >
        <span
          style={{
            fontSize: '12px', // Font size
            fontWeight: 'bold', // Font weight
            color: 'black', // Text color
          }}
        >
          {label}
        </span>
      </div>
    </Html>
  );
};

export default PipetteLabel;
