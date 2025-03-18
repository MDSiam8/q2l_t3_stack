import React, { useEffect, useRef, useState, forwardRef } from "react";
import { setNextEnabled } from "../Experience";
import { RotoVap_NoAttachments } from "../rotavap/RotoVap_NoAttachments";
import { BumpTrap } from "../rotavap/BumpTrap";
import { KeckClip_BP } from "../rotavap/KeckClip_(BP)";
import { RB_Flask_TA } from "../rotavap/RBFlask_ToAttach";
import { KeckClip_RB } from "../rotavap/KeckClip_(RB)";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step10SetupRotovap = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const bumpTrapRef = useRef<any>(null);
    const keckClipBPRef = useRef<any>(null);
    const rbFlaskTARef = useRef<any>(null);
    const keckClipRBRef = useRef<any>(null);

    const [clickedItems, setClickedItems] = useState<string[]>([]);

    // Disable next button initially
    useEffect(() => {
      if (nextButtonRef.current) {
        nextButtonRef.current.disabled = true;
      }
    }, [nextButtonRef]);

    // Log the click and update state
    const handleItemClick = (item: string) => {
      console.log("Clicked item:", item);
      setClickedItems((prevItems) => {
        if (!prevItems.includes(item)) {
          const newItems = [...prevItems, item];
          console.log("Clicked items so far:", newItems);
          if (newItems.length === 4) {
            console.log("All items clicked. Enabling next button.");
            setNextEnabled(nextButtonRef);
          }
          return newItems;
        }
        return prevItems;
      });
    };

    return (
      <group>
        {/* Base Rotovap */}
        <RotoVap_NoAttachments position={[0, 5, 0]} scale={0.8} />

        {/* Clickable components – passing our onClick handler */}
        <BumpTrap
          ref={bumpTrapRef}
          position={[0, 5, -0.5]}
          scale={0.5}
          onClick={() => handleItemClick("bumpTrap")}
        />
        <KeckClip_BP
          ref={keckClipBPRef}
          position={[0, 5, -2.25]}
          scale={0.5}
          onClick={() => handleItemClick("keckClipBP")}
        />
        <RB_Flask_TA
          ref={rbFlaskTARef}
          position={[0, 5, -3]}
          scale={0.5}
          onClick={() => handleItemClick("rbFlask")}
        />
        <KeckClip_RB
          ref={keckClipRBRef}
          position={[0, 5, -3.5]}
          scale={0.5}
          onClick={() => handleItemClick("keckClipRB")}
        />
      </group>
    );
  }
);

export default Step10SetupRotovap;
