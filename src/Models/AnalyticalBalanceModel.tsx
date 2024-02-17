import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { ActionName, ModelProps } from "~/utils/types/types";
// import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
// import { GLTFLoader } from 'three';


interface AnalyticalBalanceModelProps extends ModelProps {
  isOpen: boolean;
  // Add any additional properties specific to AnalyticalBalanceModelProps here
}

// export interface BalanceWithAnimationsRef {
//   replayAnimation: () => Promise<void>;
//   updateBalanceReading: (weight: number) => void; // Assuming it's a function that takes a number
// }

export interface AnalyticalBalanceModelRef {
  performAction: (actionName: ActionName) => Promise<void>; // Added a placeholder actionName parameter and return type
  replayAnimation: () => Promise<void>;
  updateBalanceReading: (weight: number) => void;
}

const modelPath = "./balanceUpdated.gltf";
// export const SampleBottleModel = ({...props} : ModelProps) => {
//   const { scene } = useGLTF("/sample bottle body.gltf");
//   console.log(props);

//   // Assuming ModelProps includes properties like scale, opacity, and rotation
//   // We need to transform these props into a format suitable for <primitive>
//   // Note: 'opacity' might not directly apply to <primitive>, it typically applies to materials
//   const meshProps = {
//       scale: props.scale, // Assuming scale is a number for uniform scaling, adjust if it's an array
//       // 'opacity' handling would depend on modifying the material of the loaded model
//       rotation: props.rotation, // Assuming rotation is an array [x, y, z]
//   };
//   return <primitive object={scene} {...meshProps} />;
//   // scale={1.3}
//   // opacity={0.8}
//   // rotation={[0, (3.14 / 180) * 90, 0]}/>;
// };
export const AnalyticalBalanceModel = forwardRef<
  AnalyticalBalanceModelRef,
  AnalyticalBalanceModelProps
>((props: AnalyticalBalanceModelProps, ref) => {
  const gltf = useGLTF(modelPath);

  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const examineAnimationRef = useRef<THREE.AnimationAction | null>(null);
  const balance = useGLTF("./balanceUpdated.gltf");
  const animations = useAnimations(balance.animations, balance.scene);
  const animationAction = useRef<THREE.AnimationAction | null>(null);
  const balanceReadingRef = useRef<any>(null);
  const { isOpen } = props;

  if (balance.scene.children[3]) {
    balance.scene.children[3].visible = !isOpen;
  }
  if (balance.scene.children[17]) {
    balance.scene.children[17].visible = isOpen;
  }

  const handleReplayAnimation = async () => {
    if (animationAction.current) {
      await animationAction.current.reset().fadeIn(0.5).play();
      animationAction.current.clampWhenFinished = true;
    }
  };

  const updateBalanceReading = (weight: number) => {
    if (balanceReadingRef.current) {
      balanceReadingRef.current.setWeight(weight);
    }
  };


  const performAction: AnalyticalBalanceModelRef["performAction"] = async (
    actionName: ActionName,
  ) => {
    if (actionName === "open") {
      // Logic for opening
      console.log("Opening...");
    } else if (actionName === "close") {
      // Logic for closing
      console.log("Closing...");
    }
    // Will need to check for Open or Close actions in the future!!
    const animationToPlay = actionName === "open" ? "glassRAction.002" : "glassRAction.001" 
    const action = animations.actions
      ? animations.actions[animationToPlay]
      : null;
    if (action) {
      animationAction.current = action;
      animationAction.current.setLoop(THREE.LoopOnce, 1);
      animationAction.current.clampWhenFinished = true;
    }
    action?.reset().play();
    // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
    return Promise.resolve();
  };

  useImperativeHandle(ref, () => ({
    performAction: performAction,
    replayAnimation: handleReplayAnimation,
    updateBalanceReading,
  }));

  // const { startingPosition, ...restOfProps } = props;
  return (
    <group {...props} position={props.startingPosition}>
      <primitive object={balance.scene} scale={0.6} />
      {/* <BalanceReading ref={balanceReadingRef} /> */}
    </group>
  );
  // useEffect(() => {
  //   if (actions['glassR.001Action']) {
  //     examineAnimationRef.current = actions['glassR.001Action'];
  //     examineAnimationRef.current.clampWhenFinished = true;
  //     examineAnimationRef.current.loop = THREE.LoopOnce;
  //   }
  // }, [actions]);

  // useImperativeHandle(ref, () => ({
  //   examineBalance: () => {
  //     examineAnimationRef.current?.reset().play();
  //   },
  // }));

  //   const meshProps = {
  //     scale: props.scale, // Assuming scale is a number for uniform scaling, adjust if it's an array
  //     // 'opacity' handling would depend on modifying the material of the loaded model
  //     rotation: props.rotation, // Assuming rotation is an array [x, y, z]
  // };

  // return <primitive object={gltf.scene} {...meshProps} isOpen={false}/>;
});

// Ensure the GLTF model is preloaded
useGLTF.preload(modelPath);
