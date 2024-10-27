import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber"; // Import GroupProps

// Define ref types
export interface FlaskFillHandles {
  replayAnimation: () => Promise<void>;
}

// Add props interface to accept opacity, position, and scale
interface FlaskFillProps extends GroupProps {
  opacity?: number;
}

const FlaskFill = forwardRef<FlaskFillHandles, FlaskFillProps>((props, ref) => {
  const flaskFill = useGLTF("./FlaskFill_Water.glb"); // Load the GLB file
  const { scene, animations } = flaskFill; 
  const animationAction = useRef<THREE.AnimationAction | null>(null);
  const { actions } = useAnimations(animations, scene); // Set up animations

  useEffect(() => {
    const action = actions[0];
    if (action) {
      animationAction.current = action;
      animationAction.current.setLoop(THREE.LoopOnce, 1); // Set to loop once
    }

    return () => {
      if (animationAction.current) {
        animationAction.current.fadeOut(0.5); // Clean up on unmount
      }
    };
  }, [actions]);

  const handleReplayAnimation = async () => {
    if (animationAction.current) {
      await animationAction.current.reset().fadeIn(0.5).play(); // Play animation
      animationAction.current.clampWhenFinished = true; // Keep in last frame
    }
  };

  // Expose the replayAnimation method to the parent
  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
  }));

  return (
    <group {...props}> {/* Spread props to allow passing of position, scale, etc. */}
      <primitive
        object={scene} // Use the loaded scene
        scale={props.scale || [0.3, 0.3, 0.3]} // Default scale if not provided
        opacity={props.opacity || 0.8} // Default opacity if not provided
      />
    </group>
  );
});

export default FlaskFill;

useGLTF.preload("./FlaskFill_Water.glb"); // Preload the GLB file
