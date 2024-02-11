import { forwardRef } from "react";
import { Pipette } from "../PipetteModel";
import { TipBox } from "../TipBox";
import { Beaker } from "../Beaker";
import { PipetteStand } from "../PipetteStand";
import { Cuvette } from "../Cuvette";
import { Distilled } from "../Distilled";
import { Dropper } from "../Dropper";
import { Petri } from "../Petri";
import { Spatula } from "../Spatula";
import { Spreader } from "../Spreader";
import { Volumetric } from "../Volumetric";
import { Vortexer } from "../Vortexer";
import { Centrifuge } from "../Centrifuge";

const Step1 = forwardRef((props, ref) => {
  return (
    <group>
        {/* <Pipette position = {[0,0,0]} />
        <TipBox />
        <Beaker />
        <PipetteStand /> */}
        {/* <Cuvette />
        <Distilled /> */}
        {/* <Dropper />
        <Petri />
        <Spatula />
        <Spreader />
        <Volumetric /> */}
{/* comments: i think the volumetric origin is messed up, can't find dropper  */}
        <Vortexer position = {[0,0,0]}/>
        <Centrifuge />
        <Volumetric />
        {/* 
        Comments:
        Can't find dropper at all
        Volumetric doesn't spawn on base
        Vortexer doesn't spawn on base
        */}
    </group>
  );
});

export default Step1;
