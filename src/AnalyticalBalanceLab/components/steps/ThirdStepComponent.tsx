import React, { forwardRef } from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Beaker } from "../Beaker";
import { Spatula } from "../Spatula";
import { BottleCap } from "../BottleCap";
import { Bottle } from "../Bottle";
import { StepComponentProps } from "../Experience";

const ThirdStepComponent = forwardRef<HTMLDivElement, StepComponentProps>(
  ({ selectedItems = {} }) => {
    return (
      <group>
        {selectedItems["Analytical Balance"] && (
          <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
        )}
        {selectedItems["Weighing Paper"] && (
          <WeighingPaper
            folded={false}
            rotation-y={Math.PI}
            position={[0, 5, -3]}
          />
        )}
        {selectedItems["Beaker"] && (
          <Beaker rotation-y={-Math.PI / 2} position={[2.6, 4.9, -3]} />
        )}
        {selectedItems["Spatula"] && (
          <Spatula
            rotation-y={Math.PI / 2}
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
