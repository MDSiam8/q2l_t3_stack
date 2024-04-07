import { useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { AnimationAction, AnimationClip } from 'three';

// Define the function signature, adjust according to your actual types
interface PerformActionParams {
  animations: AnimationClip[];
  scene: THREE.Group<THREE.Object3DEventMap>;
  animationAction: React.MutableRefObject<AnimationAction | null>;
}

const performAction = async (
  { animations, scene, animationAction }: PerformActionParams,
  actionName: string
) => {
  const animationClip = useAnimations(animations, scene)
  const action = animationClip.actions ? animationClip.actions[actionName] : null;
  if (action) {
    animationAction.current = action;
    animationAction.current.setLoop(THREE.LoopOnce, 1);
    animationAction.current.clampWhenFinished = true;
  }
  // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
  return Promise.resolve();
};

export default performAction;