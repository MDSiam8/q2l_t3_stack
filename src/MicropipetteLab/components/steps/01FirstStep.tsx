import { forwardRef } from "react";
import { Pipette } from "../PipetteModel";
import { TipBox } from "../TipBox";

const Step1 = forwardRef((props, ref) => {
  return (
    <group>
        <Pipette position={[1,1,1]}/>
        <TipBox />
    </group>
  );
});

export default Step1;
