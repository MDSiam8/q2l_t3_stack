// MicropipetteRangeStep.tsx
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Html } from "@react-three/drei";
import { PipetteStandModel } from "../models/PipetteStand";
import { MicropipetteP2Model } from "../models/MicropipetteP2";
import { OrangeP20MicropipetteModel } from "../models/OrangeP20Micropipette";
import { YellowP200MicropipetteModel } from "../models/YellowP200Micropipette";
import { BlueP1000MicropipetteModel } from "../models/BlueP1000Micropipette";

interface Step2Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const MicropipetteRangeStep = forwardRef<unknown, Step2Props>(
  ({ nextButtonRef, enableNext }, ref) => {
    // Automatically enable the Next button after 5 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        enableNext();
      }, 5000);
      return () => clearTimeout(timer);
    }, [enableNext]);

    useImperativeHandle(ref, () => ({
      replayAnimation: () => {
        // No custom animations for this static step
      },
    }));

    return (
      <group position={[0, 0, -1]}>
        {/* Render the lab background with pipettes */}
        <PipetteStandModel
          startingPosition={[0.6, 3.5, 1.2]}
          scale={3.5}
          opacity={1}
          rotation={[4.7, 0, 1.57]}
        />
        <MicropipetteP2Model
          startingPosition={[-0.5, 6, 0.25]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
        />
        <OrangeP20MicropipetteModel
          startingPosition={[-0.5, 6, -0.4]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
        />
        <YellowP200MicropipetteModel
          startingPosition={[-0.5, 6, -1]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
        />
        <BlueP1000MicropipetteModel
          startingPosition={[-0.5, 6, -1.6]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
        />

        {/* HTML overlay: a table explaining micropipette ranges */}
        <Html
          transform
          rotation={[0, Math.PI / 2, 0]}
          position={[0, 6, 4.2]}
          distanceFactor={10}
          scale={0.8}
        >
          <div className="bg-gray-200 bg-opacity-70 backdrop-blur-md p-4 rounded-lg select-none">
            <h2 className="text-lg font-bold mb-2">Micropipette Ranges</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-2 py-1 text-left">Pipette</th>
                  <th className="px-2 py-1 text-left">Volume Range (µL)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-2 py-1">P2</td>
                  <td className="px-2 py-1">0.2 – 2</td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1">P20</td>
                  <td className="px-2 py-1">2 – 20</td>
                </tr>
                <tr className="border-b">
                  <td className="px-2 py-1">P200</td>
                  <td className="px-2 py-1">20 – 200</td>
                </tr>
                <tr>
                  <td className="px-2 py-1">P1000</td>
                  <td className="px-2 py-1">200 – 1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Html>
      </group>
    );
  }
);

export default MicropipetteRangeStep;
