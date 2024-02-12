import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { AnalyticalBalanceLabSchema } from "./AnalyticalBalanceLabSchema";
import { InteractiveElement, ObjectInFocus } from "~/utils/types/types";
import { preload } from "react-dom";
import { SampleBottleModel } from "~/Models/SampleBottleModel";
import THREE from "three";
import { AnalyticalBalanceModelRef } from "~/Models/AnalyticalBalanceModel";

const modelPath = "./sample bottle body.gltf";

export default function Experience() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = AnalyticalBalanceLabSchema[currentStepIndex];

  const goToNextStep = () => {
    setCurrentStepIndex((prevIndex) =>
      Math.min(prevIndex + 1, AnalyticalBalanceLabSchema.length - 1),
    );
  };

  // Placeholder for a function that renders 3D objects based on type or properties

  //pass in as object
  const renderModel = (
    object: ObjectInFocus,
    index: React.Key | null | undefined,
  ) => {
    // TODO: Change any to model type
    // Implement rendering logic based on object type, e.g., using loaders for external models

    // const gltfFile = AnalyticalBalanceLabSchema[currentStepIndex]?.objectsInFocus[];
    // const gltf = object;

    // const gltf = useGLTF(modelPath);
    console.log(currentStepIndex);
    console.log(object); // print the right thing???
    // const clonedScene = gltf.scene.clone(); // Clone the scene for isolated use
    // const bottleRef = useRef();

    // return object;
    // return (
    //   <SampleBottleModel/>
    // );
    const Model = object.model;

    // Create a ref conditionally based on whether there are actions
    const modelRef =
      object.actions && object.actions.length > 0 ? useRef<any>(null) : null;

    const handleClick = () => {
      console.log("hit box triggered");
      console.log(Model);
      console.log(modelRef);

      // Model.performAction("open");
      modelRef?.current?.performAction(object.actions[0]!.actionName);
      // object.model.ref.performAction(
      //   object.actions[0]?.actionName,
      // )
    };
    return (
      <>
        <Box
          position={object.actions[0]?.hitbox.position}
          scale={object.actions[0]?.hitbox.scale}
          onClick={handleClick}
        >
          {/* <Box
                position={hitboxPosition}
                scale={hitboxScale}
                onClick={playAnimation}
              > */}
          <meshStandardMaterial />{" "}
          {/* <meshStandardMaterial transparent opacity={0.0} />{" "} */}
          {/* Invisible material */}
        </Box>
        <Model
          ref={modelRef} // This will either be a ref or null based on the existence of actions
          // Load in a ref here -- if there is action associated with the Object in focus
          {...object.modelProps}
        />{" "}
        // pass in props here
      </>
    );
    // useEffect(() => {
    // }, []);
    // return (
    //   <primitive
    //     // ref={bottleRef}
    //     // {...props}
    //     object={clonedScene}
    //     scale={1.3}
    //     opacity={0.8}
    //     rotation={[0, (3.14 / 180) * 90, 0]}
    // />
    // );
  };

  // A placeholder function to demonstrate concept
  function renderInteractiveElement(element: InteractiveElement) {
    switch (element.type) {
      case "textinput":
      case "image":
      case "quiz":
      // Handle other types of interactive elements as needed
      // return <TextualInteractiveComponent {...element} />;
      default:
        return null;
    }
  }

  // const {actions} = useAnimations(animations, clonedScene)
  // const playAnimation = () => {
  //   const animationName = "Animation"; // Replace with your actual animation name
  //   const action = actions[animationName];
  //   if (action) {
  //     action.reset().play();
  //     action.setEffectiveTimeScale(0.75); // Slowing down the animation to 75% of its original speed
  //     action.setLoop(THREE.LoopOnce, 1); // Setting the animation to play only once
  //     action.clampWhenFinished = true; // Clamp the animation at the end state
  //   }
  // };


  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 6, 0]} intensity={1} />

        {/* Render 3D models */}
        {currentStep?.objectsInFocus.map(
          (object: ObjectInFocus, index: React.Key | null | undefined) => (
            <React.Fragment key={index}>
              {renderModel(object, index)}
            </React.Fragment>
          ),
        )}

        {/* Render other interactive elements */}
        {currentStep?.interactiveElements?.map(
          (
            element: InteractiveElement,
            index: React.Key | null | undefined,
          ) => (
            <React.Fragment key={index}>
              {renderInteractiveElement(element)}
            </React.Fragment>
          ),
        )}
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.2)",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">
              {currentStep?.stepTitle}
            </h1>
            <p className="text-white">{currentStep?.directions}</p>
            <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
              {currentStep?.user_instructions ?? ""}
            </p>
          </div>
          <div className="ml-4 flex flex-col justify-between self-stretch">
            <button
              onClick={goToNextStep}
              className="mb-2 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
              // ref={nextButtonRef}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
useGLTF.preload(modelPath);
