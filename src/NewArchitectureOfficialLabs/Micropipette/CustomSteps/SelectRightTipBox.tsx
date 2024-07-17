import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { BlueP1000MicropipetteModel } from '~/MicropipetteLab/components/BlueP1000Micropipette';
import { OrangeP20MicropipetteModel } from '~/MicropipetteLab/components/OrangeP20Micropipette';
import { PipetteStandModel } from '~/MicropipetteLab/components/PipetteStand';
import { RedP2MicropipetteModel } from '~/MicropipetteLab/components/RedP2Micropipette';
import { YellowP200MicropipetteModel } from '~/MicropipetteLab/components/YellowP200Micropipette';
import { RedP2TipBoxModel } from '~/MicropipetteLab/components/RedP2TipBox';
import { OrangeP20TipBoxModel } from '~/MicropipetteLab/components/OrangeP20TipBox';
import { YellowP200TipBoxModel } from '~/MicropipetteLab/components/YellowP200TipBox';
import { BlueP1000TipBoxModel } from '~/MicropipetteLab/components/BlueP1000TipBox';
import { MicropipetteP2Model } from '~/Models/MicropipetteP2';

const SelectRightTipBox = () => {
  const [dialog, setDialog] = useState<{
    show: boolean;
    message: string;
    position: THREE.Vector3;
  }>({
    show: false,
    message: '',
    position: new THREE.Vector3(),
  });

  const handlePipetteClick = (pipetteType: string, position: [number, number, number]) => {
    let message = '';
    if (pipetteType === 'RedP2') {
      message = 'Correct! You selected the correct tip box!';
    } else {
      message = 'Incorrect selection. Please try again.';
    }
    setDialog({
      show: true,
      message,
      position: new THREE.Vector3(...position),
    });
  };

  return (
    <group>
      <MicropipetteP2Model
          startingPosition={[0, 4, 0.4]}
          scale={5}
          opacity={1}
          rotation={[0, 3.14 * 180 / 180, 0]}
      />
      <mesh onClick={() => handlePipetteClick('RedP2', [1, 8, 5])}>
        <RedP2TipBoxModel
            startingPosition={[1, 0.5, 5]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('OrangeP20', [1, 7, 2.5])}>
        <OrangeP20TipBoxModel
            startingPosition={[1, 0.5, 2.5]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('YellowP200', [1, 7, -0.1])}>
        <YellowP200TipBoxModel
            startingPosition={[1, 0.5, -0.1]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('BlueP1000', [1, 7, -2.7])}>
        <BlueP1000TipBoxModel
            startingPosition={[1, 0.5, -2.7]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0]}
        />
      </mesh>
      {dialog.show && (
        <Html position={dialog.position}>
          <div className="rounded-lg border border-blue-300 bg-blue-100 p-3 text-blue-700 shadow-md">
            {dialog.message}
          </div>
        </Html>
      )}
    </group>
  );
};
export default SelectRightTipBox;