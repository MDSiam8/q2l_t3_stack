import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
} from "react";
import gsap from "gsap";
import * as THREE from "three";
import { BeakerWaterFill } from "../models/BeakerWaterFill";
import { BeakerDissolve } from "../models/BeakerDissolve";
import { GlassRod } from "../models/GlassRod";
import { DistilledWater } from "../models/DistilledWater";
import { setNextDisabled, setNextEnabled } from "../Experience";

interface BeakerHandle {
  playAnimation: (animationName: string, speed?: number) => void;
}

interface ThirteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step13DissolveSample = forwardRef<
  THREE.Group,
  ThirteenthStepComponentProps
>(({ nextButtonRef }, ref) => {
  // References to control the beaker animations
  const beakerWaterFillRef = useRef<BeakerHandle>(null);
  const beakerDissolveRef = useRef<BeakerHandle>(null);

  // References to the distilled water and glass rod groups
  const distilledWaterRef = useRef<THREE.Group>(null);
  const glassRodRef = useRef<THREE.Group>(null);

  // State to manage interaction flow
  const [isWaterFilled, setIsWaterFilled] = useState<boolean>(false);
  const [isRodInserted, setIsRodInserted] = useState<boolean>(false);
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [canInsertRod, setCanInsertRod] = useState<boolean>(false); // New state to manage rod insertion

  // State for stirring animation
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const stirringTweenRef = useRef<gsap.core.Tween | null>(null);

  // Disable the next button initially
  useEffect(() => {
    if (nextButtonRef && nextButtonRef.current) {
      setNextDisabled(nextButtonRef);
    }
  }, [nextButtonRef]);

  const handleDistilledWaterClick = () => {

    if (isWaterFilled) return; // Prevent multiple clicks
    setIsWaterFilled(true); // Set state to prevent further clicks

    if (distilledWaterRef.current) {
      const originalPosition = new THREE.Vector3(0.1, 5.4, 2.5);
      const originalRotation = new THREE.Euler(0, 0, 0);

      const targetPosition = new THREE.Vector3(0.1, 5.8, 1.7);
      const targetRotation = new THREE.Euler(
        distilledWaterRef.current.rotation.x - Math.PI / 4,
        distilledWaterRef.current.rotation.y - Math.PI / 2,
        distilledWaterRef.current.rotation.z
      );

      const tl = gsap.timeline({
        onComplete: () => {
          // Play the "WaterFill" animation on the BeakerWaterFill
          if (beakerWaterFillRef.current) {
            beakerWaterFillRef.current.playAnimation("WaterFill");

            // After the "WaterFill" animation completes, replace BeakerWaterFill with BeakerDissolve
            setTimeout(() => {
              // Move DistilledWater back to its original position
              gsap.to(distilledWaterRef.current!.position, {
                x: originalPosition.x,
                y: originalPosition.y,
                z: originalPosition.z,
                duration: 2,
                ease: "power1.inOut",
                onComplete: () => {
                  setIsDissolving(true); // Switch state to dissolve after distilled water is reset
                  setCanInsertRod(true); // Allow glass rod insertion only after this step completes
                },
              });

              gsap.to(distilledWaterRef.current!.rotation, {
                x: originalRotation.x,
                y: originalRotation.y,
                z: originalRotation.z,
                duration: 2,
                ease: "power1.inOut",
              });
            }, 2000); // Adjust the timeout to match the actual duration of the "WaterFill" animation
          } else {
            console.error("beakerWaterFillRef.current is null");
          }
        },
      });

      // Animate position to pouring position
      tl.to(
        distilledWaterRef.current.position,
        {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 2,
          ease: "power1.inOut",
        },
        0
      );

      // Animate rotation to pouring angle
      tl.to(
        distilledWaterRef.current.rotation,
        {
          x: targetRotation.x,
          y: targetRotation.y,
          duration: 2,
          ease: "power1.inOut",
        },
        0
      );
    }
  };

  const handleGlassRodClick = () => {
    if (!canInsertRod || isRodInserted) return;

    if (!glassRodRef.current) {
      console.error("Glass Rod reference is not available yet.");
      return;
    }
    setIsRodInserted(true);

    // Now, safely animate the glass rod
    if (glassRodRef.current) {
      const targetPosition1 = { x: 0.1, y: 7.5, z: -1 };
      const targetPosition2 = { x: 0.1, y: 7.5, z: 0.5 };
      const targetPosition3 = { x: 0.1, y: 6.5, z: 0.5 };
      const targetRotation = {
        x: glassRodRef.current.rotation?.x,
        y: glassRodRef.current.rotation?.y + Math.PI / 2,
        z: glassRodRef.current.rotation?.z,
      };

      const tl = gsap.timeline({
        onComplete: () => {
          if (beakerDissolveRef.current) {
            beakerDissolveRef.current.playAnimation("Fill", 0.2);
          } else {
            console.error("beakerDissolveRef.current is null");
          }
          setNextEnabled(nextButtonRef);
        },
      });

      tl.to(glassRodRef.current.position, {
        x: targetPosition1.x,
        y: targetPosition1.y,
        z: targetPosition1.z,
        duration: 2,
        ease: "power1.inOut",
      });

      tl.to(glassRodRef.current.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 2,
        ease: "power1.inOut",
      });

      tl.to(glassRodRef.current.position, {
        x: targetPosition2.x,
        y: targetPosition2.y,
        z: targetPosition2.z,
        duration: 2,
        ease: "power1.inOut",
      });

      tl.to(glassRodRef.current.position, {
        x: targetPosition3.x,
        y: targetPosition3.y,
        z: targetPosition3.z,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          startStirring();
        },
      });

      // Removed tl.call block
    } else {
      console.error("glassRodRef.current is still null");
    }
  };


  // Function to start stirring animation
  const startStirring = () => {
    if (isStirring || !glassRodRef.current) return;

    setIsStirring(true);

    const stirRadius = 0.2;
    const stirDuration = 3;
    const centerX = glassRodRef.current.position.x;
    const centerZ = glassRodRef.current.position.z;

    let theta = 0;

    stirringTweenRef.current = gsap.to({}, {
      duration: stirDuration,
      repeat: -1,
      onUpdate: () => {
        theta += (2 * Math.PI) / (stirDuration * 60); // Assuming 60 FPS
        if (theta > 2 * Math.PI) theta -= 2 * Math.PI;

        const newX = centerX + stirRadius * Math.cos(theta);
        const newZ = centerZ + stirRadius * Math.sin(theta);

        if (glassRodRef.current) {
          glassRodRef.current.position.x = newX;
          glassRodRef.current.position.z = newZ;

        }
      },
    });
  };

  // Cleanup the stirring animation when component unmounts or stirring stops
  useEffect(() => {
    return () => {
      if (stirringTweenRef.current) {
        stirringTweenRef.current.kill();
      }
    };
  }, []);

  return (
    <group ref={ref}>
      {!isDissolving ? (
        <BeakerWaterFill
          ref={beakerWaterFillRef}
          position={[0.1, 4.98, 0.5]}
        />
      ) : (
        <BeakerDissolve
          ref={beakerDissolveRef}
          position={[-3.83, 4.98, 0.5]} 
        />
      )}

      <group
        ref={glassRodRef}
        position={[0.8, 5, -1]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        onClick={handleGlassRodClick}
      >
        <GlassRod />
      </group>
      <mesh
        position={[0.2, 5, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={handleGlassRodClick}
      >
        <planeGeometry args={[2, 1]} /> 
        <meshBasicMaterial
          color={0xffffff}
          transparent
          // opacity={0.01} make it transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <group
        ref={distilledWaterRef}
        position={[0.1, 5.4, 2.5]}
        onClick={handleDistilledWaterClick}
      >
        <DistilledWater />
      </group>
    </group>
  );
});

export default Step13DissolveSample;
