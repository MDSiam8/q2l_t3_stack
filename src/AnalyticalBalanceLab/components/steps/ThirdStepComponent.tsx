import React, { forwardRef } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Beaker } from "../Beaker";
import { Spatula } from "../Spatula";
import { BottleCap } from "../BottleCap";
import { Bottle } from "../Bottle";

interface SelectedItems {
  [itemName: string]: boolean;
}

interface ThirdStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}

const ThirdStepComponent = forwardRef<HTMLDivElement, ThirdStepProps>(
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
  }
);

export default ThirdStepComponent;
