import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { RBFlaskWithPourAnimation } from "../RBFlaskWithFillAnim";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap";
import { WaterBeakerWithPourAnimation } from "../BeakerWithWaterPourAnim";
import { SFunnelWithWaterFillAnimation } from "../seperating_funnel/SeperatingFunnelWithWaterPourAnim";
import { Stopper } from "../Stopper";
import { Group, MeshNormalMaterial, Object3D } from "three";
import SFunnelWithDrainAnimation from "../seperating_funnel/SeparatingFunnelDrainAnim";
import { SFunnelVentingAirBeforeMixing } from "../seperating_funnel/SeperatingFunnelVentAirBeforeMixing";
import { Box } from "@react-three/drei";
import { SFunnelVentAfterMixing } from "../seperating_funnel/SeparatingFunnelVentAfterMixing";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

interface FunnelActions {
  startAnimation: () => void;
}

const Step6VentAirBeforeMixing = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const funnelRef = useRef<FunnelActions>(null);
    const funnelGroupRef = useRef<Group>(null);
    useEffect(() => {
      setNextDisabled(nextButtonRef);
    }, []);
    // useEffect(() => {
    //   const nextButtonTimer = setTimeout(() => {
    //     if (nextButtonRef && nextButtonRef.current) {
    //       setNextEnabled(nextButtonRef);
    //     }
    //   }, 3000);

    //   // Wait for user interaction or ensure the object is fully loaded/initialized
    //   return () => clearTimeout(nextButtonTimer);
    // }, [nextButtonRef]);

    useEffect(() => {}, [funnelRef]);
    const anim = gsap.timeline();
    const handleAnimation = () => {
      if (!funnelRef.current) return;
      funnelRef.current!.startAnimation();
      setNextEnabled(nextButtonRef);
    };

    return (
      <group>
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          {/* <mesh onClick={handleAnimation}>
            <Box position={[0, 7, 0]}>
              <meshStandardMaterial transparent opacity={0.0} />
            </Box>
          </mesh> */}
          <mesh onClick={handleAnimation}>
            <Box
              position={[-1.3, 8.76, 1.8]}
              scale={[0.5, 0.5, 0.5]}
              rotation-x={(-20 * 3.14) / 180}
              renderOrder={2}
            >
              <meshStandardMaterial color={"black"} transparent opacity={0.0} />
            </Box>
          </mesh>
          <group
            ref={funnelGroupRef}
            position={[0, 7, 0.5]}
            rotation-z={(20 * 3.14) / 180}
            //   rotation-y={(-90 * 3.14) / 180}
          >
            <SFunnelVentAfterMixing
              ref={funnelRef}
              scale={1.75}
              rotation-x={(-30 * Math.PI) / 180}
              // rotation-z={(90 * Math.PI) / 180}
              //   rotation-y={(90 * Math.PI) / 180}
              startAnimationDelay={-1}
              occlude
            />
          </group>
          <group ref={funnelGroupRef} position={[0, 8, -0.5]}>
            {/* <SFunnelVentAfterMixing
            ref={funnelRef}
            scale={1.75}
            rotation-x={(90 * Math.PI) / 180}
            rotation-z={(50 * Math.PI) / 180}
            rotation-y={(90 * Math.PI) / 180}
            startAnimationDelay={-1}
          /> */}
          </group>
        </group>
      </group>
    );
  },
);

export default Step6VentAirBeforeMixing;
