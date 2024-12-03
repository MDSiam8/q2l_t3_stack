import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { useLoader } from "@react-three/fiber";

import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { setNextEnabled } from "../Experience";
import { MixedFlask } from "../models/MixedFlask";

interface NineteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step19MixSolution = forwardRef<{}, NineteenthStepComponentProps>(
  ({ nextButtonRef }, ref) => {
    const flaskStopperGroup = useRef(new THREE.Group());

    // Initial position of the flask stopper group
    const startPos = flaskStopperGroup.current.position;

    // Target position to move the flask stopper group
    const targetPosition = new THREE.Vector3(0.15, 14, 0); // (x: 0.15, y: 14, z: 0)

    // Target rotation around the X-axis in radians
    const targetRotationX = (3.14 / 180) * 180; // 180 degrees in radians

    // Initial rotation (flask upside down)
    const initialRotation = flaskStopperGroup.current.rotation.x; // Get initial rotation around X-axis

    let clickCount = 0; // counts amount of times flask has been clicked (mixed)

    // Create renderer, scene, and camera
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const [waterLevel, setWaterLevel] = useState(4);

    // Set renderer size and append to document
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Position the camera
    camera.position.z = 5;

    // Set the initial position of the flask stopper group
    useEffect(() => {
      flaskStopperGroup.current.position.copy(startPos);
    }, []);

    const handleReplayAnimation = () => {
      const moveToTarget = new TWEEN.Tween(flaskStopperGroup.current.position)
        .to(targetPosition, 1800) // Move to target position (x: 0.15, y: 14, z: 0) over 2000ms
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          // Once the first animation completes, move back to the original position and rotation
          const returnToOriginal = new TWEEN.Tween(
            flaskStopperGroup.current.position,
          )
            .to(startPos, 1800) // Move back to original position (x: 0, y: 1, z: 0) over 2000ms
            .easing(TWEEN.Easing.Quadratic.Out);

          const rotateBack = new TWEEN.Tween(flaskStopperGroup.current.rotation)
            .to({ x: initialRotation }, 2000) // Reset rotation to initial position over 2000ms
            .easing(TWEEN.Easing.Quadratic.Out);

          // Start both animations at the same time
          returnToOriginal.start();
          rotateBack.start();
        })
        .start();

      // Animate rotation to target rotation
      new TWEEN.Tween(flaskStopperGroup.current.rotation)
        .to({ x: targetRotationX }, 2000) // Rotate to target rotation (180 degrees) over 2000ms
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    };

    // Animation loop to handle TWEEN updates
    useEffect(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        // Update TWEEN animations
        TWEEN.update();

        // Render the scene
        renderer.render(scene, camera);
      };

      animate(); // Start the animation loop
    }, []);

    // Handle click event to trigger animation
    const handleClick = () => {
      if (clickCount < 4) {
        handleReplayAnimation();
        clickCount++; // Increment the click count // CHANGED THIS LINE
      }

      if (clickCount === 4) {
        setNextEnabled(nextButtonRef); // Enable the next button after the 4th click
      }
    };

    return (
      <group ref={flaskStopperGroup} onClick={handleClick}>
        <MixedFlask position={[0.15, 5, 0]} rotation={[0, 0, 0]} scale={0.5} />
        <Stopper
          capped={false}
          rotation-x={(3.14 / 180) * 180}
          scale={0.5}
          position={[0, 6.95, 0]}
        />
      </group>
    );
  },
);

export default Step19MixSolution;
