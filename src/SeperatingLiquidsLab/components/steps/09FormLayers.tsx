import React, { useEffect, forwardRef, useState, useRef } from "react";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html } from "next/document";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { Stopper } from "../Stopper";
import { Group, MeshNormalMaterial, Object3D } from "three";
import { SFunnelWithTwoLayers } from "../seperating_funnel/SeparatingFunnelWithTwoLayers";
import AnswerBox from "../AnswerBox";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

interface FunnelActions {
  startAnimation: () => void;
}

const Step9MixtureSeparates = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const funnelRef = useRef<FunnelActions>(null);
    const funnelGroupRef = useRef<Group>(null);
    useEffect(() => {
      setNextDisabled(nextButtonRef);
    }, []);
    // useEffect(() => {
    //   const nextButtonTimer = setTimeout(() => {
    //     if (nextButtonRef && nextButtonRef.current) {
    //     }
    //   }, 3000);

    //   // Wait for user interaction or ensure the object is fully loaded/initialized
    //   return () => clearTimeout(nextButtonTimer);
    // }, [nextButtonRef]);

    useEffect(() => {}, [funnelRef]);
    return (
      <group>
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />

          <group ref={funnelGroupRef} position={[0, 5.7, 0.1]}>
            <SFunnelWithTwoLayers
              ref={funnelRef}
              rotation-y={(-90 * 3.14) / 180}
              scale={1.75}
              startAnimationDelay={-1}
            />
            <Stopper
              position={[0, 3, 0]}
              rotation-z={(180 * 3.14) / 180}
              scale={0.4}
            />
          </group>
        </group>
        <group scale={0.5} position={[0, 7, -4]}>
          <AnswerBox
            question="Which layer should be kept? Answer as either 'top' or 'bottom'."
            correctAnswers={["top", "Top", "top layer", "Top Layer"]}
            onCorrectAnswer={() => {
                setNextEnabled(nextButtonRef);

            }}
          />
        </group>
      </group>
    );
  },
);

export default Step9MixtureSeparates;
