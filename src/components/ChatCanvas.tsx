import React, { useState } from 'react';
import Experience from '~/AnalyticalBalanceLab/components/Experience';

interface ChatCanvasProps {
  width?: string;
  height?: string;
  modelType?: 'cube' | 'sphere' | 'torus';
  backgroundColor?: string;
}

const cameraConfig = {
  position: [25, 6, -1] as [number, number, number],
  zoom: 0.5,
  viewLocation: [0, -10, 0] as [number, number, number],
};

const ChatCanvas: React.FC<ChatCanvasProps> = ({
  width = '100%',
  height = '150px',
}) => {
  const [locked, setLocked] = useState(true);

  const handleUnlock = () => {
    setLocked(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '8px',
      }}
    >
      {/* The actual Three.js canvas */}
      <div
        style={{
          filter: locked ? 'blur(5px)' : 'none',
          pointerEvents: locked ? 'none' : 'auto',
          width: '100%',
          height: '100%',
        }}
      >
        <Experience currentStep={1} onStepChange={() => {}} cameraConfig={cameraConfig} />
      </div>

      {/* Blur overlay with button */}
      {locked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <button
            onClick={handleUnlock}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            View Lab
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatCanvas;
