import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { MicropipetteTipBoxRef } from "~/utils/types/ref-types";
import { ActionName, MicropipetteTipBoxProps } from "~/utils/types/types";
// import performAction from "./model-utils";
import * as THREE from 'three'
import { useAnimations, useGLTF } from "@react-three/drei";


const modelPath = "./blueP1000tipbox.glb";

export const MicropipetteTipBoxP1000Model = forwardRef<MicropipetteTipBoxRef, MicropipetteTipBoxProps>(
  (props: MicropipetteTipBoxProps, ref) => {
    const micropipettetipboxp1000 = useGLTF(modelPath);

    const MicropipetteTipBoxRef = useRef<any>();
    
    const animations = useAnimations(micropipettetipboxp1000.animations, micropipettetipboxp1000.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    const performAction: MicropipetteTipBoxRef["performAction"] = async (
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
      ...micropipettetipboxp1000.scene,
      ...MicropipetteTipBoxRef.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={micropipettetipboxp1000.scene} scale={props.scale} />
      </group>
    );
  },
);
