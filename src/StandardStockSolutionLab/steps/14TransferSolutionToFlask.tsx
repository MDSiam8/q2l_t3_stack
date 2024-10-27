import React, { useState, useEffect, forwardRef } from "react";
import { OrganicProductBeakerWithPourAnimation } from "../models/BeakerWithPourAnimation";
import { GlassRod } from "../models/GlassRod";
import { DistilledWater } from "../models/DistilledWater";
import { HundredMLFlaskWithFillAnimation } from "../models/HundredMLFlaskWithFillAnimation";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step14Props {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step14TransferSolution = forwardRef<THREE.Group, Step14Props>(
  ({ nextButtonRef }, ref) => {
    const [startFlaskAnimation, setStartFlaskAnimation] = useState(9999);

    useEffect(() => {
      if (nextButtonRef && nextButtonRef.current) {
        setNextDisabled(nextButtonRef);
      }
    }, [nextButtonRef]);

    const onBeakerClick = () => {
      setStartFlaskAnimation(1.95);

      setTimeout(() => {
        setNextEnabled(nextButtonRef);
      }, 5000);
    };

    return (
      <group ref={ref}>
        <OrganicProductBeakerWithPourAnimation
          position={[0, 5.1, 0.5]}
          onClick={onBeakerClick}
        />

        <GlassRod position={[0, 5.1, -1]} />
        <DistilledWater position={[0, 5.5, 2.5]} />

        <HundredMLFlaskWithFillAnimation
          startAnimationDelay={startFlaskAnimation}
          position={[0, 5.0, 0]}
          scale={0.8}
        />
      </group>
    );
  }
);

export default Step14TransferSolution;
