import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

import { YellowP200TipBoxRef } from "~/utils/types/ref-types";
import { ActionName, YellowP200TipBoxProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./yellowP200tipbox.glb"

export const YellowP200TipBoxModel = forwardRef<YellowP200TipBoxRef, YellowP200TipBoxProps>(
    (props: YellowP200TipBoxProps, ref) => {
        const YellowP200TipBox = useGLTF(modelPath);
        const yellowP200TipBoxRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: YellowP200TipBoxRef["performAction"] = async (
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

        //performAction({YellowP200TipBox.animation, YellowP200TipBox.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...YellowP200TipBox.scene,
            ...yellowP200TipBoxRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={YellowP200TipBox.scene} scale={props.scale} />
            </group>
        );
    },
);