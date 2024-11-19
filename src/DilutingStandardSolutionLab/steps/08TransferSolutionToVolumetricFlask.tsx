import React, { forwardRef, useRef } from "react";
import { gsap } from "gsap";
import { Group } from "three"; // Import Group from Three.js
import BalanceWithAnimations from "../models/BalanceWithAnimations";
import GlassPipette from "../models/GlassPipette";
import BeakerWaterFill from "../models/BeakerWaterFill";
import InventorySystem from "../ui_overlay/InventorySystem";
import WeighingPaper from "../models/WeighingPaper";
import { Beaker } from "../models/Beaker";
import { Spatula } from "../models/Spatula";
import { BottleCap } from "../models/BottleCap";
import { Bottle } from "../models/Bottle";
import { useGLTF } from "@react-three/drei";
import { setNextEnabled } from "../Experience";

interface SelectedItems {
  [itemName: string]: boolean;
}

interface EigthStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}

const Step8TransferToFlask = forwardRef<HTMLDivElement, EigthStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {
    // Properly type the ref to THREE.Group
    const pipetteRef = useRef<Group>(null);

    // Handle the click event
    const handleClick = () => {
      if (pipetteRef.current) {
        const tl = gsap.timeline();
        tl.to(pipetteRef.current.position, {
          x: 0,
          y: 8.5,
          z: 0,
          duration: 3,
        }).to(
          pipetteRef.current.rotation,
          {
            x: Math.PI / 4, // Rotate -45 degrees over the X-axis
            y: Math.PI / 2,
            duration: 3,
          },
          "<" // Start at the same time as the previous animation
        );
      } else {
        console.warn("pipetteRef.current is null");
      }
    };

    return (
      <group>
        {/* Wrap the GlassPipette in a group to apply ref and position */}
        <group
          ref={pipetteRef}
          position={[1.5, 5, 0]}
          rotation = {[0, 0, 1.58]}
          onClick={handleClick}
        >
          <GlassPipette />
        </group>
        <BeakerWaterFill position={[0, 5, 2]} />
      </group>
    );
  }
);

export default Step8TransferToFlask;
