import React, { useEffect, forwardRef, useState, useRef } from "react";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import gsap from "gsap";
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { SFunnelPouringOrganicLayer } from "../seperating_funnel/SeparatingFunnelPouringOrganicLayer";
import { Group } from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

interface Actions extends THREE.Object3D {
  startAnimation: () => void;
}

const Step11PourOrganicLayer = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const funnelRef = useRef<Actions>(null); // Ref for the SFunnelPouringOrganicLayer
    const funnelGroupRef = useRef<Group>(null); // Ref for the SFunnelPouringOrganicLayer
    const beakerRef = useRef<Actions>(null); // Ref for the SFunnelPouringOrganicLayer
    useEffect(() => {
      setNextDisabled(nextButtonRef);
    }, []);
    // Function to animate the SFunnelPouringOrganicLayer
    const animateFunnel = () => {
      // setStartAnimationDelay(2);
      if (funnelGroupRef.current) {
        gsap
          .timeline()
          .to(funnelGroupRef.current.position, { y: "+=1", duration: 0.7 }) // Move up
          .to(funnelGroupRef.current.position, {
            z: "+=3.7",
            y: "-=1.7",
            duration: 0.7,
            onComplete: () => {
              funnelRef.current!.startAnimation();
            }
          })
          .to(funnelGroupRef.current, {
            duration: 1.8,
            onComplete: () => {
              beakerRef.current!.startAnimation();
              setNextEnabled(nextButtonRef);
            },
          }); // Move to the right
      }
    };
    return (
      <group>
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          <group ref={funnelGroupRef}>
            <SFunnelPouringOrganicLayer
              ref={funnelRef}
              position={[0, 6, 0.1]}
              scale={1.75}
              rotation-y={-3.14 / 2}
              startAnimationDelay={9999}
              onClick={() => {
                animateFunnel();
              }} // Add the onClick handler here
            />
          </group>
        </group>
        {/* <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} /> */}
        <BeakerFillWithOrganicLayer
          position={[0, 5.0, -3.1]}
          ref={beakerRef}
          rotation-y={3.14 / 2}
          startAnimationDelay={9999}
        />
      </group>
    );
  },
);

export default Step11PourOrganicLayer;
