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

interface Step3Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const MicropipetteSelectionStep = forwardRef<unknown, Step3Props>(
  ({ nextButtonRef, enableNext }, ref) => {
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackColor, setFeedbackColor] = useState("");

    useEffect(() => {
      // No auto-enable Next for this step.
    }, [enableNext]);

    useImperativeHandle(ref, () => ({
      replayAnimation: () => {
        // Add replay logic if necessary.
      },
    }));

    // When a pipette is clicked, update the feedback message and dynamic color
    const handlePipetteClick = (pipetteType: string) => {
      if (pipetteType === "P2") {
        setFeedbackMessage(
          "Correct! The P2 pipette is ideal for measuring 1 µL (range: 0.2–2 µL)."
        );
        setFeedbackColor("green");
        enableNext(); // Unlock Next button
      } else {
        let explanation = "";
        if (pipetteType === "P20") {
          explanation =
            "The P20 pipette is calibrated for volumes between 2 µL and 20 µL, which is too high for 1 µL.";
        } else if (pipetteType === "P200") {
          explanation =
            "The P200 pipette is designed for volumes between 20 µL and 200 µL, making it unsuitable for 1 µL.";
        } else if (pipetteType === "P1000") {
          explanation =
            "The P1000 pipette handles volumes between 200 µL and 1000 µL, which far exceeds the required 1 µL.";
        }
        setFeedbackMessage(`Incorrect: ${explanation} Please try another pipette.`);
        setFeedbackColor("red");
      }
    };

    // Compute Tailwind background class based on feedbackColor value.
    const bgClass =
      feedbackColor === "green"
        ? "bg-green-200"
        : feedbackColor === "red"
        ? "bg-red-200"
        : "bg-transparent";

    return (
      <group position={[0, 0, -1]}>
        {/* Background lab models */}
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
          onClick={() => handlePipetteClick("P2")}
        />
        <OrangeP20MicropipetteModel
          startingPosition={[-0.5, 6, -0.4]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
          onClick={() => handlePipetteClick("P20")}
        />
        <YellowP200MicropipetteModel
          startingPosition={[-0.5, 6, -1]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
          onClick={() => handlePipetteClick("P200")}
        />
        <BlueP1000MicropipetteModel
          startingPosition={[-0.5, 6, -1.6]}
          scale={4}
          opacity={1}
          rotation={[0, 0, 0.4]}
          onClick={() => handlePipetteClick("P1000")}
        />

        {/* Feedback dialog displayed in 3D using Html */}
        {feedbackMessage && (
          <Html transform position={[0, 6, 5]} rotation-y={Math.PI / 2}>
            <div
              className={`p-2 rounded border border-gray-300 shadow-lg pointer-events-none font-sans w-[270px] select-none text-gray-800 ${bgClass}`}
            >
              {feedbackMessage}
            </div>
          </Html>
        )}
      </group>
    );
  }
);

export default MicropipetteSelectionStep;
