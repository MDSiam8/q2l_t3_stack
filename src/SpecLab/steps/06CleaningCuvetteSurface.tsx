import { forwardRef, useRef, use, useEffect } from "react";
import { WipingPaper } from "../models/WipingPaper";
import { Cuvette } from "../models/Cuvette";
import { CuvetteCap } from "../models/CuvetteCap";
import gsap from "gsap";
import { Group } from "three";
import { setNextDisabled, setNextEnabled } from "../Experience";
import { DragControls } from "three/addons/controls/DragControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { start } from "repl";

interface Step5Props {
    nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step06CleaningCuvetteSurface = forwardRef<HTMLDivElement, Step5Props>(({nextButtonRef}, ref) => {
  const paperRef = useRef<Group>(null);
  const cuvetteRef = useRef<Group>(null);
  const dragControlsRef = useRef<DragControls | null>(null);
  const orbitControlsRef = useRef<OrbitControls | null>(null);
  var renderer = new THREE.WebGLRenderer
  setNextDisabled(nextButtonRef);


  const { camera, gl, scene } = useThree(); // Access Three.js context


  
    const startAnimation = () => {
      if (paperRef.current && cuvetteRef.current) {
        setNextDisabled(nextButtonRef);
  
        const timeline = gsap.timeline();
  
        // Rotate the cuvette to its side and maintain y-axis rotation
        //timeline.to(cuvetteRef.current.position, { z: 3.14159/180 * 90, duration: 1 });
        // timeline.to(cuvetteRef.current.rotation, { y:  3.14159/180 * 90, duration: 1 });
        
        
        // Store current y rotation before starting animation
        // const currentYRotation = cuvetteRef.current.rotation.y;
        // timeline.to(cuvetteRef.current.rotation, { x: Math.PI / 2, duration: 1 });
        // timeline.to(cuvetteRef.current.rotation, { y: currentYRotation, duration: 0 });

  
        //Wipe from left to right once
        const cuvetteRefZposition = cuvetteRef.current.position.z;
        const cuvetteRefXposition = cuvetteRef.current.position.x;
        timeline
        
          //paper wipe
          .to(paperRef.current.position, { z: -0.5, duration: 0.5 })
          .to(paperRef.current.position, { z: 0.5, duration: 1 })
          .to(paperRef.current.position, { z: 0, duration: 0.5 })

          
          //rotate to left 
          .to(paperRef.current.rotation, { y: 3.14159/180 * -90, duration: 0.5 })
          .to(paperRef.current.position, { x: -0.5, duration: 0.5 })
          .to(paperRef.current.position, { x: 0.5, duration: 1 })
          .to(paperRef.current.position, { x: 0, duration: 0.5 })

          //go back to get away from cuvette
          .to(paperRef.current.position, { x: cuvetteRefXposition - 1.5, duration: .5 })
          

          //rotate to back side
          .to(paperRef.current.rotation, { y: 0, duration: .5 })
          // get closer to cuvette
          .to(paperRef.current.position, { x: cuvetteRefXposition - .4, duration: .5 })

         
          .to(paperRef.current.position, { z: -0.5, duration: 0.5 })
          .to(paperRef.current.position, { z: 0.5, duration: 1 })
          .to(paperRef.current.position, { z: 0, duration: 0.5 })

          //rotate to right side
          .to(paperRef.current.position, { z: cuvetteRefZposition - .25, duration: .5 })
          .to(paperRef.current.rotation, { y: -3.14159/180 * 90, duration: 0.5 })
          //get closer to cuvette
          
          //paper wipe
          .to(paperRef.current.position, { x: -0.5, duration: 0.5 })
          .to(paperRef.current.position, { x: 0.5, duration: 1 })
          .to(paperRef.current.position, { x: 0, duration: 0.5 })

          // .to(paperRef.current.position, { z: 0 , duration: 1 })
          // .to(paperRef.current.position, { z: cuvetteRefZposition - 1, duration: 0.5 })
          // .to(paperRef.current.rotation, { y: 3.14159/180 * 90, duration: 0.5 })
          
          
          




          



          .call(() => {
            setNextEnabled(nextButtonRef);
          });

          //rotate the paper as you wipe each cuvette side/face ... 4 times instead of cuvette rotation
      }
    };

    // useEffect(() => {
    //   if (paperRef.current) {
    //     // Create an array of draggable objects (only wiping paper)
    //     const draggableObjects = [paperRef.current];
  
    //     // Initialize DragControls
    //     const dragControls = new DragControls(draggableObjects, camera, gl.domElement);
    //     dragControlsRef.current = dragControls;

    //     const orbitControls = new OrbitControls(camera, gl.domElement);
    //     orbitControlsRef.current = orbitControls;  
    //     // Optional: Add event listeners for drag start and drag end
    //     dragControls.addEventListener("dragstart", function (event) {
    //       console.log("start") // Highlight on drag
    //       // camera.position.set(0, 6, 0);
    //       // orbitControls.enabled = false;
    //       // orbitControls.enableRotate = false;
    //       // orbitControls.enablePan = false;
    //       // orbitControls.enableZoom = false;
    //       orbitControls.enabled = false;
          
    //     });
  
    //     dragControls.addEventListener("dragend", (event) => {
    //       console.log("end") // Reset highlight
    //       startAnimation();

    //       // orbitControls.enabled = true;
    //     });
  
    //     return () => {
    //       // Clean up DragControls
    //       console.log("clean up")
    //       dragControls.dispose();
    //       orbitControls.dispose();
    //     };
    //   }
    // }, [camera, gl]);
  
  
  return (
//     <group ref={cuvetteRef} position={[0,5,0]} rotation-y={3.14159/180 * 90} onClick={startAnimation}>
//     <Cuvette />
// </group>
    <group>
          {/* Cuvette group with fixed position */}
        <group ref={cuvetteRef}  >
          <Cuvette position={[-.3, 5.4, -.15]} />
          <CuvetteCap position={[-.53, 6.25, -.15]} rotation-x={3.14} />
        </group>
          <group
            ref={paperRef}
            // rotation-y={3.14159/180 * 90}
            onClick={startAnimation} // Add click event listener to start the animation
            position={[-0.2, 6, 0]}
          >
            <WipingPaper />
          </group>
    </group>        
  );
});


export default Step06CleaningCuvetteSurface;

