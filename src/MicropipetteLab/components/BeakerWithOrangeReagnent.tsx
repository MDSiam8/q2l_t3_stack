import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { BeakerWithOrangeReagnentRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, BeakerWithOrangeReagnentProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./NoAnimOrangeFilledBeaker.glb"

export const BeakerWithOrangeReagnentModel = forwardRef<BeakerWithOrangeReagnentRef, BeakerWithOrangeReagnentProps>(
    (props: BeakerWithOrangeReagnentProps, ref) => {
        const BeakerWithOrangeReagnent = useGLTF(modelPath);
        const BeakerWithOrangeReagnentRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: BeakerWithOrangeReagnentRef["performAction"] = async (
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

        //performAction({BeakerWithOrangeReagnent.animation, BeakerWithOrangeReagnent.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...BeakerWithOrangeReagnent.scene,
            ...BeakerWithOrangeReagnentRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={BeakerWithOrangeReagnent.scene} scale={props.scale} />
            </group>
        );
    },
);