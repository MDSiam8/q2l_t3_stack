import React, { forwardRef, useState } from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";
import InventorySystem from "../ui_overlay/InventorySystem";
import { Beaker } from "../models/Beaker";
import { GlassPipette } from "../models/GlassPipette";
import { GlassDropper } from "../models/GlassDropper";
import { Stopper } from "../models/Stopper";
import { DistilledWater } from "../models/DistilledWater";
import { useGLTF } from "@react-three/drei";
import { setNextEnabled } from "../Experience";
interface SelectedItems {
  [itemName: string]: boolean;
}
interface SecondStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}
const Step2SelectApparatus = forwardRef<HTMLDivElement, SecondStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {
  return (
    <group>
      {selectedItems["Beaker"] && (
        <Beaker
          rotation-y={(-3.14 / 180) * 90}
          position={[2.5, 4.9, -3]} 
        />
      )}
      {selectedItems["Glass Pipette"] && (
        <GlassPipette
          scale={0.5}
          rotation-x={(-3.14 / 180) * 90}
          rotation-y={(-3.14 / 180) * 270}
          rotation-z={0}
          position={[1.5, 5.05, 4]}
        />
      )}
      {selectedItems["Glass Dropper"] && (
        <GlassDropper
          scale={0.5}
          rotation-x={(-3.14 / 180) * 90}
          rotation-y={0}
          rotation-z={0}
          position={[2, 5, 3]}
        />
      )}
      {selectedItems["Stopper"] && (
        <Stopper
          scale={0.5}
          position={[2, 4.95, 1]}
        />
      )}
      {selectedItems["Distilled Water"] && (
        <group>
          <DistilledWater
            position={[2, 5.1, -2]}
            rotation-y={(-3.14 / 180) * 90}
          />
        </group>
      )}
    </group>
  );
});
export default Step2SelectApparatus;