import React, {
    useRef,
    useEffect,
    useState,
    forwardRef,
  } from "react";
  import { useFrame } from "@react-three/fiber";
  import gsap from "gsap";
  import * as THREE from "three";
  import { Spectrophotometer } from "../models/Spectrophotometer";
  import { Cuvette } from "../models/Cuvette";
  import { CuvetteCap } from "../models/CuvetteCap";
  
  // For 3D text and pointer events
  import { Text, Billboard } from "@react-three/drei";
  
  import { setNextDisabled, setNextEnabled } from "../Experience";
  
  interface Step9Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
  }
  
  const Step9CalibratingWithBlankSolution: React.FC<Step9Props> = forwardRef(
    (props, ref) => {
      const cuvetteRef = useRef<THREE.Group>(null);
  
      const [showTextControls, setShowTextControls] = useState(false);
  
      const [animationPlayed, setAnimationPlayed] = useState(false);
  
      const [orientationErrorMessage, setOrientationErrorMessage] = useState("");
  
      useEffect(() => {
        setNextDisabled(props.nextButtonRef);
      }, [props.nextButtonRef]);
  
      const handleCuvetteClick = () => {
        if (animationPlayed) return;
        if (!cuvetteRef.current) return;
  
        const tl = gsap.timeline({
          onComplete: () => {
            console.log("Cuvette is now above the spectrometer.");
            setShowTextControls(true);
            setAnimationPlayed(true);
          },
        });
  
        tl.to(cuvetteRef.current.position, {
          x: -0.3,
          y: 6,
          z: -2,
          duration: 2,
          ease: "power1.inOut",
        });
  
        tl.to(cuvetteRef.current.position, {
          x: -0.3,
          y: 6,
          z: -0.55,
          duration: 2,
          ease: "power1.inOut",
        });
      };
  
      const rotateLeft = () => {
        if (!cuvetteRef.current) return;
        gsap.to(cuvetteRef.current.rotation, {
          y: cuvetteRef.current.rotation.y + Math.PI / 2,
          duration: 0.5,
          ease: "power1.inOut",
        });
  
        setOrientationErrorMessage("");
      };
  
      const rotateRight = () => {
        if (!cuvetteRef.current) return;
        gsap.to(cuvetteRef.current.rotation, {
          y: cuvetteRef.current.rotation.y - Math.PI / 2,
          duration: 0.5,
          ease: "power1.inOut",
        });
  
        setOrientationErrorMessage("");
      };
  
      const placeCuvette = () => {
        if (!cuvetteRef.current) return;
  
        let rotationY = cuvetteRef.current.rotation.y;
        rotationY = (rotationY % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  
        const threshold = 0.1;
  
        const isZero =
          rotationY < threshold || rotationY > 2 * Math.PI - threshold;
        const isPi = Math.abs(rotationY - Math.PI) < threshold;
  
        if (!isZero && !isPi) {
          setOrientationErrorMessage("Incorrect orientation of the cuvette");
          return;
        }
  
        gsap.to(cuvetteRef.current.position, {
          x: -0.3,
          y: 5.4,
          z: -0.55,
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            console.log("Cuvette placed!");
            setShowTextControls(false);
            setNextEnabled(props.nextButtonRef);
          },
        });
      };
  
      return (
        <>
          <group>
            {/* Spectrometer at [0, 5, 0] */}
            <Spectrophotometer position={[0, 5, 0]} />
  
            {/* The cuvette group with its cap; clickable for initial movement */}
            <group
              ref={cuvetteRef}
              position={[-0.3, 4.98, -2]}
              onPointerDown={handleCuvetteClick}
            >
              <Cuvette />
              <CuvetteCap
                position={[-0.23, 0.85, 0]}
                rotation={[Math.PI, 0, 0]}
              />
            </group>
          </group>
  
          {showTextControls && (
            <Billboard
              position={[-0.3, 6.5, -0.55]}
              follow={true}
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <group position={[-0.4, 0, 0]} onPointerDown={rotateLeft}>
                <mesh position={[0, 0, -0.01]}>
                  <planeGeometry args={[0.4, 0.2]} />
                  <meshBasicMaterial color="lightblue" />
                </mesh>
  
                <Text
                  fontSize={0.1}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.01]}
                >
                  Left
                </Text>
              </group>

              <group position={[0.4, 0, 0]} onPointerDown={rotateRight}>
                <mesh position={[0, 0, -0.01]}>
                  <planeGeometry args={[0.4, 0.2]} />
                  <meshBasicMaterial color="lightblue" />
                </mesh>
  
                <Text
                  fontSize={0.1}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.01]}
                >
                  Right
                </Text>
              </group>

              <group position={[0, 0.5, 0]} onPointerDown={placeCuvette}>
                <mesh position={[0, 0, -0.01]}>
                  <planeGeometry args={[0.4, 0.2]} />
                  <meshBasicMaterial color="lightblue" />
                </mesh>
  
                <Text
                  fontSize={0.1}
                  color="black"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.01]}
                >
                  Place
                </Text>
  
                {orientationErrorMessage && (
                  <Text
                    fontSize={0.08}
                    color="red"
                    anchorX="center"
                    anchorY="bottom"
                    position={[0, 0.25, 0.01]}
                  >
                    {orientationErrorMessage}
                  </Text>
                )}
              </group>
            </Billboard>
          )}
        </>
      );
    }
  );
  
  export default Step9CalibratingWithBlankSolution;
  