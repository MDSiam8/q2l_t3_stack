import React, { forwardRef, useRef, useState, useEffect } from "react";
import { DistilledWater } from "../models/DistilledWater";
import { WaterBelowLine } from "../models/WaterBelowLine";
import { setNextDisabled, setNextEnabled } from "../Experience";
import gsap from "gsap";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

interface FlaskHandle {
  playAnimation: (animationName: string, speed?: number) => void;
}

interface ThirteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const createAndAnimateDroplet = (
  scene: THREE.Scene,
  startPosition: THREE.Vector3,
  endPosition: THREE.Vector3,
  delay: number
) => {
  const dropletGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const dropletMaterial = new THREE.MeshStandardMaterial({ color: "skyblue" });
  const dropletMesh = new THREE.Mesh(dropletGeometry, dropletMaterial);

  dropletMesh.position.copy(startPosition);
  scene.add(dropletMesh);

  gsap.to(dropletMesh.position, {
    x: endPosition.x,
    y: endPosition.y,
    z: endPosition.z,
    duration: 1,
    ease: "power1.in",
    delay: delay,
    onComplete: () => {
      scene.remove(dropletMesh);
      dropletGeometry.dispose();
      dropletMaterial.dispose();
    },
  });
};

const Step13DissolveSample = forwardRef<
  THREE.Group,
  ThirteenthStepComponentProps
>(({ nextButtonRef }, ref) => {
  const distilledRef = useRef<THREE.Group>(null);
  const flaskRef = useRef<FlaskHandle>(null);

  const { scene } = useThree();

  const [isWaterFilled, setIsWaterFilled] = useState<boolean>(false);

  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  const handleWaterClick = () => {
    if (isWaterFilled) return;
    setIsWaterFilled(true);

    if (distilledRef.current && flaskRef.current) {
      const distilledCurrent = distilledRef.current;
      const flaskCurrent = flaskRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          flaskCurrent.playAnimation("FillWater", 1);
        },
      });

      tl.to(
        distilledCurrent.position,
        {
          x: 0,
          y: 7,
          z: 1.4,
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );

      tl.to(
        distilledCurrent.rotation,
        {
          x: -Math.PI / 4,
          y: -Math.PI / 2,
          duration: 2,
          ease: "power1.inOut",
        },
        0
      );

      // Add water droplets dropping into the flask
      tl.add(() => {
        const startPosition = new THREE.Vector3(0, 7.5, 0.5);
        const endPosition = new THREE.Vector3(0, 4.98, 0.5);

        for (let i = 0; i < 20; i++) {
          createAndAnimateDroplet(
            scene,
            startPosition,
            endPosition,
            i * 0.1 
          );
        }
      }, 1);
    } else {
      console.error("References are not available");
    }
  };

  return (
    <group ref={ref}>
      <group position={[0, 4.98, 0.5]}>
        <WaterBelowLine ref={flaskRef} />
      </group>

      <group
        ref={distilledRef}
        position={[0, 5.4, 2.5]}
        onClick={handleWaterClick}
      >
        <DistilledWater />
      </group>
    </group>
  );
});

export default Step13DissolveSample;
