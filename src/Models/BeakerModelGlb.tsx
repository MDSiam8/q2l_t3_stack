import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { BeakerGlbRef } from "~/utils/types/ref-types";
import { ActionName, BeakerGlbProps } from "~/utils/types/types";
import performAction from "./model-utils";
import * as THREE from 'three'

const modelPath = "./beaker.glb";

export const BeakerGlbModel = forwardRef<BeakerGlbRef, BeakerGlbProps>(
  (props: BeakerGlbProps, ref) => {
    const beakerGlb = useGLTF(modelPath);

    const beakerGlbRef = useRef<any>();
    
    const animations = useAnimations(beakerGlb.animations, beakerGlb.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    const performAction: BeakerGlbRef["performAction"] = async (
      actionName: ActionName,
    ) => {
        const action = animations.actions
        ? animations.actions[actionName]
        : null;
      if (action) {
        animationAction.current = action;
        animationAction.current.setLoop(THREE.LoopOnce, 1);
        animationAction.current.clampWhenFinished = true;
      }
      // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
      return Promise.resolve();
    };

    // performAction({beakerGlb.animation, beakerGlb.scene, animationAction}, )

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      replayAnimation: handleReplayAnimation,
      ...beakerGlb.scene,
      ...beakerGlbRef.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={beakerGlb.scene} scale={props.scale} />
        {/* <BalanceReading ref={balanceReadingRef} /> */}
      </group>
    );
  },
);
