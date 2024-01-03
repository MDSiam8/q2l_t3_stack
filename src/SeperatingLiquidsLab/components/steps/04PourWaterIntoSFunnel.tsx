import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap"
import { WaterBeakerWithPourAnimation } from "../BeakerWithWaterPourAnim";
import { SFunnelWithWaterFillAnimation } from "../seperating_funnel/SeperatingFunnelWithWaterPourAnim";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step4PourWaterToSeperatingFunnel = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
    const flaskRef = useRef();

    // TODO: FIX THE ANIMATION!!!
    useEffect(() => {
      if (flaskRef.current) {
        // Ensure the flask is referenced and mounted
        const flask = flaskRef.current;
  
        // GSAP Animation for the flask
        // gsap.timeline()
        //   .to(flask.position, { y: "+=2", duration: 1 })
        //   .to(flask.position, { x: "-=2", duration: 1 })
        //   .to(flask.position, { delay: 2, x: "+=2", y: "-=2", duration: 1 });
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
          <SFunnelWithWaterFillAnimation position={[0, 6, .1]} scale={1.75} rotation-y={-3.14/2} startAnimationDelay={4}/>
        </group>
        <WaterBeakerWithPourAnimation ref={flaskRef} position={[-1,5,2.5]} startAnimationDelay={0} />
      </group>
    );
  });
  
  export default Step4PourWaterToSeperatingFunnel;