import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Experience from '~/AnalyticalBalanceLab/components/Experience';

interface ChatCanvasProps {
  width?: string;
  height?: string;
  modelType?: 'cube' | 'sphere' | 'torus';
  backgroundColor?: string;
}

const ChatCanvas: React.FC<ChatCanvasProps> = ({
  width = '100%',
  height = '150px',
}) => {
  // Prevent propagation of pointer events to avoid interfering with chat interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={{ 
        width, 
        height, 
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '8px',
      }}
      onPointerDown={handlePointerDown}
    >
      <Experience currentStep={1} onStepChange={() => {}} />
    </div>
  );
};

export default ChatCanvas; 