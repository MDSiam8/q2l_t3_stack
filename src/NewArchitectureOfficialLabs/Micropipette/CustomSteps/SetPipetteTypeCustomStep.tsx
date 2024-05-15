import React from "react";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";
import { MicropipetteP20Model } from "~/Models/MicropipetteP20";
import { MicropipetteP200Model } from "~/Models/MicropipetteP200";
import { MicropipetteP1000Model } from "~/Models/MicropipetteP1000";
import PipetteTypeOverlay from "./CustomComponents/PipetteTypeOverlay";

const SetPipetteTypeCustomStep = () => {
  const pipettePositions = [
    { type: "P2", position: { x: 0, y: 2, z: 3 }, model: MicropipetteP2Model },
    { type: "P20", position: { x: 0, y: 2, z: 1 }, model: MicropipetteP20Model },
    { type: "P200", position: { x: 0, y: 2, z: -1 }, model: MicropipetteP200Model },
    { type: "P1000", position: { x: 0, y: 2, z: -3 }, model: MicropipetteP1000Model },
  ];

  return (
    <group>
      {pipettePositions.map((pipette) => {
        const ModelComponent = pipette.model;
        return (
          <group key={pipette.type} position={[pipette.position.x, pipette.position.y, pipette.position.z]}>
            <ModelComponent
              startingPosition={[0, 0, 0]} // Relative to the group's position
              opacity={0.6}
              rotation={[0, Math.PI, 0]}
              scale={5}
            />
            <PipetteTypeOverlay position={{ x: 0, y: 1, z: 0 }} pipetteType={pipette.type} />
          </group>
        );
      })}
    </group>
  );
};

export default SetPipetteTypeCustomStep;
