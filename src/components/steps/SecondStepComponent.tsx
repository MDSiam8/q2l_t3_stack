import React, { useEffect, useRef } from "react";
import {Bottle} from "../Bottle";
import {BottleCap} from "../BottleCap";
const SecondStepComponent = ({ onReplayAnimation }) => {
  const bottleRef = useRef();
  const bottleCapRef = useRef();
  useEffect(() => {
    // You can perform any additional setup or logic here
  }, []);
  const handleSecondStepSpecificAction = () => {
    // Specific logic or animations for the second step
    // This could be interacting with the bottle or cap, or triggering an animation
  };
  useEffect(() => {
    if (onReplayAnimation) {
      onReplayAnimation(handleSecondStepSpecificAction);
    }
  }, [onReplayAnimation]);
  return (
    <group>
      {/* Bottle */}
      <Bottle ref={bottleRef} position={[0, 5, 0]} />
      {/* Bottle Cap */}
      <BottleCap ref={bottleCapRef} position={[0, 5.1, 0]} />
      {/* Additional elements specific to the second step can be added here */}
    </group>
  );
};
export default SecondStepComponent;