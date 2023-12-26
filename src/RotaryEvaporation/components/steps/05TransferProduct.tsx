// Parent Component
import React, { useState, forwardRef, useEffect } from "react";
import { OrganicProductBeakerWithPourAnimation } from "../BeakerWithPouringAnim";
import { RotavapWithHeatBathAnim } from "../rotavap/RotavapWithHeatOnAnim";
import { HundredMLFlaskWithFillAnimation } from "../round-bottom-flasks/RBFlaskWithFillAnim";
// Import the components used within this parent component

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step5TransferProducts = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }) => {
    const [startFlaskAnimation, setStartFlaskAnimation] = useState(9999);

    // Function to be called when the beaker is clicked
    const onBeakerClick = () => {
      // Start the beaker animation here if it's controlled within this component
      console.log("harrrrrr i have clicked beaker");
      setStartFlaskAnimation(1.95);
      // Set a timeout to start the flask animation after 2 seconds
      // setTimeout(() => {
      //   setStartFlaskAnimation(true);
      // }, 3400); // Delay of 2 seconds
    };

    return (
      <group>
        <RotavapWithHeatBathAnim position={[0, 5, 0]} scale={0.8} />
        <HundredMLFlaskWithFillAnimation startAnimationDelay={startFlaskAnimation} position={[2.2, 5, .4]} />
        <OrganicProductBeakerWithPourAnimation onClick={onBeakerClick} position={[0, 5, -2.2]} rotation-y={3.14 / 180 * 180} />
      </group>
    );
  }
);

export default Step5TransferProducts;
