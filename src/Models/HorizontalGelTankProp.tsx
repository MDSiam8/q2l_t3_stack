import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { HorizontalGelTankRef } from "~/utils/types/ref-types";
import { ActionName, HorizontalGelTankProps } from "~/utils/types/types";
import performAction from "./model-utils";
import * as THREE from 'three'

const modelPath = "./HorizontalGelTank.glb";

export const HorizontalGelTankModel = forwardRef<HorizontalGelTankRef, HorizontalGelTankProps>(
  (props: HorizontalGelTankProps, ref) => {
    const horizontalGelTank = useGLTF(modelPath);

    const horizontalGelTankRef = useRef<any>();
    
    const animations = useAnimations(horizontalGelTank.animations, horizontalGelTank.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    const performAction: HorizontalGelTankRef["performAction"] = async (
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

    performAction({horizontalGelTank.animation, horizontalGelTank.scene, animationAction}, )

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      replayAnimation: handleReplayAnimation,
      ...horizontalGelTank.scene,
      ...horizontalGelTank.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={horizontalGelTank.scene} scale={props.scale} />
        {/* <BalanceReading ref={balanceReadingRef} /> */}
      </group>
    );
  },
);
