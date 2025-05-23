import React, { forwardRef, useState } from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";
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

interface ThirdStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}


const Step3SelectApparatus = forwardRef<HTMLDivElement, ThirdStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {

  return (
    <group>
      {selectedItems["Analytical Balance"] && (
        <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
      )}
      {selectedItems["Weighing Paper"] && (
        <WeighingPaper
          folded={false}
          rotation-y={(3.14 / 180) * 180}
          position={[0, 5, -3]}
        />
      )}
      {selectedItems["Beaker"] && (
        <Beaker rotation-y={(-3.14 / 180) * 90} position={[2.6, 4.9, -3]} />
      )}
      {selectedItems["Spatula"] && (
        <Spatula
          rotation-y={(3.14 / 180) * 90}
          scale={0.5}
          position={[2.5, 5, 0]}
        />
      )}
      {selectedItems["Powder Sample"] && (
        <group>
          <BottleCap position={[2, 5.1, -2]} />
          <Bottle position={[2, 5, -2]} />
        </group>
      )}
    </group>
  );
});

export default Step3SelectApparatus;