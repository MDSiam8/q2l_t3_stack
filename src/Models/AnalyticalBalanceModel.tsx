import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { ModelProps } from "~/utils/types/types";
// import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
// import { GLTFLoader } from 'three';

// Export the 3D model (this could be a path, a reference, or an object depending on your setup)
// export const AnalyticalBalanceModel = "path/to/analytical_balance_model.glb";

// Export action functions specific to the Analytical Balance
export const openBalance = () => {
  console.log("Examining the analytical balance.");
};
export const closeBalance = () =>
  console.log("Closing the analytical balance.");

interface AnalyticalBalanceModelProps extends ModelProps {
  isOpen: boolean;
  // Add any additional properties specific to AnalyticalBalanceModelProps here
}

// export interface BalanceWithAnimationsRef {
//   replayAnimation: () => Promise<void>;
//   updateBalanceReading: (weight: number) => void; // Assuming it's a function that takes a number
// }

export interface AnalyticalBalanceModelRef {
  performAction: (actionName: string) => Promise<void>; // Added a placeholder actionName parameter and return type
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
  //   as GLTF & {
  //     animations: THREE.AnimationClip[];
  //   };
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const examineAnimationRef = useRef<THREE.AnimationAction | null>(null);
  const balance = useGLTF("./balanceUpdated.gltf");
  const animations = useAnimations(balance.animations, balance.scene);
  const animationAction = useRef<THREE.AnimationAction | null>(null);
  const balanceReadingRef = useRef<any>(null);
  const { isOpen } = props;
  // const isOpen = false;
  //   useEffect(() => {
  const animationToPlay = isOpen ? "glassRAction.002" : "glassR.001Action";
  const action = animations.actions
    ? animations.actions[animationToPlay]
    : null;
  if (action) {
    animationAction.current = action;
    animationAction.current.setLoop(THREE.LoopOnce, 1);
  }

  if (balance.scene.children[3]) {
    balance.scene.children[3].visible = !isOpen;
  }
  if (balance.scene.children[17]) {
    balance.scene.children[17].visible = isOpen;
  }

  //     return () => {
  //       if (animationAction.current) {
  //         animationAction.current.fadeOut(0.5);
  //       }
  //     };
  //   }, [isOpen, balance.animations, animations.actions]);

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

  type ActionName = "open" | "close";

  const performAction: AnalyticalBalanceModelRef['performAction'] = async (actionName) => {
    if (actionName === "open") {
      // Logic for opening
      console.log("Opening...");
      const animationToPlay = "glassRAction.002";
        const action = animations.actions
          ? animations.actions[animationToPlay]
          : null;
        if (action) {
          animationAction.current = action;
          animationAction.current.setLoop(THREE.LoopOnce, 1);
        }
        action?.reset().play();
    } else if (actionName === "close") {
      // Logic for closing
      console.log("Closing...");
    }
    // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
    return Promise.resolve();
    // switch (name) {
    //   case "open":
    //     // Logic to open the balance
    //     console.log("Opening balance...");
    //     const animationToPlay = "glassRAction.002";
    //     const action = animations.actions
    //       ? animations.actions[animationToPlay]
    //       : null;
    //     if (action) {
    //       animationAction.current = action;
    //       animationAction.current.setLoop(THREE.LoopOnce, 1);
    //     }
    //     action?.reset().play();
    //     // Here, place your actual code to open the balance.
    //     // This might involve setting state, calling a method on a class, triggering animations, etc.
    //     break;
    //   case "close":
    //     // Logic to close the balance
    //     console.log("Closing balance...");
    //     // Similarly, place your actual code to close the balance here.
    //     break;
    //   default:
    //     // Optional: handle unknown actions
    //     console.warn(`Action "${name}" is not recognized.`);
    // }
  };

  useImperativeHandle(ref, () => ({
    performAction: performAction,
    replayAnimation: handleReplayAnimation,
    updateBalanceReading,
  }));

  const { position, ...restOfProps } = props;
  return (
    <group {...restOfProps}>
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
