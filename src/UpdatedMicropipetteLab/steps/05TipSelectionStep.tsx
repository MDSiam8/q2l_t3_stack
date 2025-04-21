// 05TipSelectionStep.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Html } from "@react-three/drei";

// Import your tip box models
import { RedP2TipBoxModel } from "../models/RedP2TipBox";
import { OrangeP20TipBoxModel } from "../models/OrangeP20TipBox";
import { YellowP200TipBoxModel } from "../models/YellowP200TipBox";
import { BlueP1000TipBoxModel } from "../models/BlueP1000TipBox";

interface TipSelectionStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  enableNext: () => void;
}

const TipSelectionStep = forwardRef<unknown, TipSelectionStepProps>(
  ({ nextButtonRef, enableNext }, ref) => {
    // State for the feedback message and its Tailwind classes
    const [feedback, setFeedback] = useState("");
    const [feedbackColor, setFeedbackColor] = useState("");

    useImperativeHandle(ref, () => ({
      replayAnimation: () => {
        // Optionally, reset feedback state here when replaying the step.
      },
    }));

    // Handle tip box clicks with detailed feedback.
    const handleTipBoxClick = (tipType: string) => {
      if (tipType === "Red") {
        setFeedback(
          "Correct! The red tip box is for the P2 pipette, which requires a small tip.",
        );
        setFeedbackColor("bg-green-200 text-green-800");
        enableNext();
      } else if (tipType === "Orange") {
        setFeedback(
          "Incorrect: The orange tip box is for a P20 pipette, which uses a larger tip. Please select the red tip box.",
        );
        setFeedbackColor("bg-red-200 text-red-800");
      } else if (tipType === "Yellow") {
        setFeedback(
          "Incorrect: The yellow tip box is designed for a P200 pipette, which needs an even larger tip.",
        );
        setFeedbackColor("bg-red-200 text-red-800");
      } else if (tipType === "Blue") {
        setFeedback(
          "Incorrect: The blue tip box is for a P1000 pipette, meant for very high volumes. Select the red tip box instead.",
        );
        setFeedbackColor("bg-red-200 text-red-800");
      }
    };

    return (
      <group position={[0, 0, -1]}>
        {/* Render the four tip boxes arranged in a row */}
        <RedP2TipBoxModel
          startingPosition={[-1.7, 3.35, 4]}
          scale={4.2}
          opacity={1}
          rotation={[0, 0, 0]}
          onClick={() => handleTipBoxClick("Red")}
        />
        <OrangeP20TipBoxModel
          startingPosition={[1, 3.35, 4]}
          scale={4.2}
          opacity={1}
          rotation={[0, 0, 0]}
          onClick={() => handleTipBoxClick("Orange")}
        />
        <YellowP200TipBoxModel
          startingPosition={[1, 3.35, -0.4]}
          scale={4.2}
          opacity={1}
          rotation={[0, 0, 0]}
          onClick={() => handleTipBoxClick("Yellow")}
        />
        <BlueP1000TipBoxModel
          startingPosition={[-1.7, 3.35, -0.4]}
          scale={4.2}
          opacity={1}
          rotation={[0, 0, 0]}
          onClick={() => handleTipBoxClick("Blue")}
        />

        {/* Feedback dialog rendered as an HTML overlay in the 3D scene */}
        {feedback && (
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[0, 7, 0.95]}
            distanceFactor={10}
          >
            <div
              className={`rounded p-2 text-center font-sans text-sm shadow-md ${feedbackColor}`}
            >
              {feedback}
            </div>
          </Html>
        )}
      </group>
    );
  },
);

export default TipSelectionStep;
