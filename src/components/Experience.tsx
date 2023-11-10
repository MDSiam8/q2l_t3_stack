import { OrbitControls, PivotControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import Table from "./Table";
import { Html } from "@react-three/drei";
import { Float, Text } from "@react-three/drei";
import { Spatula } from "./Spatula";
import { Beaker } from "./Beaker";
// import '../styles/globals.css'
// import BalanceWithAnimations from "./BalanceWithAnimation.tsx";
import InventorySystem from "./InventorySystem";
import AnswerBox from "./AnswerBox";
// import StepSevenComponent from "./StepSevenComponent";
import { ReactThreeFiber, Overwrite } from "@react-three/fiber";
import BalanceWithAnimations from "./BalanceWithAnimations";
import WeighingPaper from "./WeighingPaper";
import { Bottle } from "./Bottle";
import { BottleCap } from "./BottleCap";

type OrbitControlsProps = ReactThreeFiber.Overwrite<
  ReactThreeFiber.Object3DNode<THREE.OrbitControls, typeof THREE.OrbitControls>,
  {
    target?: ReactThreeFiber.Vector3;
    enableDamping?: boolean;
    dampingFactor?: number;
    rotateSpeed?: number;
    maxPolarAngle?: number;
    minPolarAngle?: number;
    minDistance?: number;
    maxDistance?: number;
    panSpeed?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    zoomSpeed?: number;
    enablePan?: boolean;
    enableZoom?: boolean;
    enableRotate?: boolean;
    enabled?: boolean;
  }
>;

export default function Experience() {
  const [htmlText, setHtmlText] = useState<string>(
    "Welcome to our very first lab using React3Fiber! To begin, click on any of the objects...",
  );
  const controls = useRef<OrbitControlsProps>();

  const handleChemistryClick = () => {
    setHtmlText(
      "Wow look at all these lab items! I wonder what they could be used for... How about you try and talk with the friendly fox over there? It might be able to help.",
    );
  };

  const handleFoxClick = () => {
    setHtmlText(
      "Greetings fellow student... I am the wise all-knowing fox -- And using my wisdom, I am pleased to inform you that... this is a short demo meant to show CUHK a preview of the future!",
    );
  };

  const [showInventory, setShowInventory] = useState<boolean>(false);

  const toggleInventory = () => {
    setShowInventory(!showInventory);
  };

  const [showAnswerBox, setShowAnswerBox] = useState<boolean>(true);

  const handleCorrectAnswer = () => {
    // This function will be triggered when the countdown finishes in the AnswerBox
    setShowAnswerBox(false);
  };
  return (
    <>
      {/* <InventorySystem key={1} /> */}
      {showAnswerBox && (
        <AnswerBox
          question={"What is the reading on the analytical balance?"}
          correctAnswer={"10.00 g"}
          onCorrectAnswer={handleCorrectAnswer}
        />
      )}
      <OrbitControls ref={controls} makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.6} />
      {/* <StepSevenComponent /> */}
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={15}
      >
        <WeighingPaper position={[0,.15, .4]} rotation-x={3.14/180 * 90}  />
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Table scale={13} position-y={-1} />
      <mesh position={[0, 4.55, 0]} scale={1} onClick={handleChemistryClick}>
        {/* <BalanceWithAnimations />
         */}
        <BalanceWithAnimations />
      </mesh>
      <Html
        wrapperClass="label"
        position={[0, 8, 0]}
        center
        distanceFactor={15}
        occlude
      >
        <link href="./dist/output.css" rel="stylesheet" />
        <p>{htmlText}</p>
      </Html>

      <Spatula
        position={[2.4, 4.967, 0]}
        scale={.7}
        rotation-y={(90 * 3.1415) / 180}
      />
        <mesh position={[1.7, 4.9, -2.4]}>
            <Beaker />
        </mesh> 
        <BottleCap position={[1,5.9,2]} />
        <Bottle position={[1,4.9,2]}/>
    </>
  );
}
