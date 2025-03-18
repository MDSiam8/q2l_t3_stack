import { OrbitControls, useAnimations, useGLTF, Html } from "@react-three/drei";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Props } from "~/BaseComponents";
import { YellowP200MicropipetteRef } from "~/utils/types/ref-types";
import { ActionName, YellowP200MicropipetteProps } from "~/utils/types/types";
import performAction from "~/Models/model-utils";
import * as THREE from "three";

const modelPath = "./yellowP200micropipette.glb";

export const YellowP200MicropipetteModel = forwardRef<YellowP200MicropipetteRef, YellowP200MicropipetteProps>(
  (props: YellowP200MicropipetteProps, ref) => {
    const YellowP200Micropipette = useGLTF(modelPath);
    const yellowP200MicropipetteRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      performAction: performAction,
      ...YellowP200Micropipette.scene,
      ...yellowP200MicropipetteRef.current,
    }));

    return (
      <group {...props} position={props.startingPosition}>
        <primitive object={YellowP200Micropipette.scene} scale={props.scale} />
        {/* Circular label "P200" positioned above the model */}
        <Html
          transform
          position={[-0.02, 0.47, 0]}
          scale={0.12}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          <div className="rounded-full bg-white border border-gray-300 text-black text-[8px] w-6 h-6 flex items-center justify-center select-none">
            P200
          </div>
        </Html>
      </group>
    );
  }
);
