import React, { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { Group } from "three";
import { GlassDropper } from "../models/GlassDropper";
import { FillToLine } from "../models/FillToLine"; // Import updated FillToLine

interface SelectedItems {
  [itemName: string]: boolean;
}

interface TenStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}

const Step10UseDropperToAdjustVolume = forwardRef<HTMLDivElement, TenStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {
    const dropperRef = useRef<Group>(null);
    const fillToLineRef = useRef<any>(null);

    // Click handler for animation
    const handleClick = () => {
      if (dropperRef.current && fillToLineRef.current) {
        const tl = gsap.timeline();

        // Animate dropper hovering above the beaker
        tl.to(dropperRef.current.position, {
          x: 0,
          y: 6,
          z: 2,
          duration: 1.5,
        })
          .to(
            dropperRef.current.rotation,
            {
              x: -Math.PI / 4,
              y: 0,
              z: 0,
              duration: 1,
            },
            "<"
          )
          .add(() => {
            console.log("Playing FillToLine animation...");
            fillToLineRef.current?.play();
          });
      } else {
        console.warn("dropperRef or fillToLineRef is null");
      }
    };

    return (
      <group>
        {/* GlassDropper with animation */}
        <group
          ref={dropperRef}
          position={[0, 5, 0]}
          rotation={[0, 0, 0]}
          onClick={handleClick}
        >
          <GlassDropper />
        </group>

        {/* FillToLine element */}
        <FillToLine ref={fillToLineRef} position={[0, 5, 2]} />
      </group>
    );
  }
);

export default Step10UseDropperToAdjustVolume;
