import React, { forwardRef, useRef, useState } from "react";
import { gsap } from "gsap";
import { Group, Mesh } from "three"; // Import Group and Mesh from Three.js
import BalanceWithAnimations from "../models/BalanceWithAnimations";
import GlassPipette from "../models/GlassPipette";
import BeakerWaterFill from "../models/BeakerWaterFill";
import { FlaskWaterFill } from "../models/FlaskWaterFill";
import InventorySystem from "../ui_overlay/InventorySystem";
import WeighingPaper from "../models/WeighingPaper";
import { Beaker } from "../models/Beaker";
import { Spatula } from "../models/Spatula";
import { BottleCap } from "../models/BottleCap";
import { Bottle } from "../models/Bottle";
import { useGLTF } from "@react-three/drei";
import { setNextEnabled } from "../Experience";

interface SelectedItems {
  [itemName: string]: boolean;
}

interface EigthStepProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  selectedItems: SelectedItems;
}

const Step8TransferToFlask = forwardRef<HTMLDivElement, EigthStepProps>(
  ({ nextButtonRef, selectedItems }, ref) => {
    const pipetteRef = useRef<Group>(null!);
    const spheresRef = useRef<Group>(null!);
    const flaskRef = useRef<Group>(null!);
    const sphereRefs = useRef<Mesh[]>([]);

    const [startFlaskAnimation, setStartFlaskAnimation] = useState(9999);

    // Handle the click event
    const handleClick = () => {

      setStartFlaskAnimation(1.5);

      if (
        pipetteRef.current &&
        spheresRef.current &&
        flaskRef.current &&
        sphereRefs.current.length === 3 &&
        sphereRefs.current.every((sphere) => sphere)
      ) {
        const tl = gsap.timeline();
        // Move the pipette over the flask and tip it
        tl.to(pipetteRef.current.position, {
          x: 0,
          y: 9.5,
          z: 2,
          duration: 1,
        })
          .to(
            pipetteRef.current.rotation,
            {
              x: -Math.PI / 6, // Tip over slightly (-30 degrees)
              duration: 0.5,
            },
            "<"
          )
          // Make the spheres visible
          .set(spheresRef.current, { visible: true });

        // Reset spheres' positions
        sphereRefs.current.forEach((sphere) => {
          sphere.position.y = 0;
        });

        // Trigger flask animation when the first sphere begins dropping
        tl.call(
          () => {
            // Start flask animation here
            if (
              flaskRef.current &&
              flaskRef.current.children &&
              flaskRef.current.children.length > 0
            ) {
              const flaskMesh = flaskRef.current.children[0] as Mesh;
              if (flaskMesh.userData && flaskMesh.userData.playAnimation) {
                flaskMesh.userData.playAnimation();
              }
            }
          },
          [],
          "+=0" // Start immediately after tipping the pipette
        );

        // Animate each sphere dropping one after another
        sphereRefs.current.forEach((sphere, index) => {
          tl.to(
            sphere.position,
            {
              y:
                flaskRef.current!.position.y +
                0.2 -
                spheresRef.current!.position.y,
              duration: 0.5,
            },
            `+=${index * 0.3}` // Delay each drop by 0.3 seconds
          );
        });

        // Make the spheres disappear after all have dropped
        tl.to(spheresRef.current, { visible: false }, "+=0.5");
      } else {
        console.warn(
          "pipetteRef.current, spheresRef.current, flaskRef.current, or sphereRefs are not properly initialized"
        );
      }
    };

    return (
      <group>
        {/* Glass Pipette */}
        <group
          ref={pipetteRef}
          position={[0, 5, 0]}
          rotation={[0, 0, 0]}
          onClick={handleClick}
        >
          <GlassPipette />
        </group>

        {/* Blue spheres coming out of the pipette */}
        <group ref={spheresRef} position={[0, 9.55, 2]} visible={false}>
          {[...Array(3)].map((_, i) => (
            <mesh
              key={i}
              ref={(el) => {
                if (el) {
                  sphereRefs.current[i] = el;
                }
              }}
              position={[0, 0, 0]}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="blue" transparent opacity={1} />
            </mesh>
          ))}
        </group>

        {/* Flask */}
        <group
          ref={flaskRef}
          position={[0, 5, 2]}
          scale={[0.07, 0.07, 0.07]}
        >
          <FlaskWaterFill startAnimationDelay = {startFlaskAnimation}/>
        </group>
      </group>
    );
  }
);

export default Step8TransferToFlask;
