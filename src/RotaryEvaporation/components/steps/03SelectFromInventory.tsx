import React, { forwardRef, useState } from "react";
import InventorySystem from "../InventorySystem";
import { setNextEnabled } from "../Experience";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
interface SelectedItems {
  [itemName: string]: boolean;
}
const requiredItems = new Set(["Rotary Evaporator", "Round-bottomed Flask", "Keck Clips", "Bump Trap", "Product Solution"]);

const Step3InventorySelection = forwardRef<HTMLDivElement, {nextButtonRef: React.RefObject<HTMLButtonElement>}>(({ nextButtonRef }, ref) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

  const handleItemSelection = (itemName: string) => {
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev, [itemName]: !prev[itemName] };

      // Check if all required items are selected
      const allSelected = Array.from(requiredItems).every(item => newSelectedItems[item]);
      
      console.log("AllSelected is " + allSelected);
      if (allSelected && nextButtonRef.current) {
        // nextButtonRef.current.disabled = false; // Enable the next 
        setNextEnabled(nextButtonRef);
      }
      console.log(newSelectedItems);
      return newSelectedItems;
    });
  };

  return (
    <group>
      <InventorySystem
        onItemSelect={handleItemSelection}
        position={[0, 7.7, 0]}
        scale={0.6}
      />
      {selectedItems["Rotary Evaporator"] && (
        <RotavapWithHeatBathAnim position={[0, 5, 0]} />
      )}
      
    </group>
  );
});

export default Step3InventorySelection;