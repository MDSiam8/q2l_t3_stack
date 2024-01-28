import { AnimationAction, AnimationClip } from "three";


// try to turn into an animatable class interface
export class AnimationComponents {
  animations: Array<AnimationAction>;
  animationDelay: number; // in milliseconds
  constructor() {
    this.animations = [];
    this.animationDelay = 0;
  }

  // Method to add an animation to the object
  addAnimation(animation: AnimationAction): void {
    this.animations.push(animation);
  }

  // Method to play animations with the delay
  playAnimations(index: number): void {
    setTimeout(() => {
      this.animations[index]?.clampWhenFinished;
      this.animations[index]?.reset().play();
    }, this.animationDelay);
  }
}

export abstract class GameObject {
  // Standardized properties
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  constructor() {
    // Initialize with default values
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
  }

  // Abstract method for onClick behavior
  abstract onClick(): void;

  // Other common methods like update position, rotation, etc.
  updatePosition(newPosition: { x: number; y: number; z: number }): void {
    this.position = newPosition;
  }

  updateRotation(newRotation: { x: number; y: number; z: number }): void {
    this.rotation = newRotation;
  }

  updateScale(newScale: { x: number; y: number; z: number }): void {
    this.scale = newScale;
  }

  abstract render(): void;
}
