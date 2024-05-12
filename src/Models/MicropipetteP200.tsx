// Info about Micropiette hereimport { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { MicropipetteRef } from "~/utils/types/ref-types";
import { ActionName, HorizontalGelTankProps, MicropipetteProps } from "~/utils/types/types";
import performAction from "./model-utils";
import * as THREE from 'three'
import { useAnimations, useGLTF } from "@react-three/drei";

const modelPath = "./yellowP200micropipette.glb";

export const MicropipetteP200Model = forwardRef<MicropipetteRef, MicropipetteProps>(
  (props: MicropipetteProps, ref) => {
    const micropipettep200 = useGLTF(modelPath);

    const MicropipetteRef = useRef<any>();
    
    const animations = useAnimations(micropipettep200.animations, micropipettep200.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    const performAction: MicropipetteRef["performAction"] = async (
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

    // performAction({horizontalGelTank.animation, horizontalGelTank.scene, animationAction}, )

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      replayAnimation: handleReplayAnimation,
      ...micropipettep200.scene,
      ...MicropipetteRef.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={micropipettep200.scene} scale={props.scale * 1/3} />

      </group>
    );
  },
);
