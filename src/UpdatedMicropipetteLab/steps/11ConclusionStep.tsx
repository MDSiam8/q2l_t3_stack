// 01IntroductionToLab.tsx
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
  } from "react";
  
  // Import the same models referenced in your old Step 1
  import { RedP2TipBoxModel } from "../models/RedP2TipBox";
  import { PipetteStandModel } from "../models/PipetteStand";
  import { MicropipetteP2Model } from "../models/MicropipetteP2";
  import { OrangeP20MicropipetteModel } from "../models/OrangeP20Micropipette";
  import { YellowP200MicropipetteModel } from "../models/YellowP200Micropipette";
  import { BlueP1000MicropipetteModel } from "../models/BlueP1000Micropipette";
  
  interface IntroductionToLabProps {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
    enableNext: () => void;
  }
  
  const ConclusionStep = forwardRef<unknown, IntroductionToLabProps>(
    ({ nextButtonRef, enableNext }, ref) => {
      // Automatically enable the Next button after a short delay
      useEffect(() => {
        const timer = setTimeout(() => {
          enableNext();
        }, 2000);
        return () => clearTimeout(timer);
      }, [enableNext]);
  
      // Optionally expose methods like replayAnimation via the ref
      useImperativeHandle(ref, () => ({
        replayAnimation: () => {
          // No animations here for Step 1
        },
      }));
  
      return (
        <group position={[0, 0, -1]}>   
          {/* Tip box (Red P2) */}
          <RedP2TipBoxModel
            startingPosition={[-1.2, 3.35, 4]}
            scale={4.2}
            opacity={1}
            rotation={[0, 0, 0]}
          />
  
          {/* Pipette stand */}
          <PipetteStandModel
            startingPosition={[.6, 3.5, 1.2]}
            scale={3.5}
            opacity={1}
            rotation={[4.7, 0, 1.57]}
          />
  
          {/* P2 micropipette */}
          <MicropipetteP2Model
            startingPosition={[-0.5, 6, 0.25]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
          />
  
          {/* P20 micropipette (orange) */}
          <OrangeP20MicropipetteModel
            startingPosition={[-0.5, 6, -0.4]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
          />
  
          {/* P200 micropipette (yellow) */}
          <YellowP200MicropipetteModel
            startingPosition={[-0.5, 6, -1]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
          />
  
          {/* P1000 micropipette (blue) */}
          <BlueP1000MicropipetteModel
            startingPosition={[-0.5, 6, -1.6]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0.4]}
          />
        </group>
      );
    }
  );
  
  export default ConclusionStep;
  