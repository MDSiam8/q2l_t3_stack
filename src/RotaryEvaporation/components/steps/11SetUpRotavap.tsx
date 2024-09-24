import React, { useEffect, useRef, useState, forwardRef } from "react";
import { setNextEnabled } from "../Experience";
import { Html } from "@react-three/drei";
import { RotoVap_NoAttachments } from "../rotavap/RotoVap_NoAttachments";
import { BumpTrap } from "../rotavap/BumpTrap";
import { KeckClip_BP } from "../rotavap/KeckClip_(BP)";
import { RB_Flask_TA } from "../rotavap/RBFlask_ToAttach";
import { KeckClip_RB } from "../rotavap/KeckClip_(RB)";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step11SetupRotavp = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const bumpTrapRef = useRef<any>(null);
    const keckClipBPRef = useRef<any>(null);
    const rbFlaskTARef = useRef<any>(null);
    const keckClipRBRef = useRef<any>(null);

    const [incorrectOrder, setIncorrectOrder] = useState(false);

    return (
      <group>
        {/* Base Rotovap */}
        <RotoVap_NoAttachments position={[0, 5, 0]} scale={0.8} />

        {/* Clickable components */}
        <BumpTrap
          ref={bumpTrapRef}
          position={[0, 5, -0.5]}
          scale={0.5}
        />
        <KeckClip_BP
          ref={keckClipBPRef}
          position={[0, 5, -2.25]}
          scale={0.5}
        />
        <RB_Flask_TA
          ref={rbFlaskTARef}
          position={[0, 5, -3]}
          scale={0.5}
        />
        <KeckClip_RB
          ref={keckClipRBRef}
          position={[0, 5, -3.5]}
          scale={0.5}
        />

        {/* Incorrect order message */}
        {incorrectOrder && (
          <Html center>
            <div
              style={{
                color: "red",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                position: "absolute",
                top: "20px",
              }}
            >
              Incorrect order!
            </div>
          </Html>
        )}
      </group>
    );
  }
);

export default Step11SetupRotavp;
