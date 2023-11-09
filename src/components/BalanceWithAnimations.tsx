import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import BalanceReading from "./BalanceReading";

export default function BalanceWithAnimations(props: any) {
  const balance = useGLTF("./balanceUpdated.gltf");
  // const balance = useGLTF('./balance_with_animations.gltf');
  const animations = useAnimations(balance.animations, balance.scene);
  // balance.animations[1].duration = -1;
  console.log(balance.scene);
  // Set up the material with transparency
  balance.scene.traverse((node) => {
    // console.log(node);
    // node.visible = false
    // if (node.isMesh) {
    //   node.material.transparent = true;
    //   node.material.opacity = 0.3; // Adjust the opacity as needed
    // }
    // balance.scene.children[3].visible = false; // this is the glass door that OPENS up
    // balance.scene.children[17].visible = false; // this is the one that closes
    // VERY IMPORTANT
  });

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  const animationAction = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    animationAction.current = animations.actions[animationName];
    animationAction.current.setLoop(THREE.LoopOnce, 1);
    return () => {
      animationAction.current.fadeOut(0.5);
    };
  }, [animationName]);

  const handlePlayAnimation = () => {
    if (!hasPlayed) {
      animationAction.current.reset().fadeIn(0.5).play();
      setHasPlayed(true);

      // Set the animation time to its duration after it finishes playing
      animationAction.current.clampWhenFinished = true;
    }
  };

  const handleReplayAnimation = () => {
    animationAction.current.reset().fadeIn(0.5).play();

    // Set the animation time to its duration after it finishes playing
    animationAction.current.clampWhenFinished = true;
  };

  return (
    <group>
      <primitive object={balance.scene} scale={0.6} />
      <BalanceReading />
      <Html
        distanceFactor={6}
        position={[0.5, 1, -1]}
        transform
        rotation-y={(3.14 / 180) * 180}
        occlude
      >
        {/* <button className="bg-pink-300 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 mx-2" onClick={handlePlayAnimation}>Play Animation</button> */}
        <button
          className="mx-2 transform rounded-full bg-blue-300 px-4 py-2 font-bold text-white transition duration-300 hover:scale-105"
          onClick={handleReplayAnimation}
        >
          Replay
        </button>
      </Html>
    </group>
  );
}
