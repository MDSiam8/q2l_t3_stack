import React, { useRef, forwardRef, useEffect } from "react";
import gsap from "gsap";
import { GlassPipette } from "../models/GlassPipette";
import { PipetteBulb } from "../models/PipetteBulb";
import { StepComponentProps } from "../Experience";
import { Group } from "three";

const Step6AttachPipetteFiller = forwardRef<Group, StepComponentProps>(
  ({ setNextDisabled }, ref) => {
    const bulbRef = useRef<Group>(null);

    useEffect(() => {
      setNextDisabled(true);
      if (bulbRef.current) {
        const timeline = gsap.timeline({ delay: 1 });
        timeline
        .to(bulbRef.current.position, { y: "+=4.5", z: "-=2.7", duration: 2 })
        .to(bulbRef.current.position, {
          y: "-=2.0",
          duration: 1,
          onComplete: () => {
            setNextDisabled(false);
          },
        });
      }
    }, []);

    return (
      <group>
        <GlassPipette position={[0, 4.96, 0]} />
        <group ref={bulbRef}>
          <PipetteBulb position={[0, 5, 2.7]} />
        </group>
      </group>
    );
  }
);

export default Step6AttachPipetteFiller;
