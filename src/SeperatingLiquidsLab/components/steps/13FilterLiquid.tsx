import React, { useEffect, useState, useRef } from "react";
import { setNextEnabled } from "../Experience";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap";
import { BeakerFillWithOrganicLayer } from "../BeakerFillingWithOrganicProduct";
import { FunnelWithPourAnim } from "../Funnel";
import { Sphere } from "@react-three/drei";
import { BeakerPouringOrganicSolution } from "../BeakerPourOrganicSol";
import { Group } from "three";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step13Filter: React.FC<Step2LabTasksProps> = ({ nextButtonRef }) => {  
  const beakerRef = useRef<Group>(null);
  const [animDelay, setAnimDelay] = useState(9999);
  const [showPowder, setShowPowder] = useState(true);

  const handleBeakerClick = () => {
    if (!beakerRef.current) {
      console.error("beakerRef is null");
      return;
    }

    const tl = gsap.timeline();
    tl.to(beakerRef.current.position, { y: "+=2", duration: 1 })
      .to(beakerRef.current.position, {
        x: "+=2",
        z: "+=.3",
        duration: 1,
        onComplete: () => {
          setShowPowder(false);
          setAnimDelay(0.1);
        },
      })
      .to(beakerRef.current.position, {
        duration: 3,
      })
      .to(beakerRef.current.position, {
        x: "-=2",
        y: "-=2",
        z: "+=.3",
        duration: 1,
        onComplete: () => {
          setNextEnabled(nextButtonRef);
        },
      });
  };

  useEffect(() => {
    if (beakerRef.current) {
      console.log("beakerRef is assigned:", beakerRef.current);
    }
  }, []);

  return (
    <group>
      <group rotation-y={Math.PI}>
        <SeparatingFunnelHolder position={[0, 5, 0]} />
        <SFunnelWithFillAnimation
          position={[0, 5.9, 0.17]}
          scale={[2.7, 2, 2.7]}
          rotation-y={-Math.PI / 2}
          startAnimationDelay={-1}
        />
      </group>
      <FunnelWithPourAnim
        position={[2, 5.5, -2]}
        startAnimationDelay={animDelay + 1}
      />
      <BeakerFillWithOrganicLayer
        startAnimationDelay={animDelay + 1.5}
        position={[2, 5, -2]}
      />
      <group
        ref={beakerRef}
        onClick={handleBeakerClick}
        // Optionally, add cursor style if needed
        // e.g., onPointerOver, onPointerOut to change cursor
      >
        <BeakerPouringOrganicSolution
          position={[0, 5.0, -3.1]}
          rotation-y={Math.PI / 2}
          startAnimationDelay={animDelay}
        />
        {showPowder && (
          <group>
            <Sphere position={[0.1, 5.2, -3]} scale={0.03} />
            <Sphere position={[-0.12, 5.3, -3.2]} scale={0.03} />
            <Sphere position={[0.17, 5.1, -3.1]} scale={0.03} />
            <Sphere position={[0.1, 5.1, -3]} scale={0.03} />
            <Sphere position={[-0.15, 5.2, -3.2]} scale={0.03} />
            <Sphere position={[0, 5.1, -3.1]} scale={0.03} />
          </group>
        )}
      </group>
    </group>
  );
};

export default Step13Filter;
