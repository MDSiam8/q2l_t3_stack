import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { RedP2TipBoxRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, RedP2TipBoxProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./redP2tipbox.glb"

export const RedP2TipBoxModel = forwardRef<RedP2TipBoxRef, RedP2TipBoxProps>(
    (props: RedP2TipBoxProps, ref) => {
        const RedP2TipBox = useGLTF(modelPath);
        const redP2TipBoxRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: RedP2TipBoxRef["performAction"] = async (
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

        //performAction({RedP2TipBox.animation, RedP2TipBox.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...RedP2TipBox.scene,
            ...redP2TipBoxRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={RedP2TipBox.scene} scale={props.scale} />
            </group>
        );
    },
);