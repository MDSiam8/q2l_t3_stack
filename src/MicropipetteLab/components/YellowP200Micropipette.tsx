import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";

// ref goes here
import { YellowP200MicropipetteRef } from "~/utils/types/ref-types";
// props goes here
import { ActionName, YellowP200MicropipetteProps } from "~/utils/types/types";

import  performAction from "~/Models/model-utils";
import * as THREE from 'three'

const modelPath = "./yellowP200micropipette.glb"

// setup model (needs ref and props)
export const YellowP200MicropipetteModel = forwardRef<YellowP200MicropipetteRef, YellowP200MicropipetteProps>(
    (props: YellowP200MicropipetteProps, ref) => {
        const YellowP200Micropipette = useGLTF(modelPath);
        const yellowP200MicropipetteRef = useRef<any>();

        // animations not implemented atm
        // animations must be implemented for perform action

        // const performAction: YellowP200MicropipetteRef["performAction"] = async (
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

        //performAction({YellowP200Micropipette.animation, YellowP200Micropipette.scene, animationAction}, )

        useImperativeHandle(ref, () => ({
            performAction: performAction,
            // animations, when implemented
            ...YellowP200Micropipette.scene,
            ...yellowP200MicropipetteRef.current,
        }));

        return (
            <group {...props} position={props.startingPosition}>
                <primitive object={YellowP200Micropipette.scene} scale={props.scale} />
            </group>
        );
    },
);