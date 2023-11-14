import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import BalanceReading from "./BalanceReading";

const BalanceWithAnimations = forwardRef((props, ref) => {
  const { isOpen } = props;
  const balance = useGLTF("./balanceUpdated.gltf");
  const animations = useAnimations(balance.animations, balance.scene);
  const animationAction = useRef(null);
  const balanceReadingRef = useRef();

  useEffect(() => {
    // Choose animation based on isOpen
    const animationToPlay : string = isOpen
      ? "glassRAction.002"
      : "glassR.001Action";
    animationAction.current = animations.actions[animationToPlay];
    animationAction.current.setLoop(THREE.LoopOnce, 1);

    if (isOpen) {
      // Un-comment and implement any logic if needed when isOpen is true
      // For example, make certain parts of the balance visible or adjust properties
      // this is the glass door that OPENS up
      balance.scene.children[3].visible = true; // this is the glass door that OPENS up
      balance.scene.children[17].visible = false; // this is the one that closes
    } else {
      // Un-comment and implement any logic if needed when isOpen is false
      // For example, make certain parts of the balance invisible or adjust properties

      balance.scene.children[17].visible = true; // this is the one that closes
      balance.scene.children[3].visible = false;
    }

    return () => {
      if (animationAction.current) {
        animationAction.current.fadeOut(0.5);
      }
    };
  }, [isOpen, balance.animations, animations.actions]);

  const handleReplayAnimation = async () => {
    if (animationAction.current) {
      await animationAction.current.reset().fadeIn(0.5).play();
      animationAction.current.clampWhenFinished = true;
    }
  };

  const updateBalanceReading = (weight) => {
    if (balanceReadingRef.current) {
      balanceReadingRef.current.setWeight(weight);
    }
  };

  useImperativeHandle(ref, () => ({
    replayAnimation: handleReplayAnimation,
    updateBalanceReading,
  }));

  return (
    <group {...props}>
      <primitive object={balance.scene} scale={0.6} />
      <BalanceReading ref={balanceReadingRef} />
    </group>
  );
});

export default BalanceWithAnimations;
