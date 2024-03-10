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
import { SFunnelShaking } from "../seperating_funnel/SeperatingFunnelShake";
import { Box } from "@react-three/drei";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

interface FunnelActions {
  startAnimation: () => void;
}

const Step7ShakeFunnel = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const stopperRef = useRef<Object3D>(null);
    const funnelRef = useRef<FunnelActions>(null);
    const funnelGroupRef = useRef<Group>(null);
    // TODO: FIX THE ANIMATION!!!
    useEffect(() => {
      setNextDisabled(nextButtonRef);
    }, []);
 
    const handleAnimation = () => {
      if (!funnelRef.current) return;

      funnelRef.current!.startAnimation();
      const nextButtonTimer = setTimeout(() => {
        if (nextButtonRef && nextButtonRef.current) {
          setNextEnabled(nextButtonRef);
        }
      }, 3000);
    };

    return (
      <group>
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          <mesh>
            <Box
              position={[-1, 8.2, 1]}
              onClick={handleAnimation}
              renderOrder={2}
              scale={[1,1,3]}
              rotation-x={-20 * 3.14/180}
            >
              <meshStandardMaterial transparent opacity={0.0} />
            </Box>
          </mesh>
          {/* <SFunnelShaking
            ref={funnelRef}
            position={[0, 8.5, 0.55]}
            scale={1.75}
            // rotation-x={3.14 / 2}
            // rotation-z={(90 * Math.PI) / 180}
            rotation-y={(90 * Math.PI) / 180}

            startAnimationDelay={999}
          /> */}
          <group
            ref={funnelGroupRef}
            position={[-1, 7.5, 0.5]}
            // rotation-z={(20 * 3.14) / 180}
            // rotation-y={(-90 * 3.14) / 180}
          >
            <SFunnelShaking
              ref={funnelRef}
              scale={1.75}
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

export default Step7ShakeFunnel;
