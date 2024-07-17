import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { OrangeP20TipBoxRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, OrangeP20TipBoxProps} from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./orangeP20tipbox.glb"

export const OrangeP20TipBoxModel = forwardRef<OrangeP20TipBoxRef, OrangeP20TipBoxProps>(
    (props: OrangeP20TipBoxProps, ref) => {
        const OrangeP20TipBox = useGLTF(modelPath);
        const orangeP20TipBoxRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: OrangeP20TipBoxRef["performAction"] = async (
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

        //performAction({OrangeP20TipBox.animation, OrangeP20TipBox.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...OrangeP20TipBox.scene,
            ...orangeP20TipBoxRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={OrangeP20TipBox.scene} scale={props.scale} />
            </group>
        );
    },
);