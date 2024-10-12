// import React, { useEffect, useRef, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Box,
//   Html,
//   OrbitControls,
//   useAnimations,
//   useGLTF,
// } from "@react-three/drei";
// import { AnalyticalBalanceLabSchema } from "./AnalyticalBalanceLabSchema";
// import {
//   Action,
//   ActionWithTimeline,
//   InteractiveElement,
//   LabObject,
//   Action,
// } from "~/utils/types/types";
// import { preload } from "react-dom";
// import THREE, { Camera } from "three";
// import Table from "~/AnalyticalBalanceLab/components/Table";
// import gsap from "gsap";

// const modelPath = "./sample bottle body.gltf";

// function isActionWithHitbox(action: Action): action is Action {
//   return "hitbox" in action;
// }

// function isActionWithTimeline(action: Action): action is ActionWithTimeline {
//   return "timeline" in action;
// }

// // Function to initialize animations
// const initializeAnimations = (actions: any[]) => {
//   actions.forEach((action) => {
//     const tl = gsap.timeline(action.timeline.defaults);
//     action.timeline.sequence.forEach(
//       (seq: {
//         target: gsap.TweenTarget;
//         animation: gsap.TweenVars;
//         position: gsap.Position | undefined;
//       }) => {
//         tl.to(seq.target, seq.animation, seq.position);
//       },
//     );

//     // Optionally store or return the timeline if you need to control it later
//   });
// };
// export default function Experience() {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const currentStep = AnalyticalBalanceLabSchema[currentStepIndex];

//   const goToNextStep = () => {
//     setCurrentStepIndex((prevIndex) =>
//       Math.min(prevIndex + 1, AnalyticalBalanceLabSchema.length - 1),
//     );
//   };

//   // Placeholder for a function that renders 3D objects based on type or properties

//   type ModelRendererProps = {
//     object: LabObject;
//     index: React.Key;
//   };
//   const ModelRenderer: React.FC<ModelRendererProps> = ({ object }) => {
//     const modelRef = useRef<THREE.Mesh>(null);

//     const handleClick = () => {
//       if (
//         modelRef.current &&
//         "performAction" in modelRef.current &&
//         object.actions?.[0]
//       ) {
//         console.log("modelRef.current position ", modelRef.current.position);

//         // Special condition if it is move animation
//         if (object.actions[0].actionName === "move") {
//           const innerModelRef = modelRef.current;
//           console.log("current model ref", innerModelRef);
//           console.log("modelRef", modelRef);
//           console.log("modelRef position", modelRef.current.position);
//           // console.log
//           // Add timeline here?
//           if (modelRef.current) {
//             // const tl = gsap.timeline({ delay: 0 });
//             // tl.to(modelRef.current.position, { y: "+=4", duration: 1 }).to(
//             //   modelRef.current.position,
//             //   { x: "+=.2", z: "-=2.6", duration: 1 },
//             // );
//             console.log(object.actions[0].timeline);
//             const tl = gsap.timeline(object.actions[0].timeline.defaults);
//             const animations = object.actions[0].timeline.sequence
//             animations.forEach(animation => {
//               tl.to(modelRef.current.position, animation.props);
//             });
//             // const tl = gsap.timeline({ delay: 0 });
//             // tl.to(modelRef.current.position, { y: "+=4", duration: 1 }).to(
//             //   modelRef.current.position,
//             //   { x: "+=.2", z: "-=2.6", duration: 1 },
//             // );
//           }
//         }
//         // Otherwise, let it do its custom animation
//         else {
//           (modelRef.current as any).performAction(object.actions[0].actionName);
//         }
//       }
//     };

//     useEffect(() => {
//       if (
//         object.actions?.[0] &&
//         isActionWithTimeline(object.actions[0]) &&
//         modelRef.current
//       ) {
//         // const timeline = gsap.timeline({ delay: 1 });
//         // const animations = [
//         //   {
//         //     target: modelRef.current.position,
//         //     params: { y: "+=4", duration: 1 }
//         //   },
//         //   {
//         //     target: modelRef.current.position,
//         //     params: { x: "+=.2", z: "-=2.6", duration: 1 }
//         //   }
//         // ];

//         // const tl = gsap.timeline(object.actions[0].timeline.defaults);
//         // const animations = object.actions[0].timeline.sequence;
//         // animations.forEach((animation) => {
//         //   tl.to(modelRef.current.position, animation.props);
//         // });

//         // timeline
//         //   .to(modelRef.current.position, { y: "+=4", duration: 1 })
//         //   .to(modelRef.current.position, {
//         //     x: "+=.2",
//         //     z: "-=2.6",
//         //     duration: 1,
//         //   });
//       }
//     }, [object.actions]);

