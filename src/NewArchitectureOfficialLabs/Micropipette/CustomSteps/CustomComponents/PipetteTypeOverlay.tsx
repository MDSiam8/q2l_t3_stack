import React from "react";
import { Html } from '@react-three/drei';

interface PipetteTypeOverlayProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  pipetteType: string;
  style?: React.CSSProperties;
}

const PipetteTypeOverlay: React.FC<PipetteTypeOverlayProps> = ({ position, pipetteType, style }) => {
  return (
    <Html
      position={[position.x, position.y + 0.1, position.z]}
      style={style}
      transform
      rotation-x={Math.PI / 2 + Math.PI}
      rotation-z={Math.PI / 2}
    >
      <div
        className="overlay-container select-none"
        style={{
          width: '40px', // Reduced width
          height: '20px', // Reduced height
          padding: '2px', // Reduced padding
          background: 'white', // Background color to make it look like a border
          borderRadius: '2px', // Rounding the corners
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Adding some shadow for better visualization
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="overlay-text"
          style={{
            fontSize: '10px', // Font size
            fontWeight: 'bold', // Font weight
            color: 'black', // Text color
          }}
        >
          {pipetteType}
        </span>
      </div>
    </Html>
  );
};

export default PipetteTypeOverlay;
