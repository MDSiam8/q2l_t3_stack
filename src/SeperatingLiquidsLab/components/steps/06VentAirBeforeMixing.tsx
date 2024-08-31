import React, { useEffect, forwardRef, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { SeperatingFunnelVentAirBeforeMixing } from "../seperating_funnel/SeperatingFunnelVentAirBeforeMixing";
import gsap from "gsap";
import * as THREE from "three";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step6VentAir = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const funnelGroupRef = useRef<THREE.Group>(null);

    useEffect(() => {
      const animationTimer = setTimeout(() => {
        if (funnelGroupRef.current) {
          const funnelGroup = funnelGroupRef.current;

          // GSAP Animation for the funnel
          gsap.timeline()
            .to(funnelGroup.position, { y: "+=8", duration: 1 })

          // Starting the animation for the vent after the funnel animation
          gsap.to(funnelGroup.rotation, { x: 2.9, duration: 1, delay: 2 });
        }

        // Enable the next button after the animation sequence
        const nextButtonTimer = setTimeout(() => {
          if (nextButtonRef && nextButtonRef.current) {
            setNextEnabled(nextButtonRef);
          }
        }, 3500); // Adjusted for the animation duration

        return () => clearTimeout(nextButtonTimer);
      }, 1000);

      return () => clearTimeout(animationTimer);
    }, [nextButtonRef]);

    return (
      <group>
        <group rotation-y={Math.PI}>
          <SeparatingFunnelHolder position={[0, 5, 0]}>
            <group ref={funnelGroupRef}>
              <SeperatingFunnelVentAirBeforeMixing
                position={[0.2, 3, 0.8]}
                scale={1.75}
                rotation-y={5}
                rotation-x={0}
                rotation-z={2.4}
                startAnimationDelay={3} // Start after 3 seconds
              />
            </group>
          </SeparatingFunnelHolder>
        </group>
      </group>
    );
  },
);

export default Step6VentAir;
