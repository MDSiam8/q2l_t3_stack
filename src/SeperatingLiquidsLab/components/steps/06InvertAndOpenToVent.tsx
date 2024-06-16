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
import { SFunnelVentingAirBeforeMixing } from "../seperating_funnel/SeperatingFunnelVentAirBeforeMixing";
import { Box } from "@react-three/drei";
import Arrow from "../Arrow";

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
    }, [])
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
      if (!funnelGroupRef.current) return;

      // anim
      //   .to(funnelGroupRef.current.position, {
      //     y: "+=0.3", // Relative adjustment
      //     x: "-=1.5", // Relative adjustment
      //     z: "+= 1",
      //     duration: 0.5,
      //   })
      //   .to(funnelGroupRef.current.rotation, {
      //     y: "+=" + (Math.PI * 160) / 180, // 180 degrees in radians
      //     z: "-=" + Math.PI * (120 / 180), // 160 degrees in radians
      //     duration: 1,
      //   })
      // .call(() => {
      funnelRef.current!.startAnimation();
      setNextEnabled(nextButtonRef);
      // });
    };

    return (
      <group>
        <group rotation-y={3.14}>
          <group position={[0, 5, 0]} scale={[1, 1.4, 1]}>
              <SeparatingFunnelHolder />
          </group>

          <mesh onClick={handleAnimation}>
            <Box
              position={[-1, 8.5, 1.8]}
              scale={[.5, .5, .5]}
              rotation-x={(-20 * 3.14) / 180}
              renderOrder={2}
            >
              <meshStandardMaterial color={"black"} transparent opacity={0.0} />
            </Box>
          </mesh>
          <group scale={0.4} position={[-1,8,1.65]}>

          <Arrow pointingDirection="up" position={[0,0,0.8]} />
          </group>
          <group
            ref={funnelGroupRef}
            position={[0, 7, 0]}
            rotation-z={(20 * 3.14) / 180}
            rotation-y={(-90 * 3.14) / 180}
          >
            <SFunnelVentingAirBeforeMixing
              ref={funnelRef}
              scale={2}
              rotation-x={(30 * Math.PI) / 180}
              // rotation-z={(90 * Math.PI) / 180}
              rotation-y={(90 * Math.PI) / 180}
              startAnimationDelay={-1}
              occlude
            />
          </group>
        </group>
      </group>
    );
  },
);

export default Step6VentAirBeforeMixing;
