// Make sure to create a base model class that is a type of a 3D object

// it should be an abstract class with the functions

// performAction() - with move implemented
// loadModelFromPath()
// detectHitBox()

// Make sure that the interface has a universal type

// Use the analytical balance model as an initial reference for

import * as THREE from "three";
import { ActionName } from "~/utils/types/types";
import gsap from "gsap";

// Abstract class for a base model
abstract class BaseModel extends THREE.Mesh {
  constructor(
    geometry?: THREE.BufferGeometry,
    material?: THREE.Material | THREE.Material[],
  ) {
    super(geometry, material);
  }

  // Method to perform an action like 'move'. More actions can be added as needed.
  abstract performAction(actionName: ActionName): Promise<void>;

  // Method to load a model from a given path. This is typically used for GLTF models.
  abstract loadModelFromPath(path: string): Promise<THREE.Group>;

  // Method to detect interactions with the model, potentially using hitboxes.
  abstract detectHitBox(): boolean;

  // Example implementation of 'move' as a part of 'performAction'.
  protected move(
    targetPosition: THREE.Vector3,
    duration: number = 1,
  ): gsap.core.Timeline {
    // Using GSAP to animate position change
    const tl = gsap.timeline();
    tl.to(this.position, { ...targetPosition, duration });
    return tl;
  }
}
