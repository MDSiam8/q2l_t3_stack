import { OrbitControls, useAnimations, useGLTF, Html } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import performAction from "~/Models/model-utils";
import * as THREE from "three";
import { OrangeP20MicropipetteRef } from "~/utils/types/ref-types";
import { OrangeP20MicropipetteProps } from "~/utils/types/types";

const modelPath = "./orangeP20micropipette.glb";

export const OrangeP20MicropipetteModel = forwardRef<OrangeP20MicropipetteRef, OrangeP20MicropipetteProps>(
  (props: OrangeP20MicropipetteProps, ref) => {
    const OrangeP20Micropipette = useGLTF(modelPath);
    const orangeP20MicropipetteRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      ...OrangeP20Micropipette.scene,
      ...orangeP20MicropipetteRef.current,
    }));

    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={OrangeP20Micropipette.scene} scale={props.scale} />
        {/* Circular label "P20" positioned above the model */}
        <Html
          transform
          position={[-0.02, 0.47, 0]}
          scale={0.12}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <div className="rounded-full bg-white border border-gray-300 text-black text-[10px] w-6 h-6 flex items-center justify-center select-none">
            P20
          </div>
        </Html>
      </group>
    );
  },
);
