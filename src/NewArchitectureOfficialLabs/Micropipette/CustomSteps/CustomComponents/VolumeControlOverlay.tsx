import React, { useState } from 'react';
import { Html } from '@react-three/drei';

interface VolumeControlOverlayProps {
  position: {
    x: number;
    y: number;
    z: number;
  };
  style?: React.CSSProperties;
}

const VolumeControlOverlay: React.FC<VolumeControlOverlayProps> = ({ position, style }) => {
  const [volume, setVolume] = useState<number>(58);

  const increaseVolume = () => {
    if (volume < 999) {  // Ensuring the volume doesn't exceed three digits
      setVolume(volume + 1);
    }
  };
  const decreaseVolume = () => {
    if (volume > 0) {  // Ensuring the volume doesn't drop below zero
      setVolume(volume - 1);
    }
  };

  // Formatting volume to always display three digits
  const formattedVolume = volume.toString().padStart(3, '0');
  // Convert volume to a decimal string for microliter display
  const microliterVolume = (volume / 100).toFixed(2) + ' μL';

  return (
    <Html position={[position.x, position.y, position.z]} style={style} transform>
      <div
        className="bg-white bg-opacity-75 rounded-lg p-4 shadow-xl flex flex-col items-center justify-between select-none"
      >
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
            onClick={decreaseVolume}
          >
            -
          </button>
          <span className="text-lg font-semibold mx-4">{formattedVolume}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            onClick={increaseVolume}
          >
            +
          </button>
        </div>
        <span className="text-sm font-light">{microliterVolume}</span>
      </div>
    </Html>
  );
};

export default VolumeControlOverlay;
