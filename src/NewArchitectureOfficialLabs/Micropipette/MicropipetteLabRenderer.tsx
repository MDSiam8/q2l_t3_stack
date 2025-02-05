import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Table from "~/AnalyticalBalanceLab/components/Table";
import gsap from "gsap";
import MicropipetteLabSchema from "./MicropipetteSchema";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Preload the model (ensure the path is correct)
const modelPath = "./sample bottle body.gltf";
useGLTF.preload(modelPath);

// Log the schema so we know it’s being imported
console.log("MicropipetteLabSchema:", MicropipetteLabSchema);

export default function Experience() {
  console.log("Experience component mounted");
  const { step } = useParams<{ step?: string }>();
  const navigate = useNavigate();

  // If the schema is empty, MAX_STEP will be 0
  const MAX_STEP =
    MicropipetteLabSchema && MicropipetteLabSchema.length > 0
      ? MicropipetteLabSchema.length - 1
      : 0;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Set the step index from the URL parameter or from a cookie
  useEffect(() => {
    const urlStep = step ? parseInt(step, 10) : NaN;
    const cookieValue = Cookies.get("micropipetteLabLastStep");
    const cookieStep = cookieValue ? parseInt(cookieValue, 10) : NaN;
    let newStepIndex = 0;

    if (!isNaN(urlStep) && urlStep >= 0 && urlStep <= MAX_STEP) {
      newStepIndex = urlStep;
    } else if (!isNaN(cookieStep) && cookieStep >= 0 && cookieStep <= MAX_STEP) {
      newStepIndex = cookieStep;
    }

    console.log("Setting currentStepIndex to:", newStepIndex);
    setCurrentStepIndex(newStepIndex);

    if (urlStep !== newStepIndex) {
      navigate(`/step/${newStepIndex}`, { replace: true });
    }
    Cookies.set("micropipetteLabLastStep", String(newStepIndex));
  }, [step, navigate, MAX_STEP]);

  const goToNextStep = () => {
    if (currentStepIndex < MAX_STEP) {
      const nextStep = currentStepIndex + 1;
      setCurrentStepIndex(nextStep);
      Cookies.set("micropipetteLabLastStep", String(nextStep));
      navigate(`/step/${nextStep}`);
    }
  };

  const currentStep = MicropipetteLabSchema && MicropipetteLabSchema[currentStepIndex];

  if (!currentStep) {
    return (
      <div style={{ height: "100vh", backgroundColor: "#333", color: "white" }}>
        <h1>No steps defined in MicropipetteLabSchema.</h1>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", position: "relative", backgroundColor: "#222" }}>
      <Suspense fallback={<div style={{ color: "white", textAlign: "center", paddingTop: "20vh" }}>Loading 3D scene...</div>}>
        <Canvas
          camera={{ fov: 45, position: [11.57, 10.1, -0.314] }}
          style={{ background: "#404040" }}
        >
          {/* Ensure the canvas background is set */}
          <color attach="background" args={["#404040"]} />
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 6, 0]} intensity={1} />

          {/* Render lab objects if there is no custom step component */}
          {!currentStep.customStep &&
            currentStep.labObjects &&
            currentStep.labObjects.map((object: any, index: number) => (
              <React.Fragment key={index}>
                <ModelRenderer object={object} index={index} />
              </React.Fragment>
            ))
          }

          {/* Render the custom step component if defined */}
          {currentStep.customStep && <currentStep.customStep />}

          {/* Render any interactive elements (currently a placeholder) */}
          {currentStep.interactiveElements &&
            currentStep.interactiveElements.map((element: any, index: number) => (
              <React.Fragment key={index}>
                {renderInteractiveElement(element)}
              </React.Fragment>
            ))
          }

          {/* Common scene elements */}
          <Table scale={13} position-y={-5.42} />
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
        <div style={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
          <div style={{ width: "20rem", borderRadius: "0.5rem", backgroundColor: "rgba(55,55,55,0.8)", padding: "1.5rem", textAlign: "center", backdropFilter: "blur(5px)" }}>
            <h1 style={{ marginBottom: "0.5rem", fontSize: "1.125rem", color: "white" }}>
              {currentStep.stepTitle}
            </h1>
            <p style={{ color: "white" }}>{currentStep.directions}</p>
            <p style={{ paddingTop: "0.5rem", fontFamily: "monospace", fontSize: "0.75rem", color: "fuchsia" }}>
              {currentStep.user_instructions || ""}
            </p>
          </div>
          <div style={{ marginLeft: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <button
              onClick={goToNextStep}
              style={{
                marginBottom: "0.5rem",
                flexGrow: 1,
                transform: "scale(1)",
                borderRadius: "0.5rem",
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                padding: "0.5rem 1rem",
                fontWeight: "bold",
                color: "white",
                transition: "transform 0.3s",
                cursor: "pointer"
              }}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder for interactive elements rendering
function renderInteractiveElement(element: any) {
  switch (element.type) {
    case "textinput":
    case "image":
    case "quiz":
      return null;
    default:
      return null;
  }
}

type ModelRendererProps = {
  object: any;
  index: React.Key;
};

const ModelRenderer: React.FC<ModelRendererProps> = ({ object }) => {
  const modelRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    if (
      modelRef.current &&
      object.actions &&
      object.actions[0]
    ) {
      console.log("Model clicked at position:", modelRef.current.position);
      if (object.actions[0].actionName === "move") {
        const tl = gsap.timeline(object.actions[0].timeline?.defaults);
        const animations = object.actions[0].timeline?.sequence;
        animations &&
          animations.forEach((animation: any) => {
            tl.to(modelRef.current!.position, animation.props);
          });
      } else {
        (modelRef.current as any).performAction(object.actions[0].actionName);
      }
    }
  };

  useEffect(() => {
    if (
      modelRef.current &&
      object.actions &&
      object.actions[0] &&
      object.actions[0].auto
    ) {
      const tl = gsap.timeline(object.actions[0].timeline?.defaults);
      const animations = object.actions[0].timeline?.sequence;
      animations &&
        animations.forEach((animation: any) => {
          tl.to(modelRef.current!.position, animation.props);
        });
    }
  }, [object.actions]);

  return (
    <>
      {object.actions && object.actions[0] && !object.actions[0].auto ? (
        <>
          <Box
            position={object.actions[0].hitbox?.position || [0, 0, 0]}
            scale={object.actions[0].hitbox?.scale || [1, 1, 1]}
            onClick={handleClick}
          >
            <meshStandardMaterial />
          </Box>
          <object.model ref={modelRef} {...object.modelProps} />
        </>
      ) : (
        <object.model ref={modelRef} {...object.modelProps} />
      )}
    </>
  );
};

export {};
