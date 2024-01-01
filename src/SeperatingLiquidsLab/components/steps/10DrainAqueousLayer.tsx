import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap"
import { WaterBeakerWithPourAnimation } from "../BeakerWithWaterPourAnim";
import { SFunnelWithWaterFillAnimation } from "../seperating_funnel/SeperatingFunnelWithWaterPourAnim";
import { Stopper } from "../Stopper";
import { SFunnelWithDrainAnimation } from "../seperating_funnel/SeparatingFunnelDrainAnim";
import { BeakerFillWithWaterAnimation } from "../BeakerFillWithWater";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step10DrainSFunnel = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
    const flaskRef = useRef();

    // TODO: Remove stopper animation.
    // TODO: Then play animation for the Sep. Funnel draining
    // TODO: at the same time, play animaton for beaker filling with water
    useEffect(() => {
      if (flaskRef.current) {
        // Ensure the flask is referenced and mounted
        const flask = flaskRef.current;
  
        // GSAP Animation for the flask
        gsap.timeline()
          .to(flask.position, { y: "+=2", duration: 1 })
          .to(flask.position, { x: "-=2", duration: 1 })
          .to(flask.position, { delay: 2, x: "+=2", y: "-=2", duration: 1 });
      }
  
      // Enable the next button after 3 seconds
      const nextButtonTimer = setTimeout(() => {
        if (nextButtonRef && nextButtonRef.current) {
          setNextEnabled(nextButtonRef);
        }
      }, 3000);
  
      return () => clearTimeout(nextButtonTimer);
    }, [nextButtonRef]);
  
    return (
      <group>
        
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          <SFunnelWithDrainAnimation position={[0, 6, .1]} scale={1.75} rotation-y={-3.14/2} startAnimationDelay={4}/>
        </group>
        <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} />
        <BeakerFillWithWaterAnimation position={[0,5.2,-0.1]} rotation-y={3.14/2} startAnimationDelay={4} />
      </group>
    );
  });
  
  export default Step10DrainSFunnel;