import React, { forwardRef } from "react";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";
import { WipingPaper } from "../models/WipingPaper";
import { Spectrophotometer } from "../models/Spectrophotometer";
import { Cuvette } from "../models/Cuvette";
import { CuvetteCap } from "../models/CuvetteCap";

const Step1Introduction = forwardRef((props, ref) => {
  return (
    <group>
      <Cuvette position={[0, 6, 0]} />
      <CuvetteCap position={[0, 6, 0]} />
      <WipingPaper position={[0, 6, 0]} />
      {/* <Spectrophotometer  position={[0, 6, 0]} /> */}
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <GlassPipette position={[0, 5.5, 0]} />
      {/* Additional elements specific to the first step can be added here */}
      <PipetteBulb position={[0, 8, 0]} />
    </group>
  );
});

export default Step1Introduction;
