// 04SettingVolumeStep.tsx
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
  } from "react";
  import { Html } from "@react-three/drei";
  import { MicropipetteP2Model } from "../models/MicropipetteP2";
  
  interface SettingVolumeStepProps {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
    enableNext: () => void;
  }
  
  const SettingVolumeStep = forwardRef<unknown, SettingVolumeStepProps>(
    ({ nextButtonRef, enableNext }, ref) => {
      // Initial volume set to the minimum: 0.2 µL
      const [volume, setVolume] = useState(0.2);
      const [feedback, setFeedback] = useState("");
  
      useImperativeHandle(ref, () => ({
        replayAnimation: () => {
          // Optionally reset or replay volume adjustments if needed
        },
      }));
  
      useEffect(() => {
        if (Math.abs(volume - 1) < 0.001) {
          setFeedback("Correct! The pipette is set to 1 µL.");
          enableNext();
        } else if (volume < 1) {
          setFeedback("Volume too low. Increase the volume by rotating clockwise.");
        } else {
          setFeedback("Volume too high. Decrease the volume by rotating counterclockwise.");
        }
      }, [volume, enableNext]);
  
      // Increase volume by 0.2 µL (up to a maximum of 2 µL)
      const increaseVolume = () => {
        setVolume((prev) => Math.min(prev + 0.05, 2));
      };
  
      // Decrease volume by 0.2 µL (down to a minimum of 0.2 µL)
      const decreaseVolume = () => {
        setVolume((prev) => Math.max(prev - 0.05, 0.2));
      };
  
      // Convert volume to a fixed 2-decimal string, remove the decimal point,
      // then split into individual digits.
      const volumeDigits = volume.toFixed(2).replace(".", "").split("");
  
      return (
        <group position={[0, 0, -1]}>
          {/* Render the P2 micropipette model */}
          <MicropipetteP2Model
            startingPosition={[-0.5, 6, 0.25]}
            scale={4}
            opacity={1}
            rotation={[0, Math.PI, 0]}
          />
  
          {/* Left arrow (counterclockwise - decrease volume) */}
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.5, 7.8, 0.9]}
            distanceFactor={10}
          >
            <div
              onClick={decreaseVolume}
              className="cursor-pointer text-2xl select-none text-blue-300"
              style={{ textShadow: "0 0 5px rgba(0,0,0,0.3)" }}
            >
              ⟲
            </div>
          </Html>
  
          {/* Right arrow (clockwise - increase volume) */}
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.5, 7.8, -0.4]}
            distanceFactor={10}
          >
            <div
              onClick={increaseVolume}
              className="cursor-pointer text-2xl select-none text-green-300"
              style={{ textShadow: "0 0 5px rgba(0,0,0,0.3)" }}
            >
              ⟳
            </div>
          </Html>
  
          {/* Vertical UI for the current volume digits */}
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.15, 6.2, 0.25]}
            distanceFactor={10}
            scale={.3}
          >
            <div className="flex flex-col items-center bg-white/90 p-2 rounded shadow-md">
              {volumeDigits.map((digit, index) => (
                <div key={index} className="text-xl font-mono">
                  {digit}
                </div>
              ))}
              <div className="text-sm mt-1">µL</div>
            </div>
          </Html>
  
          {/* Feedback dialog */}
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.5, 9.5, 0.25]}
            distanceFactor={10}
          >
            <div
              className={`p-2 rounded text-center font-sans text-sm shadow-md ${
                feedback === "Correct! The pipette is set to 1 µL."
                  ? "bg-green-200 text-green-800"
                  : feedback.includes("too low")
                  ? "bg-red-200 text-red-800"
                  : feedback.includes("too high")
                  ? "bg-red-200 text-red-800"
                  : "bg-amber-50 text-gray-600"
              }`}
            >
              {feedback}
            </div>
          </Html>
        </group>
      );
    }
  );
  
  export default SettingVolumeStep;
  