import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Html,
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import {
  InteractiveElement,
  LabObject,
  Action
} from "~/utils/types/types";
import { preload } from "react-dom";
import * as THREE from "three";
import Table from "~/AnalyticalBalanceLab/components/Table";
import gsap from "gsap";
import MicropipetteLabSchema from "./MicropipetteSchema";
import { useNavigate, useParams } from "react-router-dom";

const modelPath = "./sample bottle body.gltf";

// function isActionWithHitbox(action: Action): action is Action {
//   return "hitbox" in action;
// }

// function isActionWithTimeline(action: Action): action is ActionWithTimeline {
//   return "timeline" in action;
// }


export default function Experience() {
  const navigate = useNavigate();
  const { step } = useParams<{ step?: string }>();

  // Parse the current step from the URL or default to 0
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    const savedStep = localStorage.getItem("MicropipetteCurrentStep");
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const currentStep = MicropipetteLabSchema[currentStepIndex];

  // Sync step from the URL or restore from localStorage on component mount
  useEffect(() => {
    const urlStep = parseInt(step || ''); // Parse step from URL
    if (!isNaN(urlStep) && urlStep >= 0 && urlStep < MicropipetteLabSchema.length) {
      // Valid step from URL, update state and localStorage
      setCurrentStepIndex(urlStep);
      localStorage.setItem("MicropipetteCurrentStep", JSON.stringify(urlStep));
    } else {
      // Invalid step, redirect to saved or default step
      const savedStep = localStorage.getItem("MicropipetteCurrentStep") || "0";
      navigate(`/micropipette_lab/step/${savedStep}`, { replace: true });
    }
  }, [step, navigate]);
  
  useEffect(() => {
    // Ensure the step in the URL matches the current state
    if (step !== currentStepIndex.toString()) {
      navigate(`/micropipette_lab/step/${currentStepIndex}`, { replace: true });
    }
  }, [step, currentStepIndex, navigate]);
  

  const goToNextStep = () => {
    const nextStep = Math.min(currentStepIndex + 1, MicropipetteLabSchema.length - 1);
    setCurrentStepIndex(nextStep);
    localStorage.setItem("MicropipetteCurrentStep", nextStep.toString());
    navigate(`/micropipette_lab/step/${nextStep}`);
  };

  // Placeholder for a function that renders 3D objects based on type or properties

  // export default ModelRenderer;

  // console.log(object.actions[0]?);

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

  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        camera={{
          fov: 45,
          // near: 0.1,
          // far: 200,
          position: [11.57, 10.1, -0.314],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 6, 0]} intensity={1} />

        {/* Render 3D models */}
        {!currentStep?.customStep &&
          currentStep?.labObjects.map((object, index) => (
            <React.Fragment key={index}>
              <ModelRenderer object={object} index={index} />
            </React.Fragment>
          ))}

        {/* // Check for custom step */}
        {currentStep?.customStep && <currentStep.customStep />}
     
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

        {/* Common elements like Table */}
        <Table scale={13} position-y={-5.42} />
        {/* Green-yellow plane */}
        <mesh
          receiveShadow
          position-y={-5.56}
          rotation-x={-Math.PI * 0.5}
          scale={65}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
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
              disabled={currentStepIndex === MicropipetteLabSchema.length - 1}
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
  object: LabObject;
  index: React.Key;
};

const ModelRenderer: React.FC<ModelRendererProps> = ({ object }) => {
  const modelRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    if (
      modelRef.current &&
      "performAction" in modelRef.current &&
      object.actions?.[0]
    ) {
      console.log("modelRef.current position ", modelRef.current.position);

      // Special condition if it is move animation
      if (object.actions[0].actionName === "move") {
        const innerModelRef = modelRef.current;
        console.log("current model ref", innerModelRef);
        console.log("modelRef", modelRef);
        console.log("modelRef position", modelRef.current.position);
        // console.log
        // Add timeline here?
        if (modelRef.current) {
          // const tl = gsap.timeline({ delay: 0 });
          // tl.to(modelRef.current.position, { y: "+=4", duration: 1 }).to(
          //   modelRef.current.position,
          //   { x: "+=.2", z: "-=2.6", duration: 1 },
          // );
          console.log(object.actions[0].timeline);
          const tl = gsap.timeline(object!.actions[0].timeline!.defaults);
          const animations = object!.actions[0].timeline!.sequence
          animations.forEach(animation => {
            tl.to(modelRef.current!.position, animation.props);
          });
          // const tl = gsap.timeline({ delay: 0 });
          // tl.to(modelRef.current.position, { y: "+=4", duration: 1 }).to(
          //   modelRef.current.position,
          //   { x: "+=.2", z: "-=2.6", duration: 1 },
          // );
        }
      }
      // Otherwise, let it do its custom animation
      else {
        (modelRef.current as any).performAction(object.actions[0].actionName);
      }
    }
  };

  useEffect(() => {
    if (
      object.actions?.[0] &&
      // isActionWithTimeline(object.actions[0]) &&
      modelRef.current &&
      object.actions?.[0].auto
    ) {
      // const timeline = gsap.timeline({ delay: 1 });
      // const animations = [
      //   {
      //     target: modelRef.current.position,
      //     params: { y: "+=4", duration: 1 }
      //   },
      //   {
      //     target: modelRef.current.position,
      //     params: { x: "+=.2", z: "-=2.6", duration: 1 }
      //   }
      // ];

      const tl = gsap.timeline(object!.actions[0].timeline!.defaults);
      const animations = object!.actions[0].timeline!.sequence;
      animations.forEach((animation) => {
        tl.to(modelRef.current!.position, animation.props);
      });

      // timeline
      //   .to(modelRef.current.position, { y: "+=4", duration: 1 })
      //   .to(modelRef.current.position, {
      //     x: "+=.2",
      //     z: "-=2.6",
      //     duration: 1,
      //   });
    }
  }, [object.actions]);

  return (
    <>
      {(object.actions?.[0] && !object.actions[0].auto) ? (
        <>
          <Box
            position={object.actions[0].hitbox?.position ?? [0, 0, 0]}
            scale={object.actions[0].hitbox?.scale ?? [1, 1, 1]}
            onClick={handleClick}
          >
            <meshStandardMaterial />
          </Box>
          <object.model ref={modelRef} {...object.modelProps} />
          {/* <group ref={modelRef}>
            <object.model {...object.modelProps} />
          </group> */}
        </>
      ) : (
        <object.model ref={modelRef} {...object.modelProps} />
      )}
    </>
  );
  // <group ref={modelRef}>
  //   <object.model {...object.modelProps} />
  // </group>
};

useGLTF.preload(modelPath);
