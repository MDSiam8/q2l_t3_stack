import React, { useRef, forwardRef, useEffect } from "react";
import gsap from "gsap";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { Group, Object3D } from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step3PourToSeperatingFunnel = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
  const flaskRef = useRef<Group>(null);

  useEffect(() => {
    // useEffect(() => {
    setNextDisabled(nextButtonRef);
    // }, [])
    if (flaskRef.current) {
      const timeline = gsap.timeline({ delay: 1 }); // Delay of 1 second before the animation starts
      timeline
        .to(flaskRef.current.position, { y: "+=5.5", duration: 1 }) // Move up
        .to(flaskRef.current.position, { x: "+=.2", z: "-=2.6", duration: 1 }) // Move right
        .to(flaskRef.current.position, { duration: 4.5 }) // Move right
        .to(flaskRef.current.position, {
          x: "-=.2",
          z: "+=2.6",
          y: "-=5.5",
          duration: 1,
          onComplete: () => {
            setNextEnabled(nextButtonRef);
          },
        }); // Move back
    }
  }, []);

  return (
    <group>
      <group rotation-y={3.14}>
        <group position={[0, 5, 0]} scale={[1, 1.4, 1]}>
          <SeparatingFunnelHolder />
        </group>
        <SFunnelWithFillAnimation
          position={[0, 6.9, 0.17]}
          scale={[2.43, 2, 2.43]}
          rotation-y={-3.14 / 2}
          startAnimationDelay={4}
        />
      </group>
      <group ref={flaskRef}>
        <RBFlaskWithPourAnimation
          position={[-1, 5, 2.5]}
          startAnimationDelay={4}
        />
      </group>
    </group>
  );
});

export default Step3PourToSeperatingFunnel;
