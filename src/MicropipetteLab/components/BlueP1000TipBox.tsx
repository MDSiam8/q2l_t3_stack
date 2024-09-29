import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { BlueP1000TipBoxRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, BlueP1000TipBoxProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./blueP1000tipbox.glb"

export const BlueP1000TipBoxModel = forwardRef<BlueP1000TipBoxRef, BlueP1000TipBoxProps>(
    (props: BlueP1000TipBoxProps, ref) => {
        const BlueP1000TipBox = useGLTF(modelPath);
        const blueP1000TipBoxRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: BlueP1000TipBoxRef["performAction"] = async (
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

        //performAction({BlueP1000TipBox.animation, BlueP1000TipBox.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...BlueP1000TipBox.scene,
            ...blueP1000TipBoxRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={BlueP1000TipBox.scene} scale={props.scale} />
            </group>
        );
    },
);