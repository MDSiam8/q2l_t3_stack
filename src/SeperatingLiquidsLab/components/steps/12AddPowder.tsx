import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap"
import { WaterBeakerWithPourAnimation } from "../BeakerWithWaterPourAnim";
import { SFunnelWithWaterFillAnimation } from "../seperating_funnel/SeperatingFunnelWithWaterPourAnim";
import { SFunnelWithDrainAnimation } from "../seperating_funnel/SeparatingFunnelDrainAnim";
import { BeakerFillWithWaterAnimation } from "../BeakerFillWithWater";
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { SFunnelPouringOrganicLayer } from "../seperating_funnel/SeparatingFunnelPouringOrganicLayer";
import { Spatula } from "~/AnalyticalBalanceLab/components/Spatula";
import { AMSBottleCap } from "../AMSBottleCap";
import { AMSBottle } from "../AMSBottle";
import { Sphere } from "@react-three/drei";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step12AddPowder = forwardRef<
  HTMLDivElement,
  Step2LabTasksProps
>(({ nextButtonRef }, ref) => {
    const flaskRef = useRef();

    // TODO: Create animation for bottle cap opening and spatula going inside
    // TODO: Create animation for spatula picking up powder, and playing swirling animation
    // TODO: Create function such that powder in beaker becomes bigger for the first 2 scoops, 
    //       then it breaks up on the 3rd scoop
    // TODO: Next button to be enabled after 3rd scoop

    return (
      <group>
        
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          <SFunnelPouringOrganicLayer position={[0, 6, .1]} scale={1.75} rotation-y={-3.14/2} startAnimationDelay={999}/>

        </group>
        {/* <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} /> */}
        <BeakerFillWithOrganicLayer position={[0,5.0,-3.1]} rotation-y={3.14/2} isFilled={true} startAnimationDelay={-1} />
        <Spatula position={[2, 5, 0]} rotation-y={3.14/2} scale={.8} />
        <AMSBottleCap position={[2, 5, -2]} rotation-y={3.14/2} />
        <AMSBottle position={[2, 5, -2]} rotation-y={3.14/2} />
        <group visible={true}>
            <Sphere position={[.1,5.2,-3]} scale={.03}/>
            <Sphere position={[-.12,5.3,-3.2]} scale={.03}/>
            <Sphere position={[.17,5.1,-3.1]} scale={.03}/>
            <Sphere position={[.1,5.1,-3.]} scale={.03}/>
            <Sphere position={[-.15,5.2,-3.2]} scale={.03}/>
            <Sphere position={[0,5.1,-3.1]} scale={.03}/>
        </group>
      </group>
    );
  });
  
  export default Step12AddPowder;