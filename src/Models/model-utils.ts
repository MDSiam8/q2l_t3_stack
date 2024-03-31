import THREE from "three";

//generic actions
export const performAction = (
  animations: THREE.AnimationClip,
  animationToPlay: string,
  actionName: string
) => {
  const action = animations.actions ? animations.actions[actionName] : null;
  if (action) {
    animationAction.current = action;
    animationAction.current.setLoop(THREE.LoopOnce, 1);
    animationAction.current.clampWhenFinished = true;
  }
  // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
  return Promise.resolve();
};
