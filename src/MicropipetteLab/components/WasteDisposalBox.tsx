import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { WasteDisposalBoxRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, WasteDisposalBoxProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./WasteDisposal.glb"

export const WasteDisposalBoxModel = forwardRef<WasteDisposalBoxRef, WasteDisposalBoxProps>(
    (props: WasteDisposalBoxProps, ref) => {
        const WasteDisposalBox = useGLTF(modelPath);
        const wasteDisposalBoxRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: WasteDisposalBoxRef["performAction"] = async (
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

        //performAction({WasteDisposalBox.animation, WasteDisposalBox.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...WasteDisposalBox.scene,
            ...wasteDisposalBoxRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={WasteDisposalBox.scene} scale={props.scale} />
            </group>
        );
    },
);