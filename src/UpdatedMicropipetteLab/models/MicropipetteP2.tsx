import { OrbitControls, useAnimations, useGLTF, Html } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { MicropipetteRef } from "~/utils/types/ref-types";
import { ActionName, HorizontalGelTankProps, MicropipetteProps } from "~/utils/types/types";
import performAction from "~/Models/model-utils";
import * as THREE from 'three';

const modelPath = "./redP2micropipette.glb";

export const MicropipetteP2Model = forwardRef<MicropipetteRef, MicropipetteProps>(
  (props: MicropipetteProps, ref) => {
    const micropipettep2 = useGLTF(modelPath);
    const MicropipetteRef = useRef<any>();
    
    const animations = useAnimations(micropipettep2.animations, micropipettep2.scene);
    const animationAction = useRef<THREE.AnimationAction | null>(null);

    const handleReplayAnimation = async () => {
      if (animationAction.current) {
        await animationAction.current.reset().fadeIn(0.5).play();
        animationAction.current.clampWhenFinished = true;
      }  
    };

    const performAction: MicropipetteRef["performAction"] = async (
      actionName: ActionName,
    ) => {
      const action = animations.actions ? animations.actions[actionName] : null;
      if (action) {
        animationAction.current = action;
        animationAction.current.setLoop(THREE.LoopOnce, 1);
        animationAction.current.clampWhenFinished = true;
      }
      return Promise.resolve();
    };

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      replayAnimation: handleReplayAnimation,
      ...micropipettep2.scene,
      ...MicropipetteRef.current,
    }));
    
    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={micropipettep2.scene} scale={props.scale ? props.scale : 9} />
        {/* Circular label "P2" positioned above the model */}
        <Html transform position={[-0.02, 0.47, 0]} scale={0.12} rotation={[-Math.PI / 2, 0, Math.PI/2]}>
          <div className="rounded-full bg-white border border-gray-300 text-black text-xs w-6 h-6 flex items-center justify-center select-none">
            P2
          </div>
        </Html>
      </group>
    );
  },
);
