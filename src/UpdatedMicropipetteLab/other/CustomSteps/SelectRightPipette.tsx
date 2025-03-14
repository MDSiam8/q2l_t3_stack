import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { BlueP1000MicropipetteModel } from '~/MicropipetteLab/components/BlueP1000Micropipette';
import { OrangeP20MicropipetteModel } from '~/MicropipetteLab/components/OrangeP20Micropipette';
import { PipetteStandModel } from '~/MicropipetteLab/components/PipetteStand';
import { MicropipetteP2Model } from '~/Models/MicropipetteP2';
import { YellowP200MicropipetteModel } from '~/MicropipetteLab/components/YellowP200Micropipette';

const SelectRightPipetteCustomStep = () => {
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
      message = 'Correct! You selected the right micropipette! Red pipettes are meant for between 0.2-2ul.';
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
      <PipetteStandModel
          startingPosition={[2, 0.7, 2.5]}
          scale={4.5}
          opacity={1}
          rotation={[4.7, 0, 1.57]}
      />
      <mesh onClick={() => handlePipetteClick('RedP2', [-0.4, 5.45, 0.9])}>
        <MicropipetteP2Model
            startingPosition={[-0.4, 5.5, 0.85]}
            scale={7}
            opacity={1}
            rotation={[0, 0, 0.4]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('OrangeP20', [-0.4, 5.45, -0.1])}>
        <OrangeP20MicropipetteModel
            startingPosition={[-0.4, 5.45, -0.1]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('YellowP200', [-0.4, 5.45, -1.1])}>
        <YellowP200MicropipetteModel
            startingPosition={[-0.4, 5.45, -1.1]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
        />
      </mesh>
      <mesh onClick={() => handlePipetteClick('BlueP1000', [-0.4, 5.45, -2.1])}>
        <BlueP1000MicropipetteModel
            startingPosition={[-0.4, 5.45, -2.1]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
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
export default SelectRightPipetteCustomStep;