//     return (
//       <>
//         {object.actions?.[0] && isActionWithHitbox(object.actions[0]) ? (
//           <>
//             <Box
//               position={object.actions[0].hitbox.position}
//               scale={object.actions[0].hitbox.scale}
//               onClick={handleClick}
//             >
//               <meshStandardMaterial />
//             </Box>
//             <object.model ref={modelRef} {...object.modelProps} />
//             {/* <group ref={modelRef}>
//               <object.model {...object.modelProps} />
//             </group> */}
//           </>
//         ) : (
//           <object.model ref={modelRef} {...object.modelProps} />
//         )}
//       </>
//     );
//     // <group ref={modelRef}>
//     //   <object.model {...object.modelProps} />
//     // </group>
//   };

//   // export default ModelRenderer;

//   // console.log(object.actions[0]?);

//   // A placeholder function to demonstrate concept
//   function renderInteractiveElement(element: InteractiveElement) {
//     switch (element.type) {
//       case "textinput":
//       case "image":
//       case "quiz":
//       // Handle other types of interactive elements as needed
//       // return <TextualInteractiveComponent {...element} />;
//       default:
//         return null;
//     }
//   }

//   // const {actions} = useAnimations(animations, clonedScene)
//   // const playAnimation = () => {
//   //   const animationName = "Animation"; // Replace with your actual animation name
//   //   const action = actions[animationName];
//   //   if (action) {
//   //     action.reset().play();
//   //     action.setEffectiveTimeScale(0.75); // Slowing down the animation to 75% of its original speed
//   //     action.setLoop(THREE.LoopOnce, 1); // Setting the animation to play only once
//   //     action.clampWhenFinished = true; // Clamp the animation at the end state
//   //   }
//   // };
//   return (
//     <div style={{ height: "100vh" }}>
//       <Canvas
//         camera={{
//           fov: 45,
//           // near: 0.1,
//           // far: 200,
//           position: [11.57, 10.1, -0.314],
//         }}
//       >
//         <OrbitControls />
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[0, 6, 0]} intensity={1} />

//         {/* Render 3D models */}
//         {/* {!currentStep?.customStep &&
//           currentStep?.objectsInFocus.map(
//             (object: ObjectInFocus, index: React.Key | null | undefined) => (
//               <React.Fragment key={index}>
//                 {renderModel(object, index)}
//               </React.Fragment>
//             ),
//           )} */}

//         {!currentStep?.customStep &&
//           currentStep?.labObjects.map((object, index) => (
//             <React.Fragment key={index}>
//               <ModelRenderer object={object} index={index} />
//             </React.Fragment>
//           ))}

//         {currentStep?.customStep && <currentStep.customStep />}
//         {/* // Check for custom step */}
//         {/* if (currentStep?.customStep) {
//     console.log("custom step!", currentStep?.customStep)
//     const CustomStepComponent = currentStep.customStep;
//     // Ensure CustomStepComponent is a valid React element
//     return <CustomStepComponent />;
//   } */}
//         {/* Render other interactive elements */}
//         {currentStep?.interactiveElements?.map(
//           (
//             element: InteractiveElement,
//             index: React.Key | null | undefined,
//           ) => (
//             <React.Fragment key={index}>
//               {renderInteractiveElement(element)}
//             </React.Fragment>
//           ),
//         )}

//         {/* Common elements like Table */}
//         <Table scale={13} position-y={-5.42} />
//         {/* Green-yellow plane */}
//         <mesh
//           receiveShadow
//           position-y={-5.56}
//           rotation-x={-Math.PI * 0.5}
//           scale={65}
//         >
//           <planeGeometry />
//           <meshStandardMaterial color="greenyellow" />
//         </mesh>
//       </Canvas>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           right: 0,
//           background: "rgba(0, 0, 0, 0.2)",
//           padding: "20px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           userSelect: "none",
//         }}
//       >
//         <div className="flex items-stretch justify-center">
//           <div className="w-lg rounded-lg bg-gray-700 bg-opacity-80 p-6 text-center backdrop-blur-sm">
//             <h1 className="mb-2 text-lg text-white">
//               {currentStep?.stepTitle}
//             </h1>
//             <p className="text-white">{currentStep?.directions}</p>
//             <p className="pt-2 font-mono text-xs font-extralight text-fuchsia-300">
//               {currentStep?.user_instructions ?? ""}
//             </p>
//           </div>
//           <div className="ml-4 flex flex-col justify-between self-stretch">
//             <button
//               onClick={goToNextStep}
//               className="mb-2 flex-grow transform rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
//               // ref={nextButtonRef}
//             >
//               Next Step
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// useGLTF.preload(modelPath);
