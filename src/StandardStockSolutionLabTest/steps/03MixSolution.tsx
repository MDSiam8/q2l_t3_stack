import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
  } from "react";
  

  import { Flask } from "../models/Flask";
  import { Stopper } from "../models/Stopper" 
  import * as THREE from "three";
  import * as TWEEN from "@tweenjs/tween.js";
  import { setNextEnabled } from "../Experience";
  
  
  interface FlaskRef {
  replayAnimation: () => void;
  }
  
  interface NineteenthStepComponentProps {
  nextButtonRef: React.RefObject<HTMLButtonElement>;
  }
  
  const Step19MixSolution  = forwardRef<{}, NineteenthStepComponentProps>(
  ({ nextButtonRef }, ref) => {
  
  const flaskRef = useRef<FlaskRef>(null);
  const flaskStopperGroup = useRef(new THREE.Group());
  const stopper = useRef(new THREE.Group());
  const flask = useRef(new THREE.Group());
  const startPos = new THREE.Vector3(0, 0, 0);
  const scene = useRef(new THREE.Scene());
  
 
//actual
//   useEffect(() => {
//     flaskStopperGroup.current.position.copy(startPos); // ensure initial position is start pos
//   }, []);

//while coding
useEffect(() => {
  const animate = () => {
    requestAnimationFrame(animate);
    TWEEN.update();
  };
  requestAnimationFrame(animate);

  handleReplayAnimation(); // Start the initial animation sequence
}, []);

//make all of this into one function like in step 7

    const animateFlask = () => {
        return new Promise((resolve) => {

            //move flask up
            const downPosition = new THREE.Vector3(0, 1.55, 0); // Move down by 1 unit
            const endPosition = flaskStopperGroup.current.position.clone().add(downPosition);
            new TWEEN.Tween(flaskStopperGroup.current.position)
            .to(endPosition, 1500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
            flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
            })
            //.onComplete(() => resolve(0))
            .start();

            //rotate flask upside down
            setTimeout(() =>{
                new TWEEN.Tween(flaskStopperGroup.current.rotation)
                .to({ x: -(3.14 / 180) * 180 }, 1500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
            }, 1000);

            setTimeout(() =>{
                new TWEEN.Tween(flaskStopperGroup.current.position)
                .to(endPosition, 1500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                  flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
                })
                .onComplete(() => resolve(0))
                .start();
            }, 1000);
        })
    }
  const moveFlaskUp = () => {
    return new Promise((resolve) => {
      const downPosition = new THREE.Vector3(0, 2.5, 0); // Move down by 1 unit
      const endPosition = flaskStopperGroup.current.position.clone().add(downPosition);
  
      new TWEEN.Tween(flaskStopperGroup.current.position)
        .to(endPosition, 1500)
        .onUpdate(() => {
          flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
        })
        .onComplete(() => resolve(0))
        .start();
    });
  };
  
  const rotateFlaskDown = () => {
    return new Promise((resolve) => {
      const center = (new THREE.Vector3(0, 0.5, 0));
      flaskStopperGroup.current.position.add(center);
      const radiusReduction = -5;
      const originalPosition = flaskStopperGroup.current.position.clone(); // Store original position
      const pivot = new THREE.Vector3(originalPosition.x, originalPosition.y - radiusReduction, originalPosition.z);
      //const radiusReduction = -3; // Adjust this value to change the rotation radius
      //const pivotOffset = new THREE.Vector3(0, -radiusReduction, 0); 
      //pivot.position.copy(originalPosition).add(pivotOffset); 
           // pivot.position.copy(center)
      // Array.from(flaskStopperGroup.current.children).forEach((child)=>{
      //   child.position.add(center);
      // })
      //pivot.add(flaskStopperGroup.current)
      //scene.current.add(pivot);
      new TWEEN.Tween(flaskStopperGroup.current.rotation)
        .to({ x: -(3.14 / 180) * 180}, 1500)
        .easing(TWEEN.Easing.QuadraticInOut)
        .onUpdate(() => {
          // Update the position during the rotation
          const offset = flaskStopperGroup.current.position.clone().sub(pivot);
          const newOffset = offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), -(Math.PI / 180)); // Rotate around the X-axis
          flaskStopperGroup.current.position.copy(pivot.clone().add(newOffset));
        })
        .onComplete(()=>
          //scene.current.remove(pivot),
          resolve(0),)
        .start();

    //   const rotateFlask= new THREE.Vector3(0,,0); // Move down by 1 unit
    //   const endPosition = flaskStopperGroup.current.position.clone().add(adjust);
  
    //   new TWEEN.Tween(flaskStopperGroup.current.position)
    //     .to(endPosition, 1500)
    //     .onUpdate(() => {
    //       flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
    //     })
    //     .onComplete(() => resolve(0))
    //     .start();
    });
  };

  const rotateFlaskUp = () => {
    return new Promise((resolve) => {
      const downPosition = new THREE.Vector3(0, -1.55, 0); // Move down by 1 unit
      const endPosition = flaskStopperGroup.current.position.clone().add(downPosition);
  
      new TWEEN.Tween(flaskStopperGroup.current.position)
        .to(endPosition, 1500)
        .onUpdate(() => {
          flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
        })
        .onComplete(() => resolve(0))
        .start();
    });
  };

  const moveFlaskDown = () => {
    return new Promise((resolve) => {
      const downPosition = new THREE.Vector3(0, -1.55, 0); // Move down by 1 unit
      const endPosition = flaskStopperGroup.current.position.clone().add(downPosition);
  
      new TWEEN.Tween(flaskStopperGroup.current.position)
        .to(endPosition, 1500)
        .onUpdate(() => {
          flaskStopperGroup.current.position.copy(flaskStopperGroup.current.position);
        })
        .onComplete(() => resolve(0))
        .start();
    });
  };

  const handleReplayAnimation = async () => {
    flaskStopperGroup.current.position.copy(startPos); // Reset to start position
    //await animateFlask;
    await moveFlaskUp(); 
    await rotateFlaskDown();
    //await moveFlaskDown();
    if(flaskRef.current){
      flaskRef.current.replayAnimation();
    }
  };
  
  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
  }));
  
  return (
    <group ref={flaskStopperGroup}>
        <group ref={flask}>
        <Flask
            position={[0.15, 5, 0]}
            mixed={false}
            ref={flaskRef}
            //rotation-x={(3.14159 / 180) * 180}
            onClick={() => {
                flaskStopperGroup.current.position.copy(startPos); // Ensure initial position is set
    
                const animate = () => {
                    requestAnimationFrame(animate);
                    TWEEN.update();
                };
                requestAnimationFrame(animate);
    
                // Start the initial animation sequence
                rotateFlaskDown().then(() => rotateFlaskUp())
                .then(() => {
                    if (flaskRef.current) {
                        flaskRef.current.replayAnimation();
                    }
                }).then(() => {
                    setNextEnabled(nextButtonRef);
                });
            }}
        />
        </group>
        <group ref={stopper}>
        <Stopper
            capped={true}
            rotation-x={(3.14 / 180) * 180}
            //rotation-y={(3.14 / 180) * 180}
            scale={0.5}
            //position={[0.15, 3.05, 0]}
            position={[0.15, 6.95, 0]}
        />
        </group>
    </group>
  );
  });
  
  
  export default Step19MixSolution;
  