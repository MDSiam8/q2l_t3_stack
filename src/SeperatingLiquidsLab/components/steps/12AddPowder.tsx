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
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { SFunnelPouringOrganicLayer } from "../seperating_funnel/SeparatingFunnelPouringOrganicLayer";
import { Spatula } from "~/AnalyticalBalanceLab/components/Spatula";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step12AddPowder = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
    const flaskRef = useRef();

    // TODO: Create animation for spatula picking up powder, and playing swirling animation
    // TODO: Create function such that powder in beaker becomes bigger for the first 2 scoops, 
    //       then it breaks up on the 3rd scoop
    // TODO: Next button to be enabled after 3rd scoop
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
          <SFunnelPouringOrganicLayer position={[0, 6, .1]} scale={1.75} rotation-y={-3.14/2} startAnimationDelay={4}/>
        </group>
        {/* <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} /> */}
        <BeakerFillWithOrganicLayer position={[0,5.0,-3.1]} rotation-y={3.14/2} startAnimationDelay={4} />
        <Spatula position={[2, 5, 0]} rotation-y={3.14/2} scale={.8} />
      </group>
    );
  });
  
  export default Step12AddPowder;