import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

import { PipetteStandRef } from "~/utils/types/ref-types";
import { ActionName, PipetteStandProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./PipetteStand_WA.glb"

export const PipetteStandModel = forwardRef<PipetteStandRef, PipetteStandProps>(
    (props: PipetteStandProps, ref) => {
        const PipetteStand = useGLTF(modelPath);
        const pipetteStandRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: PipetteStandRef["performAction"] = async (
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

        //performAction({PipetteStand.animation, PipetteStand.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...PipetteStand.scene,
            ...pipetteStandRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={PipetteStand.scene} scale={props.scale} />
            </group>
        );
    },
);