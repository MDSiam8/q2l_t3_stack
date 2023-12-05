import React, { forwardRef, useState } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import InventorySystem from "../InventorySystem";
import WeighingPaper from "../WeighingPaper";
import { Beaker } from "../Beaker";
import { Spatula } from "../Spatula";
import { BottleCap } from "../BottleCap";
import { Bottle } from "../Bottle";
import { useGLTF } from "@react-three/drei";
interface SelectedItems {
  [itemName: string]: boolean;
}

const ThirdStepComponent = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const handleItemSelection = (itemName: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };
  return (
    <group>
      <InventorySystem
        onItemSelect={handleItemSelection}
        position={[0, 7.7, 0]}
        scale={0.6}
      />
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

export default ThirdStepComponent;