import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { BeakerModel } from "~/Models/BeakerModel";
import { MicropipetteP2Model } from "~/Models/MicropipetteP2";

const CustomStepSample = () => {
  return (
    <group>
      <MicropipetteP2Model
        startingPosition={[0, 2, 0]}
        opacity={0.6}
        rotation={[0, 0, 0]}
        scale={5}
      />
      <BeakerModel
        opacity={1}
        startingPosition={[0, 0, 0]}
        scale={4}
        rotation={[0, 0, 0]}
      />
      {/* Additional elements specific to the custom step can be added here */}
    </group>
  );
};
export default CustomStepSample;
