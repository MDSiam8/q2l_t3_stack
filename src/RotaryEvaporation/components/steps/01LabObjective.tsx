import { forwardRef } from "react";
import {RotavapWithHeatBathAnim}  from "../rotavap/RotavapWithHeatOnAnim";

import { RotavapWithFlaskAnim } from "../rotavap/RotavapWithFlaskAnim";

const Step1LabObjectives = forwardRef((props, ref) => {
  return (
    <group>
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <RotavapWithFlaskAnim
        position={[0, 5, 0]}
        scale={0.8}
      />     
       {/* Additional elements specific to the first step can be added here */}
    </group>
  );
});

export default Step1LabObjectives;
