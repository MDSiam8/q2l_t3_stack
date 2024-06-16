import React, {
  useEffect,
  forwardRef,
  useState,
  useRef,
  useCallback,
} from "react";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { SeparatingFunnelHolder } from "../seperating_funnel/SeparatingFunnelHolder";
import { SFunnelWithFillAnimation } from "../seperating_funnel/SeperatingFunnelWithFillAnimation";
import gsap from "gsap";
import { Spatula } from "~/AnalyticalBalanceLab/components/Spatula";
import { AMSBottleCap } from "../AMSBottleCap";
import { AMSBottle } from "../AMSBottle";
import { Sphere, Html } from "@react-three/drei";
import { Group, Mesh, Object3D } from "three";
import { BeakerPouringOrganicSolution } from "../BeakerPourOrganicSol";

interface Step2LabTasksProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step12AddPowder = forwardRef<HTMLDivElement, Step2LabTasksProps>(
  ({ nextButtonRef }, ref) => {
    const bottleCapRef = useRef<Object3D>(null);
    const spatulaRef = useRef<Object3D>(null);
    const powderRef = useRef<Mesh>(null);
    const collectionSphereRef = useRef<Mesh>(null);
    const groupSphereRef = useRef<Group>(null);
    const addCountRef = useRef(0);
    const beakerRef = useRef<Group>(null);

    useEffect(() => {
      const bottleCapTimeline = gsap.timeline();
      const spatulaTimeline = gsap.timeline();
      setNextDisabled(nextButtonRef);
      // if (nextButtonRef.current) {
      //   nextButtonRef.current.disabled = true; // Disable the button
      // }
      if (bottleCapRef.current) {
        bottleCapTimeline
          .to(bottleCapRef.current.position, { y: "+=1", duration: 0.5 })
          .to(bottleCapRef.current.position, {
            x: "-=1",
            y: "-=2",
            duration: 0.5,
          });
      }

      if (spatulaRef.current) {
        spatulaTimeline
          .to(spatulaRef.current.position, { y: "+=2", duration: 1 })
          .to(spatulaRef.current.rotation, { x: Math.PI / 2, duration: 1 })
          .to(spatulaRef.current.position, { z: "-=2", duration: 1 })
          .to(spatulaRef.current.position, { y: "-=1", duration: 1 });
      }
      return () => {
        bottleCapTimeline.kill();
        spatulaTimeline.kill();
      };
    }, []);

    const handleAddClick = () => {
      // Animate spatula and powder sphere
      if (spatulaRef.current && powderRef.current) {
        gsap
          .timeline()
          .to([spatulaRef.current.position, powderRef.current.position], {
            y: "+=1",
            duration: 0.5,
          })
          .to([spatulaRef.current.position, powderRef.current.position], {
            z: "-=1",
            duration: 0.5,
          })
          .to([spatulaRef.current.position, powderRef.current.position], {
            y: "-=1",
            duration: 0.5,
            onComplete: () => {
              animateBeakerSwirl();
              // animateBeakerInCircles();
              gsap.set(powderRef.current!.position, { x: 2, y: 5.5, z: -2 });
              gsap.set(spatulaRef.current!.position, { x: 2, y: 6.2, z: -2 });

              // Update addCount state after animations
              // setAddCount(prevCount => prevCount + 1);
              addCountRef.current += 1;
              // checkAddCount();
            },
          });
      }
    };

    const animateBeakerSwirl = () => {
      const beakerTimeline = gsap.timeline();
      beakerTimeline
        .to(beakerRef.current!.position, {
          z: "-=.3",
          x: "+=.3",
          duration: 0.3,
        })
        .to(beakerRef.current!.position, {
          z: "+=.6",
          x: "-=.6",
          duration: 0.3,
        })
        .to(beakerRef.current!.position, {
          z: "-=.3",
          x: "+=.3",
          duration: 0.3,
        })
        .to(beakerRef.current!.position, {
          z: "+=.3",
          x: "-=.3",
          duration: 0.3,
        })
        .to(beakerRef.current!.position, {
          z: "-=.3",
          x: "+=.3",
          duration: 0.3,
          onComplete: () => {
            if (collectionSphereRef.current) {
              gsap.to(collectionSphereRef.current.scale, {
                x: "+=0.05",
                y: "+=0.05",
                z: "+=0.05",
              });
            }
            checkAddCount();
          },
        });
    };
    const checkAddCount = () => {
      if (addCountRef.current === 4) {
        if (collectionSphereRef.current) {
          collectionSphereRef.current.visible = false;
        }
        if (groupSphereRef.current) {
          groupSphereRef.current.visible = true;
        }
        if (nextButtonRef.current) {
          setNextEnabled(nextButtonRef);
        }
      }
    };

    // const animateBeakerInCircles = useCallback(() => {
    //   const radius = 1; // Adjust the radius as needed for the size of the circle
    //   const duration = 2; // Duration of one complete circle in seconds
    //   let angle = 0; // Starting angle

    //   const timeline = gsap.timeline({
    //     repeat: -1, // Loop indefinitely
    //     onUpdate: () => {
    //       if (beakerRef.current) {
    //         // Calculate x and z positions based on the angle
    //         const x = radius * Math.cos(angle);
    //         const z = radius * Math.sin(angle);
    //         beakerRef.current.position.x = x;
    //         beakerRef.current.position.z = z;
    //       }
    //     },
    //   });

    //   timeline.to(
    //     {},
    //     {
    //       // Empty target as we're using onUpdate only
    //       duration: duration,
    //       ease: "none",
    //       onComplete: () => {
    //         angle += Math.PI / 2; // Increase the angle by 90 degrees at the end of each loop
    //         if (angle >= 2 * Math.PI) {
    //           angle = 0; // Reset the angle after a full circle
    //         }
    //       },
    //     },
    //   );
    // }, []);

    const animateSpatulaOnClick = useCallback(() => {
      if (spatulaRef.current) {
        gsap.to(spatulaRef.current.position, { y: "+=1", duration: 0.5 });
        gsap.to(spatulaRef.current.position, {
          y: "-=1",
          duration: 0.5,
          delay: 0.5,
        });
      }
    }, []);
    return (
      <group>
        <group rotation-y={3.14}>
          <SeparatingFunnelHolder position={[0, 5, 0]} />
          <SFunnelWithFillAnimation
            position={[0, 5.9, 0.17]}
            scale={[2.7, 2, 2.7]}
            rotation-y={-3.14 / 2}
            startAnimationDelay={999}
          />
        </group>
        {/* <Stopper ref={flaskRef} position={[0,9.05,-0.1]} rotation-x={3.14} startAnimationDelay={0} /> */}
        <Spatula
          ref={spatulaRef}
          position={[2, 5, 0]}
          rotation-y={3.14 / 2}
          scale={0.5}
          onClick={animateSpatulaOnClick} // Attach the onClick handler here
        />
        <AMSBottleCap
          ref={bottleCapRef}
          position={[2, 5, -2]}
          rotation-y={3.14 / 2}
        />
        <Sphere ref={powderRef} position={[2, 5.3, -2]} scale={0.1} />

        <AMSBottle position={[2, 5, -2]} rotation-y={3.14 / 2} />
        <Html transform rotation-y={3.14 / 2} position={[2, 6.5, -2]}>
          <button
            className="transform rounded-full scale-90 bg-blue-500 px-3 py-1 font-bold text-white transition duration-300 ease-in-out hover:scale-100 hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddClick();
            }}
          >
            Add
          </button>
        </Html>
        <group position-x={2} ref={beakerRef}>
          <BeakerPouringOrganicSolution
            position={[0, 4.9, -3.1]}
            rotation-y={3.14 / 2}
            isFilled={true}
            startAnimationDelay={999}
          />
          {/* This is the collection of powder */}
          <Sphere
            ref={collectionSphereRef}
            position={[0, 4.8, -3.1]}
            scale={0.1}
          />
          <group ref={groupSphereRef} visible={false}>
            <Sphere position={[0.1, 5.2, -3]} scale={0.03} />
            <Sphere position={[-0.12, 5.3, -3.2]} scale={0.03} />
            <Sphere position={[0.17, 5.1, -3.1]} scale={0.03} />
            <Sphere position={[0.1, 5.1, -3]} scale={0.03} />
            <Sphere position={[-0.15, 5.2, -3.2]} scale={0.03} />
            <Sphere position={[0, 5.1, -3.1]} scale={0.03} />
          </group>
        </group>
      </group>
    );
  },
);

export default Step12AddPowder;
