import THREE from "three";

export const performAction = (animations : THREE.AnimationClip, animationToPlay : string) => {
    const action = animations.actions
      ? animations.actions[animationToPlay]
      : null;
    if (action) {
      animationAction.current = action;
      animationAction.current.setLoop(THREE.LoopOnce, 1);
      animationAction.current.clampWhenFinished = true;
    }
    action?.reset().play();
    // Make sure to return a promise, for actions that do not inherently return one, wrap in Promise.resolve()
    return Promise.resolve();
  };

