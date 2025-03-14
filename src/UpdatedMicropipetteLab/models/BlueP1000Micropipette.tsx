import { OrbitControls, useAnimations, useGLTF, Html } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { BlueP1000MicroPipetteRef } from "~/utils/types/ref-types";
import { ActionName, BlueP1000MicroPipetteProps } from "~/utils/types/types";
import performAction from "~/Models/model-utils";
import * as THREE from "three";

const modelPath = "./blueP1000micropipette.glb";

export const BlueP1000MicropipetteModel = forwardRef<BlueP1000MicroPipetteRef, BlueP1000MicroPipetteProps>(
  (props: BlueP1000MicroPipetteProps, ref) => {
    const blueP1000Micropipette = useGLTF(modelPath);
    const blueP1000MicropipetteRef = useRef<any>();

    // animations not implemented atm; performAction is used as is
    useImperativeHandle(ref, () => ({
      performAction: performAction,
      ...blueP1000Micropipette.scene,
      ...blueP1000MicropipetteRef.current,
    }));

    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={blueP1000Micropipette.scene} scale={props.scale} />
        {/* Circular label "P1000" positioned above the model */}
        <Html 
          transform 
          position={[-0.02, 0.47, 0]} 
          scale={0.12} 
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <div className="rounded-full bg-white border border-gray-300 text-black text-[8px] w-6 h-6 flex items-center justify-center select-none">
            P1000
          </div>
        </Html>
      </group>
    );
  },
);
