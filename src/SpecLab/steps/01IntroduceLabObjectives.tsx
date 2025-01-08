import React, { forwardRef, useState } from "react";
import { WipingPaper } from "../models/WipingPaper";
import { Cuvette } from "../models/Cuvette";
import { DistilledWater } from "../models/DistilledWater";
import { Spectrophotometer } from "../models/Spectrophotometer";
import { OrganicProductBeaker } from "~/RotaryEvaporation/components/BeakerWithSolution";

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
        <WipingPaper position={[0, 5, -0.5]}
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
      {selectedItems["Distilled Water"] && (
        <DistilledWater
          position={[0, 5, 1]}
        />
      )}
      {selectedItems["Sample Solution"] && (
        <OrganicProductBeaker
          position={[0, 5, 3]}
        />
      )}
    </group>
  );
});

export default Step1Introduction;