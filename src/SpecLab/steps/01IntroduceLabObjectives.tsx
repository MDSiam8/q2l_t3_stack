import React, { forwardRef, useState } from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";
import InventorySystem from "../ui_overlay/InventorySystem";
import WeighingPaper from "../models/WeighingPaper";
import { WipingPaper } from "../models/WipingPaper";
import { Cuvette } from "../models/Cuvette";

import { Beaker } from "../models/Beaker";
import { Spatula } from "../models/Spatula";
import { Spectrophotometer } from "../models/Spectrophotometer";
import { BottleCap } from "../models/BottleCap";
import { Bottle } from "../models/Bottle";
import { useGLTF } from "@react-three/drei";
import { setNextEnabled } from "../Experience";
interface SelectedItems {
  [itemName: string]: boolean;
}

interface InventoryStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}


const Step1Introduction = forwardRef<HTMLDivElement, InventoryStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {

  return (
    <group>
      {selectedItems["Wiping Paper"] && (
        <WipingPaper position={[0, 5, 0]}
          rotation-x={(-3.14 / 180) * 270}
          rotation-y={(-3.14 / 180) * 270}
        />
      )}
      {selectedItems["Spectrophotometer"] && (
        <Spectrophotometer
          position={[0, 5, -3]}
        />
      )}
      {selectedItems["Cuvette"] && (
        <Cuvette
          position={[0, 5, 2]}
        />
      )}
    </group>
  );
});

export default Step1Introduction;