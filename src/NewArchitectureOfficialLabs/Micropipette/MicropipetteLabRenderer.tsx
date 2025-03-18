import React, { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, useGLTF } from "@react-three/drei";
import { InteractiveElement } from "~/utils/types/types";

import * as THREE from "three";
import gsap from "gsap";
import MicropipetteLabSchema from "./MicropipetteSchema";
import Cookies from "js-cookie";

// Preload the model (ensure the path is correct)
const modelPath = "./sample bottle body.gltf";
useGLTF.preload(modelPath);

interface ExperienceProps {
  currentStep: number;
  onStepChange: (newStep: number) => void;
}

export default function Experience({ currentStep, onStepChange }: ExperienceProps) {
  // Get current step data from the schema
  const currentStepData = MicropipetteLabSchema[currentStep - 1];

  const goToNextStep = () => {
    if (currentStep < MicropipetteLabSchema.length) {
      onStepChange(currentStep + 1);
      // Save the new step in a cookie if needed
      Cookies.set("micropipetteLabLastStep", String(currentStep + 1));
    }
  };

  function renderInteractiveElement(element: InteractiveElement) {
    switch (element.type) {
      case "textinput":
      case "image":
      case "quiz":
        // Handle these types as needed
        return null;
      default:
        return null;
    }
  }

  return (
    <div style={{ height: "100vh", position: "relative", backgroundColor: "#222" }}>
      <Suspense fallback={<div style={{ color: "white", textAlign: "center", paddingTop: "20vh" }}>Loading 3D scene...</div>}>
        <Canvas camera={{ fov: 45, position: [11.57, 10.1, -0.314] }} style={{ background: "#404040" }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 6, 0]} intensity={1} />

          {/* Render 3D models if not a custom step */}
          {!currentStepData?.customStep &&
            currentStepData?.labObjects?.map((object, index) => (
              <React.Fragment key={index}>
                <ModelRenderer object={object} index={index} />
              </React.Fragment>
            ))}

          {/* If there's a custom step component, render it */}
          {currentStepData?.customStep && <currentStepData.customStep />}

          {/* Render other interactive elements */}
          {currentStepData?.interactiveElements?.map((element, index) => (
            <React.Fragment key={index}>
              {renderInteractiveElement(element)}
            </React.Fragment>
          ))}
        </Canvas>
      </Suspense>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.2)",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div className="flex items-stretch justify-center">
          <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
            <h1 className="mb-2 text-lg text-white">{currentStepData?.stepTitle}</h1>
            <p className="text-white">{currentStepData?.directions}</p>
            <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
              {currentStepData?.user_instructions ?? ""}
            </p>
          </div>
          <div style={{ marginLeft: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <button
              onClick={goToNextStep}
              className="mb-2 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ModelRendererProps = {
  object: any;
  index: React.Key;
};

const ModelRenderer: React.FC<ModelRendererProps> = ({ object }) => {
  const modelRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    if (modelRef.current && object.actions?.[0]) {
      // Special condition: if action is "move"
      if (object.actions[0].actionName === "move") {
        const tl = gsap.timeline(object.actions[0].timeline?.defaults);
        const animations = object.actions[0].timeline?.sequence;
        animations?.forEach((animation : any) => {
          tl.to(modelRef.current!.position, animation.props);
        });
      } else {
        // Perform a custom action if defined
        (modelRef.current as any).performAction?.(object.actions[0].actionName);
      }
    }
  };

  useEffect(() => {
    // If action is set to auto, run the timeline on mount
    if (object.actions?.[0] && object.actions[0].auto && modelRef.current) {
      const tl = gsap.timeline(object.actions[0].timeline?.defaults);
      const animations = object.actions[0].timeline?.sequence;
      animations?.forEach((animation : any) => {
        tl.to(modelRef.current!.position, animation.props);
      });
    }
  }, [object.actions]);

  // Use a capitalized variable for the model component
  const ModelComponent = object.model;

  return (
    <>
      {object.actions?.[0] && !object.actions[0].auto ? (
        <>
          <Box
            position={object.actions[0].hitbox?.position || [0, 0, 0]}
            scale={object.actions[0].hitbox?.scale || [1, 1, 1]}
            onClick={handleClick}
          >
            <meshStandardMaterial />
          </Box>
          <ModelComponent ref={modelRef} {...object.modelProps} />
        </>
      ) : (
        <ModelComponent ref={modelRef} {...object.modelProps} />
      )}
    </>
  );
};
