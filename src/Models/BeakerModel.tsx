import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { BeakerRef } from "~/utils/types/ref-types";
import { ActionName, BeakerProps } from "~/utils/types/types";
import createActionPerformer from "./model-utils";
import * as THREE from 'three'

const modelPath = "./Beaker.gltf";

export const BeakerModel = forwardRef<BeakerRef, BeakerProps>(
  (props: BeakerProps, ref) => {
    const beaker = useGLTF(modelPath);

    const beakerRef = useRef<any>();
    
    const animations = useAnimations(beaker.animations, beaker.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    // const performAction: BeakerRef["performAction"] = async (
    //   actionName: ActionName,
    // ) => {
    //     const action = animations.actions
    //     ? animations.actions[actionName]
    //     : null;
    //   if (action) {
    //     animationAction.current = action;
    //     animationAction.current.setLoop(THREE.LoopOnce, 1);
    //     animationAction.current.clampWhenFinished = true;
    //   }
    //   // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
    //   return Promise.resolve();
    // };

    //performAction({beaker.animation, beaker.scene, animationAction}, )

    useImperativeHandle(ref, () => ({
      performAction: actionPerformer,
      replayAnimation: handleReplayAnimation,
      ...beaker.scene,
      ...beakerRef.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={beaker.scene} scale={props.scale} ref={beakerRef} />
        {/* <BalanceReading ref={balanceReadingRef} /> */}
      </group>
    );
  },
);
