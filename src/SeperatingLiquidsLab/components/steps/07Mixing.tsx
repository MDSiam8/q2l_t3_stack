import React, { useEffect, forwardRef, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { SeperatingFunnelMix } from "../seperating_funnel/SeperatingFunnelMix";
import gsap from "gsap";
import * as THREE from "three";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step7Mix = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const funnelGroupRef = useRef<THREE.Group>(null);

    useEffect(() => {
      const animationTimer = setTimeout(() => {
        if (funnelGroupRef.current) {
          const funnelGroup = funnelGroupRef.current;

          // GSAP Animation for the funnel
          gsap.timeline()
            .to(funnelGroup.position, { y: "+=0", duration: 1 })

          // Starting the animation for the vent after the funnel animation
          gsap.to(funnelGroup.rotation, { x: 0, duration: 1, delay: 2 });
        }

        // Enable the next button after the animation sequence
        const nextButtonTimer = setTimeout(() => {
          if (nextButtonRef && nextButtonRef.current) {
            setNextEnabled(nextButtonRef);
          }
        }, 0); // Adjusted for the animation duration

        return () => clearTimeout(nextButtonTimer);
      }, 500);

      return () => clearTimeout(animationTimer);
    }, [nextButtonRef]);

    return (
      <group>
        <group rotation-y={Math.PI}>
          <SeparatingFunnelHolder position={[0, 5, 0]}>
            <group ref={funnelGroupRef}>
              <SeperatingFunnelMix
                position={[0.2, 5, 0.1]}
                scale={1.75}
                rotation-y={4.7}
                rotation-x={0}
                rotation-z={0}
                startAnimationDelay={3} // Start after 3 seconds
              />
            </group>
          </SeparatingFunnelHolder>
        </group>
      </group>
    );
  },
);

export default Step7Mix;
