import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations, Box } from "@react-three/drei";
import * as THREE from "three";

interface SFunnelPouringOrganicLayerProps {
  startAnimationDelay?: number; // Delay in seconds, undefined or positive to auto-start, negative to disable auto-start
  [key: string]: any; // Additional props like position, scale, etc.
}

export const SFunnelVentingAirBeforeMixing = forwardRef(
  (props: SFunnelPouringOrganicLayerProps, ref) => {
    const { scene, animations } = useGLTF(
      "./WithArmature_VentAirBeforeMixing_NewExport.glb",
    );
    const clonedScene = scene.clone(); // Clone for isolated use
    const { actions } = useAnimations(animations, clonedScene);

    // Adjust useEffect to account for startAnimationDelay handling
    useEffect(() => {
      // Auto-start animation if startAnimationDelay is undefined or a non-negative number
      if (
        props.startAnimationDelay === undefined ||
        props.startAnimationDelay >= 0
      ) {
        const delay =
          props.startAnimationDelay !== undefined
            ? props.startAnimationDelay * 1000
            : 0; // Default to 0ms if undefined
        const timer = setTimeout(() => {
          startAnimation();
        }, delay);
        return () => clearTimeout(timer);
      }
      // No cleanup action needed if startAnimationDelay is negative
    }, [props.startAnimationDelay, actions]);

    // Define startAnimation for external calls
    const startAnimation = () => {
      const animation = actions["Animation"];
      if (animation) {
        animation.reset().play();
        animation.setEffectiveTimeScale(1);
        animation.setLoop(THREE.LoopOnce, 1);
        animation.clampWhenFinished = true;
      }
    };

    // Expose startAnimation method to parent components via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
    }));

    return (
      <group>
        {/* <group>
          <mesh onClick={startAnimation}>
            <Box
              position={[1, 1, 1]}
              scale={[3, 1, 1]}
              // rotation-x={(-20 * 3.14) / 180}
            >
              <meshNormalMaterial transparent opacity={0.0} />
            </Box>
          </mesh>
        </group> */}
        <primitive object={clonedScene} {...props} ref={ref} />;
      </group>
    );
  },
);

useGLTF.preload("./WithArmature_VentAirBeforeMixing_NewExport.glb");
