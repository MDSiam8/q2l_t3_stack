// 06TipAttachmentStep.tsx
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";
  import { Html } from "@react-three/drei";
  import gsap from "gsap";
  import { MicropipetteP2Model } from "../models/MicropipetteP2";
  import { RedP2TipBoxModel } from "../models/RedP2TipBox";
  
  interface TipAttachmentStepProps {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
    enableNext: () => void;
  }
  
  const TipAttachmentStep = forwardRef<unknown, TipAttachmentStepProps>(
    ({ nextButtonRef, enableNext }, ref) => {
      // State to track if the tip is attached.
      const [attached, setAttached] = useState(false);
      // Create a ref for the pipette model so we can animate it.
      const pipetteRef = useRef<any>(null);
  
      useImperativeHandle(ref, () => ({
        replayAnimation: () => {
          // Optionally, reset the pipette to its original position for a replay.
          if (pipetteRef.current) {
            gsap.to(pipetteRef.current.position, {
              y: 4.5,
              duration: 0.5,
            });
            setAttached(false);
          }
        },
      }));
  
      const handleAttachment = () => {
        if (pipetteRef.current) {
          // Animate the pipette's position downwards (from y=5.5 to y=4.5)
          gsap.to(pipetteRef.current.position, {
            y: -2.65,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setAttached(true);
              enableNext();
            },
          });
        }
      };
  
      return (
        <group position={[0, 0, 0]}>
          {/* Render the pipette within a group that receives the ref */}
          <group ref={pipetteRef} onClick={handleAttachment}>
            <MicropipetteP2Model
              startingPosition={[0.1, 8.5, 0.265]}
              scale={3.7}
              opacity={1}
              rotation={[0, Math.PI, 0]}
            />
          </group>
  
          {/* Render the Red P2 tip box */}
          <RedP2TipBoxModel
            startingPosition={[-0.5, 3.35, 0.55]}
            scale={4}
            opacity={1}
            rotation={[0, 0, 0]}
          />
  
          {/* HTML overlay for instructions and feedback */}
          <Html
            transform
            rotation={[0, Math.PI / 2, 0]}
            position={[-0.5, 6.5, -4.0]}
            distanceFactor={10}
          >
            {!attached ? (
              <div className="bg-gray-100/80 p-2 rounded shadow-md text-center text-sm font-sans">
                Click the pipette to attach the tip.
              </div>
            ) : (
              <div className="bg-green-200 text-green-800 p-2 rounded shadow-md text-center text-sm font-sans">
                Tip attached successfully!
              </div>
            )}
          </Html>
        </group>
      );
    }
  );
  
  export default TipAttachmentStep;
  