import React, { useEffect, useRef } from "react";
import {Bottle} from "../Bottle";
import {BottleCap} from "../BottleCap";
const SecondStepComponent = () => {
  const bottleRef = useRef();
  const bottleCapRef = useRef();
  return (
    <group>
      {/* Bottle */}
      <Bottle ref={bottleRef} position={[0, 5, 0]} />
      {/* Bottle Cap */}
      <BottleCap ref={bottleCapRef} position={[0, 5.1, 0]} />
    </group>
  );
};
export default SecondStepComponent;