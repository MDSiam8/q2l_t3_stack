import React, { forwardRef } from "react";
import BalanceWithAnimations from "../models/BalanceWithAnimations";

const Step1Introduction = forwardRef((props, ref) => {
  return (
    <group>
      {/* The balance is positioned at the same coordinates as specified in the FourthStepComponent */}
      <BalanceWithAnimations position={[0, 4.55, 0]} isOpen={true} />
      {/* Additional elements specific to the first step can be added here */}
    </group>
  );
});

export default Step1Introduction;

// import React, {
//   useRef,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
//   useState,
// } from "react";
// import * as THREE from "three";
// import BalanceWithAnimations, { BalanceWithAnimationsHandles } from "../models/BalanceWithAnimations";
// import WeighingPaper, { WeighingPaperRef } from "../models/WeighingPaper";
// import { Bottle } from "../models/Bottle";
// import { BottleCap } from "../models/BottleCap";
// import { Spatula } from "../models/Spatula";
// import { Sphere } from "@react-three/drei";
// import AnswerBox from "../ui_overlay/AnswerBox";
// import { Beaker } from "../models/Beaker";

// interface EleventhStepComponentProps {
//   nextButtonRef: React.RefObject<HTMLButtonElement>;
// }

// const Step11ReadPaperWeight = forwardRef<
//   THREE.Group,
//   EleventhStepComponentProps
// >(({ nextButtonRef }, ref) => {
//   const balanceWithAnimationsRef = useRef<BalanceWithAnimationsHandles>(null);
//   const weighingPaperRef = useRef<THREE.Group>(null);
//   const sphereRef = useRef<THREE.Mesh>(null); // Assuming sphereRef is a ref to a THREE.Mesh
//   const [initialWeighingPaperPosition] = useState(new THREE.Vector3(0.6, 5.6, -0.02));
//   const [initialWeighingPaperRotation] = useState(new THREE.Euler(0, 3.14 / 180 * 180, 0));
//   const [initialSpherePos] = useState(new THREE.Vector3(0.01, 0.1, 0));
//   const [sphereScale, setSphereScale] = useState(0.0);
//   useEffect(() => {
//     updateBalanceReadingAfterAddingPowder(0.0012);
//     if (nextButtonRef && nextButtonRef.current) {
//       nextButtonRef.current.disabled = true; // Disable the button initially
//       nextButtonRef.current.style.opacity = "0.5";
//     }
//   }, []);

//   const updateBalanceReadingAfterAddingPowder = (num: number) => {
//     if (balanceWithAnimationsRef.current) {
//       balanceWithAnimationsRef.current.updateBalanceReading(num);
//     }
//   };

//   return (
//     <group>
//       <BalanceWithAnimations
//         isOpen={true}
//         position={[0, 4.55, 0]}
//         ref={balanceWithAnimationsRef}
//       />
//       <group position={[0.6, 5.6, -0.02]} ref={weighingPaperRef}>
//         <WeighingPaper folded={true} rotation-y={(3.14 / 180) * 180} />
//         <Sphere
//           ref={sphereRef}
//           scale={0.0}
//           position={[0.01, 0.1, 0]}
//           visible={true}
//         />
//       </group>
//       <group>
//         <BottleCap position={[2, 5.1, -2]} />
//       </group>
//       <group position={[2, 5, -2]}>
//         <Bottle />
//       </group>
//       <group>
//         <Spatula
//           rotation-y={(3.14 / 180) * 90}
//           scale={0.5}
//           position={[2.5, 5, 0]}
//         />
//         <Sphere scale={0.05} position={[0, 0.05, 0.68]} />
//       </group>
//       <group position={[2.6, 4.9, -3]}>
//         <Beaker rotation-y={(-3.14 / 180) * 90} />
//         <Sphere position={[-0.6, 0, -0.2]} scale={0.2} />
//       </group>
//       <group position={[0, 7, 3]} scale={0.5}>
//         <AnswerBox
//           question="What is the reading on the balance?"
//           correctAnswers={["0.0012 g", ".0012 g", "0.0012", ".0012", "0.0012g", ".0012g"]}
//           onCorrectAnswer={() => {
//             if (nextButtonRef && nextButtonRef.current) {
//               nextButtonRef.current.style.opacity = "1";
//               nextButtonRef.current.disabled = false; // Enable the button when the correct answer is given
//             }
//           }}
//         />
//       </group>
//     </group>
//   );
// });

// export default Step11ReadPaperWeight;
