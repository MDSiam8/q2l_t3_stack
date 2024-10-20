import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

import { GlassDropper } from "../models/GlassDropper";
import { Flask } from "../models/Flask";
import { Stopper } from "../models/Stopper" 
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { setNextEnabled } from "../Experience";


interface StopperRef {
replayAnimation: () => void;
}

interface EighteenthStepComponentProps {
nextButtonRef: React.RefObject<HTMLButtonElement>;
}

const Step18AttachStopper  = forwardRef<{}, EighteenthStepComponentProps>(
({ nextButtonRef }, ref) => {

const stopperRef = useRef<StopperRef>(null);
const stopperGroup = useRef(new THREE.Group());
const startPos = new THREE.Vector3(0, 1, 0);

useEffect(() => {
  stopperGroup.current.position.copy(startPos); // ensure initial position is start pos
}, []);

// for starting the animation as soon as the step starts
// useEffect(() => {
//   const animate = () => {
//     requestAnimationFrame(animate);
//     TWEEN.update();
//   };
//   requestAnimationFrame(animate);

//   handleReplayAnimation(); // Start the initial animation sequence
// }, []);

const moveStopperDown = () => {
  return new Promise((resolve) => {
    const downPosition = new THREE.Vector3(0, -1.55, 0); // Move down by 1 unit
    const endPosition = stopperGroup.current.position.clone().add(downPosition);

    new TWEEN.Tween(stopperGroup.current.position)
      .to(endPosition, 1500)
      .onUpdate(() => {
        stopperGroup.current.position.copy(stopperGroup.current.position);
      })
      .onComplete(() => resolve(0))
      .start();
  });
};

const handleReplayAnimation = async () => {
  stopperGroup.current.position.copy(startPos); // Reset to start position
  await moveStopperDown(); // move stopper down
  if(stopperRef.current){
    stopperRef.current.replayAnimation();
  }
};

useImperativeHandle(ref, () => ({
  replayAnimation: handleReplayAnimation,
}));

return (
  <group>
    <Flask
      position={[0.15, 5, 0]}
    />
    
    <group ref={stopperGroup}>
      <Stopper
        capped={false}
        rotation-x={(3.14 / 180) * 180}
        scale={0.5}
        ref={stopperRef}
        position={[0.15, 7.5, 0]}
        onClick={() => {
          stopperGroup.current.position.copy(startPos); // Ensure initial position is set

            const animate = () => {
              requestAnimationFrame(animate);
              TWEEN.update();
            };
            requestAnimationFrame(animate);

            // Start the initial animation sequence
            moveStopperDown().then(() => {
              if (stopperRef.current) {
                stopperRef.current.replayAnimation();
              }
            }).then(() => {
              setNextEnabled(nextButtonRef);
            });
        }}
      />
    </group>
  </group>
);
});


export default Step18AttachStopper;
