import React, { useRef, useEffect, useState, forwardRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { BeakerWaterFill } from "../models/BeakerWaterFill";
import { BeakerDissolve } from "../models/BeakerDissolve";
import { GlassRod } from "../models/GlassRod";
import { DistilledWater } from "../models/DistilledWater";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { Html, Sphere } from "@react-three/drei";
import { Flask } from "../models/Flask";

interface BeakerHandle {
  playAnimation: (animationName: string, speed?: number) => void;
}

interface ThirteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step15CheckBeakerResidue = forwardRef<
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

  // State for dialogs
  const [showDialog, setShowDialog] = useState<boolean>(true); // Show main dialog initially
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false); // Show error dialog when needed

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
        distilledWaterRef.current.rotation.z,
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
        0,
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
        0,
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

    stirringTweenRef.current = gsap.to(
      {},
      {
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
      },
    );
  };

  // Cleanup the stirring animation when component unmounts or stirring stops
  useEffect(() => {
    return () => {
      if (stirringTweenRef.current) {
        stirringTweenRef.current.kill();
      }
    };
  }, []);

  const playAllAnimations = () => {
    if (isWaterFilled) return; // Prevent multiple runs

    setIsWaterFilled(true);

    if (!distilledWaterRef.current || !glassRodRef.current) {
      console.error("Required refs are not available.");
      return;
    }

    const originalPosition = new THREE.Vector3(0.1, 5.4, 2.5);
    const originalRotation = new THREE.Euler(0, 0, 0);

    const targetPosition = new THREE.Vector3(0.1, 5.8, 1.7);
    const targetRotation = new THREE.Euler(
      distilledWaterRef.current.rotation.x - Math.PI / 4,
      distilledWaterRef.current.rotation.y - Math.PI / 2,
      distilledWaterRef.current.rotation.z,
    );

    const masterTl = gsap.timeline({
      onComplete: () => {
        console.log("All animations completed.");
      },
    });

    masterTl
      // Animate Distilled Water Position
      .to(
        distilledWaterRef.current.position,
        {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 2,
          ease: "power1.inOut",
        },
        "start",
      )

      // Animate Distilled Water Rotation
      .to(
        distilledWaterRef.current.rotation,
        {
          x: targetRotation.x,
          y: targetRotation.y,
          duration: 2,
          ease: "power1.inOut",
        },
        "start", // Start at the same time as position
      )

      // Play WaterFill Animation
      .add(
        () => {
          if (beakerWaterFillRef.current) {
            beakerWaterFillRef.current.playAnimation("WaterFill");
          } else {
            console.error("beakerWaterFillRef.current is null");
          }
        },
        "+=0", // Immediately after the previous animation
      )

      // Wait for WaterFill Animation to Complete
      .to({}, { duration: 2 })

      // Reset Distilled Water Position
      .to(
        distilledWaterRef.current.position,
        {
          x: originalPosition.x,
          y: originalPosition.y,
          z: originalPosition.z,
          duration: 2,
          ease: "power1.inOut",
        },
        "reset",
      )

      // Reset Distilled Water Rotation
      .to(
        distilledWaterRef.current.rotation,
        {
          x: originalRotation.x,
          y: originalRotation.y,
          z: originalRotation.z,
          duration: 2,
          ease: "power1.inOut",
        },
        "reset", // Start at the same time as position
      )

      // Update States after Reset
      .add(() => {
        setIsDissolving(true);
        setCanInsertRod(true);
      })

      // Animate Glass Rod Position to First Target
      .to(
        glassRodRef.current.position,
        {
          x: 0.1,
          y: 7.5,
          z: -1,
          duration: 2,
          ease: "power1.inOut",
        },
        "rodMove1",
      )

      // Animate Glass Rod Rotation
      .to(
        glassRodRef.current.rotation,
        {
          x: glassRodRef.current.rotation.x,
          y: glassRodRef.current.rotation.y + Math.PI / 2,
          z: glassRodRef.current.rotation.z,
          duration: 2,
          ease: "power1.inOut",
        },
        "rodMove1", // Start at the same time as position
      )

      // Animate Glass Rod Position to Second Target
      .to(
        glassRodRef.current.position,
        {
          x: 0.1,
          y: 7.5,
          z: 0.5,
          duration: 2,
          ease: "power1.inOut",
        },
        "rodMove2",
      )

      // Animate Glass Rod Position to Third Target and Start Stirring
      .to(
        glassRodRef.current.position,
        {
          x: 0.1,
          y: 6.5,
          z: 0.5,
          duration: 2,
          ease: "power1.inOut",
        },
        "rodMove3",
      )
      .add(
        () => {
          if (beakerDissolveRef.current) {
            beakerDissolveRef.current.playAnimation("Fill", 0.2);
          } else {
            console.error("beakerDissolveRef.current is null");
          }
          setNextEnabled(nextButtonRef);
          startStirring();
        },
        "rodMove3+=0", // Immediately after the last rod movement
      );

    // Disable the next button during animation to prevent multiple triggers
    setNextDisabled(nextButtonRef);
  };

  // Handlers for Dialog Buttons
  const handleRinseAgain = () => {
    setShowDialog(false);
    playAllAnimations();
  };

  const handleContinueWithoutRinsing = () => {
    setShowErrorDialog(true);
  };

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
  };

  return (
    <group ref={ref}>
      {!isDissolving ? (
        <BeakerWaterFill ref={beakerWaterFillRef} position={[0.1, 4.98, 0.5]} />
      ) : (
        <BeakerDissolve ref={beakerDissolveRef} position={[-3.83, 4.98, 0.5]} />
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

      <group ref={distilledWaterRef} position={[0.1, 5.4, 2.5]}>
        <DistilledWater />
      </group>
      <group>
            <Sphere
              position={[0, 5, -1.5]}
              scale={[0.3, 0.54, 0.3]}
            >
              <meshStandardMaterial
              color="orange"
              roughness={1}
            />
            </Sphere>
        </group>

        <Flask
          // ref={flaskRef}
          position={[0, 4.95, -1.5]}
          rotation-y={(-Math.PI / 180) * 45}
        />

      {/* Main Dialog Box */}
      {showDialog && (
        <Html
          transform
          rotation-y={Math.PI / 2}
          position={[0, 8, 0]}
          scale={0.6}
          center
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            pointerEvents: "none", // Allow underlying 3D interactions if needed
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(50, 50, 50, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              minWidth: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              pointerEvents: "auto", // Enable interactions
            }}
          >
            <h2>Based on the beaker, what should you do?</h2>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleRinseAgain}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  marginRight: "10px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Rinse again
              </button>
              <button
                onClick={handleContinueWithoutRinsing}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Continue without rinsing
              </button>
            </div>
          </div>
        </Html>
      )}

      {/* Error Dialog Box */}
      {showErrorDialog && (
        <Html
          transform
          rotation-y={Math.PI / 2}
          position={[1, 8, 0]}
          center
          scale={0.6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(50, 50, 50, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              color: "white",
              minWidth: "300px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              pointerEvents: "auto",
            }}
          >
            <h2>There is still residue in the beaker. Please rinse again.</h2>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={closeErrorDialog}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
});

export default Step15CheckBeakerResidue;
