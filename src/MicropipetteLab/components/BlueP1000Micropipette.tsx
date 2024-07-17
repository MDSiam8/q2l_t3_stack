import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { BlueP1000MicroPipetteRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, BlueP1000MicroPipetteProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./blueP1000micropipette.glb"

export const BlueP1000MicropipetteModel = forwardRef<BlueP1000MicroPipetteRef, BlueP1000MicroPipetteProps>(
    (props: BlueP1000MicroPipetteProps, ref) => {
        const BlueP1000Micropipette = useGLTF(modelPath);
        const blueP1000MicropipetteRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: BlueP1000MicropipetteRef["performAction"] = async (
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

        //performAction({BlueP1000Micropipette.animation, BlueP1000Micropipette.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...BlueP1000Micropipette.scene,
            ...blueP1000MicropipetteRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={BlueP1000Micropipette.scene} scale={props.scale} />
            </group>
        );
    },
);