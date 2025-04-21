import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { RedP2MicropipetteRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, RedP2MicropipetteProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./P2Micropipette-v2.glb"

export const RedP2MicropipetteModel = forwardRef<RedP2MicropipetteRef, RedP2MicropipetteProps>(
    (props: RedP2MicropipetteProps, ref) => {
        const RedP2Micropipette = useGLTF(modelPath);
        const redP2MicropipetteRef = useRef<any>();

        const animations = useAnimations(RedP2Micropipette.animations, RedP2Micropipette.scene)
        const animationAction = useRef<THREE.AnimationAction | null>(null);

        const performAction: RedP2MicropipetteRef["performAction"] = async (
          actionName: ActionName,
        ) => {
          const action = animations.actions ? animations.actions[actionName] : null;
          if (action) {
            console.log("Found Action");
            animationAction.current = action;
            animationAction.current.reset();
            animationAction.current.setLoop(THREE.LoopOnce, 1);
            animationAction.current.clampWhenFinished = true;
            animationAction.current.play();
          } else {
            console.error(`Animation ${actionName} not found`);
          }
        
          return Promise.resolve();
        };

        // performAction({RedP2Micropipette.animation, RedP2Micropipette.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...RedP2Micropipette.scene,
            ...redP2MicropipetteRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={RedP2Micropipette.scene} scale={props.scale} />
            </group>
        );
    },
);