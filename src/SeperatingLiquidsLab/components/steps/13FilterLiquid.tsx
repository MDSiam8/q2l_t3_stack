import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap";
import { WaterBeakerWithPourAnimation } from "../BeakerWithWaterPourAnim";
import { SFunnelWithWaterFillAnimation } from "../seperating_funnel/SeperatingFunnelWithWaterPourAnim";
import { Stopper } from "../Stopper";
import { SFunnelWithDrainAnimation } from "../seperating_funnel/SeparatingFunnelDrainAnim";
import { BeakerFillWithWaterAnimation } from "../BeakerFillWithWater";
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { SFunnelPouringOrganicLayer } from "../seperating_funnel/SeparatingFunnelPouringOrganicLayer";
import { FunnelWithPourAnim } from "../Funnel";
import { Sphere } from "@react-three/drei";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step13Filter = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const flaskRef = useRef();

    // TODO: Create animation of beaker pouring into the funnel
    // TODO: Play animation of the funnel
    // TODO: Put beaker back.
       // NOTES:
       // Inside function to pour beaker into funnel, 
       // make the spheres disappear halfway thru the thing as well 
    useEffect(() => {
      if (flaskRef.current) {
        // Ensure the flask is referenced and mounted
        const flask = flaskRef.current;

        // GSAP Animation for the flask
        gsap
          .timeline()
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
          <SFunnelWithFillAnimation
            position={[0, 6, 0.1]}
            scale={1.75}
            rotation-y={-3.14 / 2}
            startAnimationDelay={-1}
          />
        </group>
        {/* <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} /> */}
        <FunnelWithPourAnim position={[2, 5.5, -2]} />
        <BeakerFillWithOrganicLayer position={[2, 5, -2]} />
        <group>
          <BeakerFillWithOrganicLayer
            position={[0, 5.0, -3.1]}
            rotation-y={3.14 / 2}
            startAnimationDelay={4}
          />
          <group visible={true}>
            <Sphere position={[0.1, 5.2, -3]} scale={0.03} />
            <Sphere position={[-0.12, 5.3, -3.2]} scale={0.03} />
            <Sphere position={[0.17, 5.1, -3.1]} scale={0.03} />
            <Sphere position={[0.1, 5.1, -3]} scale={0.03} />
            <Sphere position={[-0.15, 5.2, -3.2]} scale={0.03} />
            <Sphere position={[0, 5.1, -3.1]} scale={0.03} />
          </group>
        </group>
      </group>
    );
  },
);

export default Step13Filter;
