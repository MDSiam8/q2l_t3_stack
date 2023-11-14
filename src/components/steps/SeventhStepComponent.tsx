import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import BalanceWithAnimations from "../BalanceWithAnimations";
import WeighingPaper from "../WeighingPaper";
import { Bottle } from "../Bottle";
import { BottleCap } from "../BottleCap";
import { Spatula } from "../Spatula";
import { Html, Sphere } from "@react-three/drei";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const SeventhStepComponent = forwardRef((props, ref) => {
  const balanceWithAnimationsRef = useRef();
  const weighingPaperRef = useRef();
  const bottleCapGroup = useRef(new THREE.Group());
  const spatulaGroup = useRef(new THREE.Group());
  const initialBottleCapPosition = new THREE.Vector3(2, 5.1, -2);
  const initialSpatulaPosition = new THREE.Vector3(2.5, 5, 0);
  const [endSpatulaPosition, setEndSpatulaPosition] = useState();
  const [endSpatulaRotation, setEndSpatulaRotation] = useState();
  const [powderVisible, setPowderVisible] = useState(false);
  const [sphereScale, setSphereScale] = useState(0.0); // Initial scale of the sphere
  const [balanceReading, updateBalanceReading] = useState(0.17);

  useEffect(() => {
    updateBalanceReadingAfterPaperDown(balanceReading);
    setPowderVisible(false);
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    requestAnimationFrame(animate);

    handleReplayAnimation(); // Start the initial animation sequence
  }, []);

  const updateBalanceReadingAfterPaperDown = (num) => {
    // if (balanceWithAnimationsRef.current) {
      balanceWithAnimationsRef.current.updateBalanceReading(num);
    // }
  };

  const moveBottleCap = () => {
    return new Promise((resolve) => {
      // Bottle cap animation logic
      // Move up
      new TWEEN.Tween(bottleCapGroup.current.position)
        .to({ y: bottleCapGroup.current.position.y + 1 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() =>
          bottleCapGroup.current.position.copy(bottleCapGroup.current.position),
        )
        .onComplete(() => {
          // Move right
          new TWEEN.Tween(bottleCapGroup.current.position)
            .to({ z: bottleCapGroup.current.position.z - 1 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() =>
              bottleCapGroup.current.position.copy(
                bottleCapGroup.current.position,
              ),
            )
            .onComplete(() => {
              // Move down
              new TWEEN.Tween(bottleCapGroup.current.position)
                .to({ y: bottleCapGroup.current.position.y - 2.1 }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() =>
                  bottleCapGroup.current.position.copy(
                    bottleCapGroup.current.position,
                  ),
                )
                .onComplete(resolve)
                .start();
            })
            .start();
        })
        .start();
    });
  };

  const animateSpatula = () => {
    return new Promise((resolve) => {
      // Spatula animation logic
      // Move spatula up
      new TWEEN.Tween(spatulaGroup.current.position)
        .to({ y: initialSpatulaPosition.y + 2 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      // Rotate spatula (executes after moving up)
      setTimeout(() => {
        new TWEEN.Tween(spatulaGroup.current.rotation)
          .to({ x: (Math.PI / 180) * 90 }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
      }, 1000);

      // Move spatula right and then down (executes after rotation)
      setTimeout(() => {
        const targetXZPosition = initialBottleCapPosition.clone();
        targetXZPosition.y = spatulaGroup.current.position.y;

        new TWEEN.Tween(spatulaGroup.current.position)
          .to({ x: targetXZPosition.x, z: targetXZPosition.z }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onComplete(() => {
            new TWEEN.Tween(spatulaGroup.current.position)
              .to({ y: initialSpatulaPosition.y + 1 }, 1000)
              .easing(TWEEN.Easing.Quadratic.Out)
              .onComplete(() => {
                setPowderVisible(true);
                setEndSpatulaPosition(spatulaGroup.current.position.clone());
                setEndSpatulaRotation(spatulaGroup.current.rotation.clone());
                resolve();
              })
              .start();
          })
          .start();
      }, 2000);
    });
  };

  const handleReplayAnimation = async () => {
    bottleCapGroup.current.position.copy(initialBottleCapPosition); // Reset bottle cap position
    spatulaGroup.current.position.copy(initialSpatulaPosition); // Reset spatula position
    spatulaGroup.current.rotation.set(0, (3.14 / 180) * 0, 0); // Reset spatula rotation
    setPowderVisible(false); // Hide the powder initially

    await moveBottleCap(); // Wait for bottle cap animation to complete
    await animateSpatula(); // Then start spatula animation
  };

  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
  }));

  const animateSpatulaForAdd = () => {
    spatulaGroup.current.position.copy(endSpatulaPosition);
    spatulaGroup.current.rotation.copy(endSpatulaRotation);
    setPowderVisible(true);

    // Move spatula up
    new TWEEN.Tween(spatulaGroup.current.position)
      .to({ y: spatulaGroup.current.position.y + 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    // Rotate spatula on x axis (executes after moving up)
    setTimeout(() => {
      new TWEEN.Tween(spatulaGroup.current.rotation)
        .to({ y: Math.PI / 2 }, 1000) // 90 degrees
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }, 1000);

    setTimeout(() => {
      new TWEEN.Tween(spatulaGroup.current.position)
        .to({ x: 0.2, y: 5.8, z: 0 }, 1000) // Adjust distance as needed
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(spatulaGroup.current.rotation)
        .to({ z: Math.PI / 2 }, 1000) // 90 degrees
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          setPowderVisible(false);
          setSphereScale(sphereScale + 0.03);
          const newReading = balanceReading + 0.1;
          updateBalanceReading(newReading);
          updateBalanceReadingAfterPaperDown(newReading);
        }) // Hide powder at the end
        .start();
    }, 2000);
  };

  const handleAddWeight = () => {
    // Logic for adding weight
    console.log("Adding 0.1g");
    animateSpatulaForAdd();
  };
  const handleRemoveWeight = () => {
    console.log("Removing 0.1g");

    // Reset spatula position to where the add weight animation ended
    spatulaGroup.current.position.copy(new THREE.Vector3(0.2, 5.8, 0));
    
    // This Euler thing is likely the most important key
    // to fixing the animations. DO NOT DELETE!
    // spatulaGroup.current.rotation.copy(new THREE.Euler(0, 0, 0)); //
    const newReading = balanceReading > 0.17 ? balanceReading - 0.1 : 0.17;
    
    updateBalanceReading(newReading);
    updateBalanceReadingAfterPaperDown(newReading);
    // Make the powder visible again
    setSphereScale((prevScale) => (prevScale > 0 ? prevScale - 0.03 : 0));
    setPowderVisible(true);

    // Start by moving the spatula back to its original position before the add weight animation
    new TWEEN.Tween(spatulaGroup.current.position)
      .to(
        {
          x: endSpatulaPosition.x - 0.7,
          y: endSpatulaPosition.y + 0.3,
          z: endSpatulaPosition.z,
        },
        1000,
      )
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(spatulaGroup.current.rotation)
      .to({ z: Math.PI / 2 }, 1000) // 90 degrees
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    // Then, reverse the rotation on the x and z axes
    setTimeout(() => {
      new TWEEN.Tween(spatulaGroup.current.rotation)
        .to({ ...endSpatulaRotation }, 1000) // Revert to initial rotation
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          setPowderVisible(false);
        })
        .start();
    }, 1000);
  };

  return (
    <group>
      <BalanceWithAnimations
        isOpen={false}
        position={[0, 4.55, 0]}
        ref={balanceWithAnimationsRef}
      />
      <group position={[0.6, 5.6, -0.02]}>
        <WeighingPaper
          folded={true}
          ref={weighingPaperRef}
          rotation-y={(3.14 / 180) * 180}
        />
        <Sphere scale={sphereScale} />
      </group>
      <group ref={bottleCapGroup}>
        <BottleCap />
      </group>
      <group position={[2, 5, -2]}>
        <Bottle />
      </group>
      <group ref={spatulaGroup}>
        <Spatula rotation-y={(3.14 / 180) * 90} scale={0.5} />
        {powderVisible && <Sphere scale={0.05} position={[0, 0.05, 0.68]} />}
      </group>
      <Html
        position={[2.8, 5.5, 0]}
        transform
        rotation-y={(3.14 / 180) * 90}
        scale={0.4}
      >
        <button
          className="rounded-full bg-gradient-to-br from-green-200 via-green-300 to-green-400 p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring"
          onClick={handleAddWeight}
        >
          Add 0.1g
        </button>
        <button
          className="ml-4 rounded-full bg-gradient-to-br from-pink-200 via-red-300 to-red-400 p-3 text-sm font-bold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring"
          onClick={handleRemoveWeight}
        >
          Remove 0.1g
        </button>
      </Html>
    </group>
  );
});

export default SeventhStepComponent;
