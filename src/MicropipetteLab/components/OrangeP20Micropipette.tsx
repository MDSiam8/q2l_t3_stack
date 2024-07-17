import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here

// props goes here

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'
import { OrangeP20MicropipetteRef } from "~/utils/types/ref-types";
import { OrangeP20MicropipetteProps } from "~/utils/types/types";

const modelPath = "./orangeP20micropipette.glb"

export const OrangeP20MicropipetteModel = forwardRef<OrangeP20MicropipetteRef, OrangeP20MicropipetteProps>(
    (props: OrangeP20MicropipetteProps, ref) => {
        const OrangeP20Micropipette = useGLTF(modelPath);
        const orangeP20MicropipetteRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: OrangeP20MicropipetteRef["performAction"] = async (
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

        //   return Promise.resolve();
        // };

        //performAction({OrangeP20Micropipette.animation, OrangeP20Micropipette.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...OrangeP20Micropipette.scene,
            ...orangeP20MicropipetteRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={OrangeP20Micropipette.scene} scale={props.scale} />
            </group>
        );
    },
);