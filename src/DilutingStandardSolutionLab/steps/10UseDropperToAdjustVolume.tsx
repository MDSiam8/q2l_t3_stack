import React, { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { Group } from "three"; // Import Group from Three.js
import BeakerWaterFill from "../models/BeakerWaterFill";
import { GlassDropper } from "../models/GlassDropper";

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

    // Click handler for animation
    const handleClick = () => {
      if (dropperRef.current) {
        const tl = gsap.timeline();

        // Animate hovering above the beaker
        tl.to(dropperRef.current.position, {
          x: 0,
          y: 6,
          z: 2,
          duration: 1.5,
        }).to(
          dropperRef.current.rotation,
          {
            x: -Math.PI / 4,
            y: 0,
            z: 0,
            duration: 1,
          },
          "<"
        );
      } else {
        console.warn("dropperRef.current is null");
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

        {/* Beaker with water */}
        <BeakerWaterFill position={[0, 5, 2]} />
      </group>
    );
  }
);

export default Step10UseDropperToAdjustVolume;
